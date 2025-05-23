"use client";

import { useState } from "react";
import { useChatRoom } from "@/components/providers/chat_room_provider";
import ChatMessageUI from "./conversations/chat_message_ui";

export default function Conversations() {
  const chat_room = useChatRoom();
  const [conversations_value, set_conversations] = useState([
    ...chat_room.Conversations,
  ]);
  return (
    <div>
      {conversations_value.map((conversation, index) => (
        <ChatMessageUI
          key={index}
          role={conversation.role}
          message={conversation.message}
        />
      ))}
    </div>
  );
}
