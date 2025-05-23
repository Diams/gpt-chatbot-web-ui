import { NextRequest } from "next/server";
import OpenAI from "openai";
import { OpenAiApiKey } from "@/lib/models/api_key_provider";

const client = new OpenAI({ apiKey: OpenAiApiKey });

export async function POST(request: NextRequest): Promise<Response> {
  const { prompt } = await request.json();
  const completion = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  const answer = completion.choices[0].message.content ?? "";
  return Response.json({ answer: answer });
}
