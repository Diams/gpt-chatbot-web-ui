"use client";

import { useEffect, useState } from "react";
import { useChatRoom } from "@/components/providers/chat_room_provider";
import ChatMessageUI from "./conversations/chat_message_ui";
import ChatMessage from "@/lib/chat/chat_message";

export default function Conversations() {
  const chat_room = useChatRoom();
  const [conversations_value, set_conversations] = useState([
    ...chat_room.Conversations,
  ]);
  useEffect(() => {
    const added_conversation_listener = (new_message: ChatMessage) => {
      set_conversations((prev_conversations: ChatMessage[]) => [
        ...prev_conversations,
        new_message,
      ]);
    };
    chat_room.on("added_conversation", added_conversation_listener);
    return () => {
      chat_room.off("added_conversation", added_conversation_listener);
    };
  }, [chat_room]);
  return (
    <div className="mb-100">
      {conversations_value.map((conversation, index) => (
        <ChatMessageUI
          key={index}
          role={conversation.role}
          message={conversation.content}
        />
      ))}
    </div>
  );
}
