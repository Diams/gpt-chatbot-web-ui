import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return Response.json({ answer: "Answer from some GPT model." });
}
