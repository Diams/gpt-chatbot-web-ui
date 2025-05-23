import { EventEmitter } from "events";
import ChatMessage from "./chat_message";
import { Request } from "@/lib/models/openai/gpt-4o";

export default class ChatRoom extends EventEmitter {
  private conversations: ChatMessage[];

  constructor(cst_conversations: ChatMessage[]) {
    super();
    this.conversations = [...cst_conversations];
  }

  get Conversations() {
    return this.conversations;
  }

  public async Chat(prompt: string) {
    this.AddConversation("user", prompt);
    const answer = await Request(prompt, this.conversations);
    this.AddConversation("assistant", answer);
  }

  private AddConversation(role: string, message: string) {
    const new_conversation: ChatMessage = { role, message };
    this.conversations = [...this.conversations, new_conversation];
    this.emit("added_conversation", new_conversation);
  }
}
