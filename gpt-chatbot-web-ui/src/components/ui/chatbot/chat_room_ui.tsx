"use client";

import { useEffect, useState } from "react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import ChatRoomProvider from "@/components/providers/context_providers/chat_room_provider";
import ChatRoom from "@/lib/chat/chat_room";
import ChatInput from "./chat_room/chat_input";
import Conversations from "./chat_room/conversations";

export default function ChatRoomUI() {
  const chat_history_manager = useChatHistoryManager();
  const [chat_room, set_chat_room] = useState<ChatRoom>(new ChatRoom([]));
  useEffect(() => {
    chat_history_manager.Initialize();
    set_chat_room(new ChatRoom(chat_history_manager.SelectedConversations));
  }, []);
  return (
    <ChatRoomProvider chat_room_instance={chat_room}>
      <div className="flex flex-col w-full h-full">
        <Conversations />
        <ChatInput />
      </div>
    </ChatRoomProvider>
  );
}
