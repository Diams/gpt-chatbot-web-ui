import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";

export default function ChatHistoryHeader() {
  const { t } = useTranslation("chat_history_sidebar");
  const chatHistoryManager = useChatHistoryManager();
  const [chatHistories, setChatHistories] = useState<
    { chat_id: string; title: string }[]
  >([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    chatHistoryManager.Initialize();
    setChatHistories(chatHistoryManager.LoadAllChatHistories());
    setSelectedId(chatHistoryManager.SelectedChatId);
    // イベントリスナーで履歴更新に追従
    const updateHandler = (
      newHistories: { chat_id: string; title: string }[]
    ) => {
      setChatHistories([...newHistories]);
    };
    const selectHandler = (id: string) => {
      setSelectedId(id);
    };
    chatHistoryManager.on("chat_histories_updated", updateHandler);
    chatHistoryManager.on("selected_chat_id_changed", selectHandler);
    return () => {
      chatHistoryManager.off("chat_histories_updated", updateHandler);
      chatHistoryManager.off("selected_chat_id_changed", selectHandler);
    };
  }, [chatHistoryManager]);

  return (
    <div className="flex items-center justify-start px-4 py-2 border-b border-gray-200 dark:border-gray-700 gap-2">
      <button
        style={{ minWidth: 40, maxWidth: 40, width: 40 }}
        className="flex-shrink-0 flex items-center justify-center border-1 rounded-xl w-10 h-10 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 cursor-pointer active:scale-90"
        aria-label="Add New Chat"
        onClick={() => {
          chatHistoryManager.CreateNewChatHistory();
        }}
      >
        <IconPlus size={24} />
      </button>
      {/* プルダウンメニュー */}
      <select
        className="flex-1 min-w-0 border rounded-xl px-2 py-1 h-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 truncate"
        aria-label="ChatHistory Dropdown"
        value={selectedId || "default"}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedId(id);
          chatHistoryManager.SelectedChatId = id;
        }}
      >
        <option value="default" disabled>
          {t("Select a chat history")}
        </option>
        {chatHistories
          .slice()
          .reverse()
          .map((history) => (
            <option key={history.chat_id} value={history.chat_id}>
              {history.title || history.chat_id}
            </option>
          ))}
      </select>
    </div>
  );
}
