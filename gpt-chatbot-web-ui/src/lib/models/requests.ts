import ChatMessage from "@/lib/chat/chat_message";

export async function* Request(
  conversations: ChatMessage[]
): AsyncGenerator<string> {
  const response = await fetch("/api/chat/completions/openai/gpt-4o", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: conversations,
    }),
  });
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("response.body is null. Can't stream.");
  }
  const decoder = new TextDecoder();
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    yield decoder.decode(value, { stream: true });
  }
}
