import { EventEmitter } from "events";
import ChatMessage from "./chat_message";

export default class ChatHistoryManager extends EventEmitter {
  private selected_chat_id: string;
  private is_initialized: boolean;

  constructor() {
    super();
    this.selected_chat_id = "";
    this.is_initialized = false;
  }

  get SelectedChatId(): string {
    return this.selected_chat_id;
  }

  set SelectedChatId(chat_id: string) {
    this.selected_chat_id = chat_id;
    this.emit("selected_chat_id_changed", chat_id);
  }

  get SelectedConversations(): ChatMessage[] {
    const conversations_json = localStorage.getItem(
      `chat_history/${this.selected_chat_id}`
    );
    if (conversations_json) {
      return JSON.parse(conversations_json) as ChatMessage[];
    }
    return [];
  }

  public Initialize(): void {
    if (this.is_initialized) {
      return;
    }
    this.selected_chat_id = this.LoadLatestSavedChatId();
    this.is_initialized = true;
  }

  public SaveConversations(conversations: ChatMessage[]): void {
    if (!this.is_initialized || !this.selected_chat_id) {
      throw new Error("ChatHistoryManager is not initialized.");
    }
    const selected_id = this.SelectedChatId;
    const conversations_json = JSON.stringify(conversations);
    if (!this.ChatHistoryExists(selected_id)) {
      const chat_histories = this.LoadAllChatHistories();
      const new_chat_histories = [
        ...chat_histories,
        { chat_id: selected_id, title: conversations[0].content },
      ];
      this.UpdateChatHistories(new_chat_histories);
    }
    localStorage.setItem(`chat_history/${selected_id}`, conversations_json);
    localStorage.setItem("latest_saved_chat_id", selected_id);
  }

  public LoadAllChatHistories(): { chat_id: string; title: string }[] {
    if (!this.is_initialized) {
      throw new Error("ChatHistoryManager is not initialized.");
    }
    const chat_histories_json: string | null =
      localStorage.getItem("chat_histories");
    if (chat_histories_json) {
      return JSON.parse(chat_histories_json) as {
        chat_id: string;
        title: string;
      }[];
    }
    return [];
  }

  public CreateNewChatHistory(): void {
    const new_chat_id = this.GenerateNewChatId();
    this.SelectedChatId = new_chat_id;
  }

  private LoadLatestSavedChatId(): string {
    const latest_saved_chat_id = localStorage.getItem("latest_saved_chat_id");
    if (latest_saved_chat_id) {
      return latest_saved_chat_id;
    }
    return this.GenerateNewChatId();
  }

  private GenerateNewChatId(): string {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let new_chat_id = "";
    for (let i = 0; i < 8; i++) {
      const index = Math.floor(Math.random() * chars.length);
      new_chat_id += chars[index];
    }
    new_chat_id += "-";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        const index = Math.floor(Math.random() * chars.length);
        new_chat_id += chars[index];
      }
      new_chat_id += "-";
    }
    for (let i = 0; i < 12; i++) {
      const index = Math.floor(Math.random() * chars.length);
      new_chat_id += chars[index];
    }
    return new_chat_id;
  }

  private ChatHistoryExists(selected_id: string): boolean {
    const chat = localStorage.getItem(`chat_history/${selected_id}`);
    if (chat) {
      return true;
    }
    return false;
  }

  private UpdateChatHistories(
    new_chat_histories: { chat_id: string; title: string }[]
  ): void {
    localStorage.setItem("chat_histories", JSON.stringify(new_chat_histories));
    this.emit("chat_histories_updated", new_chat_histories);
  }
}
