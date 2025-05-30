"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import NewChat from "./chat_history_sidebar/new_chat";
import ChatHistoryUI from "./chat_history_sidebar/chat_history_ui";

function ProvideChatHistoriesUpdatedListener(
  chat_histories_setter: Dispatch<
    SetStateAction<
      {
        chat_id: string;
        title: string;
      }[]
    >
  >
): (new_chat_histories: { chat_id: string; title: string }[]) => void {
  return (new_chat_histories: { chat_id: string; title: string }[]) => {
    chat_histories_setter(new_chat_histories);
  };
}

export default function ChatHistorySidebar() {
  const chat_history_manager = useChatHistoryManager();
  const [chat_histories, set_chat_histories] = useState<
    { chat_id: string; title: string }[]
  >([]);
  useEffect(() => {
    chat_history_manager.Initialize();
    const chat_histories_updated_listener =
      ProvideChatHistoriesUpdatedListener(set_chat_histories);
    chat_history_manager.on(
      "chat_histories_updated",
      chat_histories_updated_listener
    );
    set_chat_histories(chat_history_manager.LoadAllChatHistories());
    return () => {
      chat_history_manager.off(
        "chat_histories_updated",
        chat_histories_updated_listener
      );
    };
  }, [chat_history_manager]);
  return (
    <div className="flex flex-col w-full h-full pt-6 bg-white dark:bg-gray-900 shadow-2xl items-center">
      <NewChat />
      <hr className="border-t w-[90%] my-6 border-gray-500" />
      {[...chat_histories].reverse().map((chat_history, index) => (
        <ChatHistoryUI
          key={chat_history.chat_id}
          chat_id={chat_history.chat_id}
          title={chat_history.title}
          onClicked={() =>
            (chat_history_manager.SelectedChatId = chat_history.chat_id)
          }
        />
      ))}
    </div>
  );
}
