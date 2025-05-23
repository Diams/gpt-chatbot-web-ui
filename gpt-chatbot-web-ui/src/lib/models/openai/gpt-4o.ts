export async function Request(prompt: string): Promise<string> {
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
