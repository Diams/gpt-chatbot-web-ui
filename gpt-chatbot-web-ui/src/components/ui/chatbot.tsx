"use client";

import ChatHistoryManagerProvider from "@/components/providers/context_providers/chat_history_manager_provider";
import ChatHistorySidebar from "@/components/ui/chatbot/chat_history_sidebar";
import ChatRoomUI from "@/components/ui/chatbot/chat_room_ui";

export default function Chatbot() {
  return (
    <ChatHistoryManagerProvider>
      <div className="md:w-1/5 w-0 md:block hidden">
        <ChatHistorySidebar />
      </div>
      <div className="md:w-4/5 w-full">
        <ChatRoomUI />
      </div>
    </ChatHistoryManagerProvider>
  );
}
