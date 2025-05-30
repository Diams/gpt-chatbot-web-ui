import { NextRequest } from "next/server";
import OpenAI from "openai";
import { OpenAiApiKey } from "@/lib/models/api_key_provider";
import { Stream } from "openai/streaming.mjs";

interface ChatCompletionProps {
  provider: string;
  model: string;
}

export async function POST(
  request: NextRequest,
  context?: { params?: Promise<ChatCompletionProps> }
): Promise<Response> {
  const { messages } = await request.json();
  // provider/modelをcontextから取得（awaitが必要）
  const params = context?.params
    ? await context.params
    : { provider: "openai", model: "gpt-4o" };
  const provider = params.provider || "openai";
  let client = null;
  if (provider === "openai") {
    client = new OpenAI({ apiKey: OpenAiApiKey });
  }
  if (!client) {
    return new Response("Unsupported provider", {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
  const model = params.model || "gpt-4o";
  const completion = await client.chat.completions.create({
    model: model,
    messages: messages,
    stream: true,
  });
  const steam = CreateReadableStream(completion);
  return new Response(steam, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

function CreateReadableStream(
  completion: Stream<OpenAI.Chat.Completions.ChatCompletionChunk> & {
    _request_id?: string | null;
  }
): ReadableStream {
  const encoder = new TextEncoder();
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of completion) {
        const delta = chunk.choices[0].delta;
        if (delta?.content) {
          controller.enqueue(encoder.encode(delta.content));
        }
      }
      controller.close();
    },
  });
}
