import ChatMessage from "./chat_message";

export default class ChatHistoryManager {
  private selected_chat_id: string;
  private is_initialized: boolean;

  constructor() {
    this.selected_chat_id = "";
    this.is_initialized = false;
  }

  get SelectedChatId(): string {
    return this.selected_chat_id;
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
    localStorage.setItem(`chat_history/${selected_id}`, conversations_json);
    localStorage.setItem("latest_saved_chat_id", selected_id);
  }

  public LoadAllChatHistories(): { chat_id: string; title: string }[] {
    return [
      {
        chat_id: "dummy 1",
        title: "dummy 1",
      },
      {
        chat_id: "dummy 2",
        title: "dummy 2",
      },
      {
        chat_id: "dummy 3",
        title: "dummy 3",
      },
    ];
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
}
