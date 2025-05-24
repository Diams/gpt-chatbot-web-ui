import NewChat from "./chat_history_sidebar/new_chat";

export default function ChatHistorySidebar() {
  return (
    <div className="flex-none h-screen bg-white dark:bg-gray-900 shadow-2xl">
      <NewChat />
    </div>
  );
}
