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
  const answer = await ReceiveAnswer(response);
  return answer;
}

async function ReceiveAnswer(response: Response): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("response.body is null. Can't stream.");
  }
  const decoder = new TextDecoder();
  let answer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    answer += decoder.decode(value, { stream: true });
  }
  return answer;
}
