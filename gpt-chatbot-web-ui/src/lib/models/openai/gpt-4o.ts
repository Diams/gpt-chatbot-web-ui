import ChatMessage from "@/lib/chat/chat_message";

export async function Request(conversations: ChatMessage[]): Promise<string> {
  const response = await fetch("/api/chat/completions/openai/gpt-4o", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: conversations,
    }),
  });
  const answer = await response.json();
  return answer.answer;
}
