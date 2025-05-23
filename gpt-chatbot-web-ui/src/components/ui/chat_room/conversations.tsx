"use client";

import { useChatRoom } from "@/components/providers/chat_room_provider";
import ChatMessageUI from "./conversations/chat_message_ui";

export default function Conversations() {
  const dummy_conversations = useChatRoom().Conversations;
  return (
    <div>
      {dummy_conversations.map((conversation, index) => (
        <ChatMessageUI
          key={index}
          role={conversation.role}
          message={conversation.message}
        />
      ))}
    </div>
  );
}
