"use client";

import { ReactNode, createContext } from "react";
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
