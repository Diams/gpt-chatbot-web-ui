"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import ChatRoomProvider from "@/components/providers/context_providers/chat_room_provider";
import ChatRoom from "@/lib/chat/chat_room";
import ChatInput from "./chat_room/chat_input";
import Conversations from "./chat_room/conversations";
import ChatHistoryManager from "@/lib/chat/chat_history_manager";

function ProvideSelectedChatIdChangedListener(
  chat_room_setter: Dispatch<SetStateAction<ChatRoom>>,
  chat_history_manager: ChatHistoryManager
): (chat_id: string) => void {
  return (_: string) => {
    chat_room_setter(new ChatRoom(chat_history_manager.SelectedConversations));
  };
}

export default function ChatRoomUI() {
  const chat_history_manager = useChatHistoryManager();
  const [chat_room, set_chat_room] = useState<ChatRoom>(new ChatRoom([]));
  useEffect(() => {
    chat_history_manager.Initialize();
    const seleceted_chat_id_changed_listener =
      ProvideSelectedChatIdChangedListener(set_chat_room, chat_history_manager);
    chat_history_manager.on(
      "selected_chat_id_changed",
      seleceted_chat_id_changed_listener
    );
    set_chat_room(new ChatRoom(chat_history_manager.SelectedConversations));
    return () => {
      chat_history_manager.off(
        "selected_chat_id_changed",
        seleceted_chat_id_changed_listener
      );
    };
  }, [chat_history_manager]);
  return (
    <ChatRoomProvider chat_room_instance={chat_room}>
      <div className="flex flex-col w-full h-full">
        <Conversations />
        <ChatInput />
      </div>
    </ChatRoomProvider>
  );
}
