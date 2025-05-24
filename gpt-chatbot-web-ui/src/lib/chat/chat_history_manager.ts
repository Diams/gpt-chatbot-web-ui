import ChatMessage from "./chat_message";

export default class ChatHistoryManager {
  private selected_chat_id: string;

  constructor() {
    this.selected_chat_id = this.GenerateNewChatId(); // TODO(daimon): あとでちゃんとLoadLatestSavedChatId()を呼ぶ
  }

  get SelectedChatId(): string {
    return this.selected_chat_id;
  }

  public SaveConversations(conversations: ChatMessage[]): void {
    const selected_id = this.SelectedChatId;
    const conversations_json = JSON.stringify(conversations);
    localStorage.setItem(`chat_history/${selected_id}`, conversations_json);
    localStorage.setItem("latest_saved_chat_id", selected_id);
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
