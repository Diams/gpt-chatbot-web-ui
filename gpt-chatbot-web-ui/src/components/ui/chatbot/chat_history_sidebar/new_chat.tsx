"use client";

import { useTranslation } from "react-i18next";
import { IconPlus } from "@tabler/icons-react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";
import ChatHistoryManager from "@/lib/chat/chat_history_manager";

function ProvideOnClickedNewChatButtonHandler(
  chat_history_manager: ChatHistoryManager
): () => void {
  return () => {
    chat_history_manager.CreateNewChatHistory();
  };
}

export default function NewChat() {
  const { t } = useTranslation("chat_history_sidebar");
  const chat_history_manager = useChatHistoryManager();
  return (
    <button
      onClick={ProvideOnClickedNewChatButtonHandler(chat_history_manager)}
      className="flex flex-row gap-2 border-1 rounded-xl items-center w-[90%] px-2 py-2 justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 cursor-pointer active:scale-90"
    >
      <IconPlus size={30} />
      <div className="lg:block hidden">{t("New Chat")}</div>
    </button>
  );
}
