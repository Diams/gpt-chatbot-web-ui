"use client";

import { useEffect } from "react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import ChatRoomProvider from "@/components/providers/context_providers/chat_room_provider";
import ChatRoom from "@/lib/chat/chat_room";
import ChatInput from "./chat_room/chat_input";
import Conversations from "./chat_room/conversations";

export default function ChatRoomUI() {
  const chat_history_manager = useChatHistoryManager();
  useEffect(() => {
    chat_history_manager.Initialize();
  }, []);
  const chat_room = new ChatRoom([]);
  return (
    <ChatRoomProvider chat_room_instance={chat_room}>
      <div className="flex flex-col w-full h-full">
        <Conversations />
        <ChatInput />
      </div>
    </ChatRoomProvider>
  );
}
