import { EventEmitter } from "events";
import ChatMessage from "./chat_message";
import { Request } from "@/lib/models/requests";

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
    let counter = 0;
    for await (const chunk of Request("openai", "gpt-4o", this.conversations)) {
      if (counter == 0) {
        this.AddConversation("assistant", chunk);
      } else {
        const target_index = this.conversations.length - 1;
        const new_chat_message = {
          role: "assistant",
          content: this.conversations[target_index].content + chunk,
        };
        this.UpdateConversation(target_index, new_chat_message);
      }
      counter++;
    }
    this.emit(
      "completed_chat",
      this.conversations[this.conversations.length - 1]
    );
  }

  private AddConversation(role: string, message: string) {
    const new_conversation: ChatMessage = { role, content: message };
    this.conversations = [...this.conversations, new_conversation];
    this.emit("added_conversation", new_conversation);
  }

  private UpdateConversation(index: number, new_chat_message: ChatMessage) {
    this.conversations[index] = new_chat_message;
    this.emit("updated_conversation", { index, new_chat_message });
  }
}
