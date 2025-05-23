import NewChat from "./chat_history_sidebar/new_chat";

export default function ChatHistorySidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 shadow-2xl">
      <NewChat />
    </div>
  );
}
