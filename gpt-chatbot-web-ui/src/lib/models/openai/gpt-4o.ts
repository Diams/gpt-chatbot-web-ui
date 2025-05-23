import ChatMessage from "@/lib/chat/chat_message";

export async function Request(
  prompt: string,
  conversations: ChatMessage[]
): Promise<string> {
  const response = await fetch("/api/chat/completions/openai/gpt-4o", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });
  const answer = await response.json();
  return answer.answer;
}
