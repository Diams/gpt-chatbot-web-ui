"use client";

import { createContext, useContext, ReactNode } from "react";
import ChatRoom from "@/lib/chat/chat_room";

const ChatRoomContext = createContext<ChatRoom | null>(null);

export default function ChatRoomProvider({
  children,
  chat_room_instance,
}: {
  children: ReactNode;
  chat_room_instance: ChatRoom;
}) {
  return (
    <ChatRoomContext.Provider value={chat_room_instance}>
      {children}
    </ChatRoomContext.Provider>
  );
}

export function useChatRoom() {
  const context = useContext(ChatRoomContext);
  if (!context) {
    throw new Error("useChatRoom must be used within a ChatRoomProvider.");
  }
  return context;
}
