"use client";

import ChatRoomProvider from "@/components/providers/chat_room_provider";
import ChatRoom from "@/lib/chat/chat_room";
import ChatInput from "./chat_room/chat_input";
import Conversations from "./chat_room/conversations";

export default function ChatRoomUI() {
  const chat_room = new ChatRoom([]);
  return (
    <ChatRoomProvider chat_room_instance={chat_room}>
      <Conversations />
      <ChatInput />
    </ChatRoomProvider>
  );
}
