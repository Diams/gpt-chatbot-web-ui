import ChatMessage from "./chat_message";

export default class ChatRoom {
  private conversations: ChatMessage[];

  constructor(cst_conversations: ChatMessage[]) {
    this.conversations = [...cst_conversations];
  }

  get Conversations() {
    return this.conversations;
  }

  public Chat(prompt: string) {
    this.AddConversation("user", prompt);
    this.AddConversation("assistant", "Answer from some GPT model.");
  }

  private AddConversation(role: string, message: string) {
    const new_conversation: ChatMessage = { role, message };
    this.conversations = [...this.conversations, new_conversation];
  }
}
