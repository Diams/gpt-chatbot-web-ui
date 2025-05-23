import { NextRequest } from "next/server";
import OpenAI from "openai";
import { OpenAiApiKey } from "@/lib/models/api_key_provider";

const client = new OpenAI({ apiKey: OpenAiApiKey });

export async function POST(request: NextRequest): Promise<Response> {
  const { messages } = await request.json();
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: messages,
    stream: true,
  });
  let answer = "";
  for await (const chunk of completion) {
    const delta = chunk.choices[0].delta;
    if (delta?.content) {
      answer += delta.content;
    }
  }
  return Response.json({ answer: answer });
}
