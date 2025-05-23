"use client";

import ChatRoomProvider from "@/components/providers/chat_room_provider";
import ChatRoom from "@/lib/chat/chat_room";
import ChatInput from "./chat_room/chat_input";
import Conversations from "./chat_room/conversations";

export default function ChatRoomUI() {
  const chat_room = new ChatRoom([
    {
      role: "user",
      message: "Hello.",
    },
    {
      role: "assistant",
      message: "Hi there! How are you?",
    },
    {
      role: "user",
      message: "I'm good, thanks. And you?",
    },
    {
      role: "assistant",
      message: "I'm doing well, too.",
    },
  ]);
  return (
    <ChatRoomProvider chat_room_instance={chat_room}>
      <Conversations />
      <ChatInput />
    </ChatRoomProvider>
  );
}
