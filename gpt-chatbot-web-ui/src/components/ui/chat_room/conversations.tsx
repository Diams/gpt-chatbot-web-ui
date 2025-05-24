"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import { useChatRoom } from "@/components/providers/context_providers/chat_room_provider";
import ChatMessageUI from "./conversations/chat_message_ui";
import ChatHistoryManager from "@/lib/chat/chat_history_manager";
import ChatMessage from "@/lib/chat/chat_message";
import { IconArrowDown } from "@tabler/icons-react";

function ProvideAddedConversationListener(
  conversations_setter: Dispatch<SetStateAction<ChatMessage[]>>,
  chat_history_manager: ChatHistoryManager
): (new_message: ChatMessage) => void {
  return (new_message: ChatMessage) => {
    conversations_setter((prev_conversations: ChatMessage[]) => {
      const new_conversations = [...prev_conversations, new_message];
      chat_history_manager.SaveConversations(new_conversations);
      return new_conversations;
    });
  };
}

function ProvideUpdatedConversationListener(
  conversations_setter: Dispatch<SetStateAction<ChatMessage[]>>
): ({
  index,
  new_chat_message,
}: {
  index: number;
  new_chat_message: ChatMessage;
}) => void {
  return ({
    index,
    new_chat_message,
  }: {
    index: number;
    new_chat_message: ChatMessage;
  }) => {
    conversations_setter((prev_conversations: ChatMessage[]) => {
      const new_conversations = [...prev_conversations];
      const tmp_chat_message = {
        role: new_chat_message.role,
        content: new_chat_message.content + "▍",
      };
      new_conversations[index] = tmp_chat_message;
      return new_conversations;
    });
  };
}

function ProvideCompletedChatListener(
  conversations_setter: Dispatch<SetStateAction<ChatMessage[]>>,
  chat_history_manager: ChatHistoryManager
): (chat_message: ChatMessage) => void {
  return (chat_message: ChatMessage) => {
    conversations_setter((prev_conversations: ChatMessage[]) => {
      const new_conversations = [...prev_conversations];
      const target_index = prev_conversations.length - 1;
      new_conversations[target_index] = chat_message;
      chat_history_manager.SaveConversations(new_conversations);
      return new_conversations;
    });
  };
}

export default function Conversations() {
  const chat_room = useChatRoom();
  const chat_history_manager = useChatHistoryManager();
  const [conversations_value, set_conversations] = useState([
    ...chat_room.Conversations,
  ]);
  const bottom_item = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const added_conversation_listener = ProvideAddedConversationListener(
      set_conversations,
      chat_history_manager
    );
    chat_room.on("added_conversation", added_conversation_listener);
    const updated_conversation_listener =
      ProvideUpdatedConversationListener(set_conversations);
    chat_room.on("updated_conversation", updated_conversation_listener);
    const completed_chat_listener = ProvideCompletedChatListener(
      set_conversations,
      chat_history_manager
    );
    chat_room.on("completed_chat", completed_chat_listener);
    return () => {
      chat_room.off("added_conversation", added_conversation_listener);
      chat_room.off("updated_conversation", updated_conversation_listener);
      chat_room.off("completed_chat", completed_chat_listener);
    };
  }, [chat_room]);
  const handle_scroll_button = () => {
    bottom_item.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    handle_scroll_button();
  }, [conversations_value]);
  return (
    <div className="flex flex-grow overflow-hidden relative">
      <div className="w-full h-full overflow-auto">
        <div className="">
          {conversations_value.map((conversation, index) => (
            <ChatMessageUI
              key={index}
              role={conversation.role}
              message={conversation.content}
            />
          ))}
        </div>
        <div ref={bottom_item}></div>
      </div>
      <div className="absolute bottom-2 right-4">
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
