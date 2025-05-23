export default class ChatRoom {
  private conversations: { role: string; message: string }[];

  constructor(cst_conversations: { role: string; message: string }[]) {
    this.conversations = [...cst_conversations];
  }

  get Conversations() {
    return this.conversations;
  }
}
