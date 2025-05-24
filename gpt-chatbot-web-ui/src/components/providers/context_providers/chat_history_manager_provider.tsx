"use client";

import { createContext, useContext, useRef, ReactNode } from "react";
import ChatHistoryManager from "@/lib/chat/chat_history_manager";

const ChatHistoryManagerContext = createContext<ChatHistoryManager | null>(
  null
);

export default function ChatHistoryManagerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const chat_history_manager_ref = useRef<ChatHistoryManager | null>(null);
  if (!chat_history_manager_ref.current) {
    chat_history_manager_ref.current = new ChatHistoryManager();
  }
  return (
    <ChatHistoryManagerContext.Provider
      value={chat_history_manager_ref.current}
    >
      {children}
    </ChatHistoryManagerContext.Provider>
  );
}

export function useChatHistoryManager() {
  const context = useContext(ChatHistoryManagerContext);
  if (!context) {
    throw new Error(
      "useChatHistoryManager must be used within a ChatHistoryManagerContext."
    );
  }
  return context;
}
