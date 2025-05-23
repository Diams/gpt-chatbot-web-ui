"use client";

import { useEffect, useRef, useState } from "react";
import { useChatRoom } from "@/components/providers/chat_room_provider";
import ChatMessageUI from "./conversations/chat_message_ui";
import ChatMessage from "@/lib/chat/chat_message";
import { IconArrowDown } from "@tabler/icons-react";

export default function Conversations() {
  const chat_room = useChatRoom();
  const [conversations_value, set_conversations] = useState([
    ...chat_room.Conversations,
  ]);
  const bottom_item = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const added_conversation_listener = (new_message: ChatMessage) => {
      set_conversations((prev_conversations: ChatMessage[]) => [
        ...prev_conversations,
        new_message,
      ]);
    };
    chat_room.on("added_conversation", added_conversation_listener);
    const updated_conversation_listener = ({
      index,
      new_chat_message,
    }: {
      index: number;
      new_chat_message: ChatMessage;
    }) => {
      set_conversations((prev_conversations: ChatMessage[]) => {
        const new_conversations = [...prev_conversations];
        new_conversations[index] = new_chat_message;
        return new_conversations;
      });
    };
    chat_room.on("updated_conversation", updated_conversation_listener);
    return () => {
      chat_room.off("added_conversation", added_conversation_listener);
      chat_room.off("updated_conversation", updated_conversation_listener);
    };
  }, [chat_room]);
  const handle_scroll_button = () => {
    bottom_item.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    handle_scroll_button();
  }, [conversations_value]);
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
      <div ref={bottom_item}></div>
      <div className="fixed bottom-0 right-0 pr-15 pb-25">
        <button
          onClick={handle_scroll_button}
          className="border-2 rounded-full cursor-pointer transition-colors hover:bg-gray-900 hover:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 active:scale-90"
        >
          <div className="m-2">
            <IconArrowDown />
          </div>
        </button>
      </div>
    </div>
  );
}
