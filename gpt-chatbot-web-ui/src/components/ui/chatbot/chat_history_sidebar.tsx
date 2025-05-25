import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import NewChat from "./chat_history_sidebar/new_chat";
import ChatHistoryUI from "./chat_history_sidebar/chat_history_ui";

export default function ChatHistorySidebar() {
  const chat_history_manager = useChatHistoryManager();
  const chat_histories = chat_history_manager.LoadAllChatHistories();
  return (
    <div className="flex flex-col w-full h-full pt-6 bg-white dark:bg-gray-900 shadow-2xl items-center">
      <NewChat />
      <hr className="border-t w-[90%] my-6 border-gray-500" />
      {chat_histories.map((chat_history, index) => (
        <ChatHistoryUI key={index} title={chat_history.title} />
      ))}
    </div>
  );
}
