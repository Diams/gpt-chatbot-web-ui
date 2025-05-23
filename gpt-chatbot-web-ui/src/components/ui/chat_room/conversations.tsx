"use client";

import { useEffect, useState } from "react";
import { useChatRoom } from "@/components/providers/chat_room_provider";
import ChatMessageUI from "./conversations/chat_message_ui";
import ChatMessage from "@/lib/chat/chat_message";
import { IconArrowDown } from "@tabler/icons-react";

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
    <div>
      <div className="mb-100">
        {conversations_value.map((conversation, index) => (
          <ChatMessageUI
            key={index}
            role={conversation.role}
            message={conversation.content}
          />
        ))}
      </div>
      <div className="fixed bottom-0 right-0 pr-15 pb-25">
        <button className="border-2 rounded-full cursor-pointer transition-colors hover:bg-gray-900 hover:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 active:scale-90">
          <div className="m-2">
            <IconArrowDown />
          </div>
        </button>
      </div>
    </div>
  );
}
