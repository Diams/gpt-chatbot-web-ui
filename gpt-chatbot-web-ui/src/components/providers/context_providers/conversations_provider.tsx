"use client";

import { createContext, useContext, ReactNode } from "react";
import ChatMessage from "@/lib/chat/chat_message";

const ConversationsContext = createContext<ChatMessage[] | null>(null);

export default function ConversationsProvider({
  children,
  conversations_instance,
}: {
  children: ReactNode;
  conversations_instance: ChatMessage[];
}) {
  return (
    <ConversationsContext.Provider value={conversations_instance}>
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversations() {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error(
      "useConversations must be used within a ConversationsProvider."
    );
  }
  return context;
}
