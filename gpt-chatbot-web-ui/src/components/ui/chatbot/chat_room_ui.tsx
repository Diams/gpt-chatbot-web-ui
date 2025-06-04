"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import ChatRoomProvider from "@/components/providers/context_providers/chat_room_provider";
import ChatRoom from "@/lib/chat/chat_room";
import ChatHistoryHeader from "./chat_room/chat_history_header";
import ChatInput from "./chat_room/chat_input";
import Conversations from "./chat_room/conversations";
import ModelSelector from "./chat_room/model_selector";
import ChatHistoryManager from "@/lib/chat/chat_history_manager";
import { DefaultModel } from "@/lib/models/models";

function ProvideSelectedChatIdChangedListener(
  chat_room_setter: Dispatch<SetStateAction<ChatRoom>>,
  chat_history_manager: ChatHistoryManager
): () => void {
  return () => {
    chat_room_setter(
      new ChatRoom(
        chat_history_manager.SelectedConversations,
        DefaultModel.provider,
        DefaultModel.model_name
      )
    );
  };
}

export default function ChatRoomUI() {
  const chat_history_manager = useChatHistoryManager();
  const [chat_room, set_chat_room] = useState<ChatRoom>(
    new ChatRoom([], DefaultModel.provider, DefaultModel.model_name)
  );
  const [is_chated, set_is_chated] = useState<boolean>(false);
  useEffect(() => {
    chat_history_manager.Initialize();
    const seleceted_chat_id_changed_listener =
      ProvideSelectedChatIdChangedListener(set_chat_room, chat_history_manager);
    chat_history_manager.on(
      "selected_chat_id_changed",
      seleceted_chat_id_changed_listener
    );
    set_chat_room(
      new ChatRoom(
        chat_history_manager.SelectedConversations,
        DefaultModel.provider,
        DefaultModel.model_name
      )
    );
    return () => {
      chat_history_manager.off(
        "selected_chat_id_changed",
        seleceted_chat_id_changed_listener
      );
    };
  }, [chat_history_manager]);
  return (
    <ChatRoomProvider chat_room_instance={chat_room}>
      <div className="flex flex-col w-full h-full relative">
        <div className="md:hidden">
          <ChatHistoryHeader />
        </div>
        {chat_room.Conversations.length === 0 && !is_chated ? (
          <div className="absolute top-1/2 left-1/2 -translate-1/2">
            <ModelSelector />
          </div>
        ) : (
          <></>
        )}
        <Conversations />
        <ChatInput onChat={() => set_is_chated(true)} />
      </div>
    </ChatRoomProvider>
  );
}
