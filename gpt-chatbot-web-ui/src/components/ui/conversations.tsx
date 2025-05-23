"use client";

import { useTranslation } from "react-i18next";
import ChatRoom from "@/lib/chat/chat_room";
import ChatMessage from "./conversations/chat_message";

export default function Conversations() {
  const { t } = useTranslation("temporary");
  const dummy_conversations = new ChatRoom([
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
  ]).Conversations;
  return (
    <div>
      {dummy_conversations.map((conversation, index) => (
        <ChatMessage
          key={index}
          role={conversation.role}
          message={conversation.message}
        />
      ))}
    </div>
  );
}
