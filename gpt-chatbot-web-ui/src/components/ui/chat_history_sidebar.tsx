import NewChat from "./chat_history_sidebar/new_chat";
import ChatHistoryUI from "./chat_history_sidebar/chat_history_ui";

export default function ChatHistorySidebar() {
  const dummy_chat_histories = [
    "dummy 1",
    "dummy dummy duumy dummy 2dummy dummy duumy dummy 2dummy dummy duumy dummy 2dummy dummy duumy dummy 2dummy dummy duumy dummy 2",
    "dummy 3",
  ];
  return (
    <div className="flex flex-col w-full h-full pt-6 bg-white dark:bg-gray-900 shadow-2xl items-center">
      <NewChat />
      <hr className="border-t w-[90%] my-6 border-gray-500" />
      {dummy_chat_histories.map((chat_history, index) => (
        <ChatHistoryUI key={index} title={chat_history} />
      ))}
    </div>
  );
}
