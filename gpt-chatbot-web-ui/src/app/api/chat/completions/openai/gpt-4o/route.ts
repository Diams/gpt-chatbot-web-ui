import { NextRequest } from "next/server";
import OpenAI from "openai";
import { OpenAiApiKey } from "@/lib/models/api_key_provider";
import { Stream } from "openai/streaming.mjs";

const client = new OpenAI({ apiKey: OpenAiApiKey });

export async function POST(request: NextRequest): Promise<Response> {
  const { messages } = await request.json();
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
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
