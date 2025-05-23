export async function Request(prompt: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return "Answer from some GPT model.";
}
