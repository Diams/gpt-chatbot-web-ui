"use client";

import { createContext, useContext, ReactNode } from "react";
import ChatHistoryManager from "@/lib/chat/chat_history_manager";

const ChatHistoryManagerContext = createContext<ChatHistoryManager | null>(
  null
);

export default function ChatHistoryManagerProvider({
  children,
  chat_history_manager_instance,
}: {
  children: ReactNode;
  chat_history_manager_instance: ChatHistoryManager;
}) {
  return (
    <ChatHistoryManagerContext.Provider value={chat_history_manager_instance}>
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
