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
    console.log(prompt);
  }
}
