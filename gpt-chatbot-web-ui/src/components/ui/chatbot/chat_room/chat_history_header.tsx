import { IconPlus } from "@tabler/icons-react";

export default function ChatHistoryHeader() {
  return (
    <div className="flex items-center justify-start px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <button
        className="flex items-center justify-center border-1 rounded-xl w-10 h-10 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 cursor-pointer active:scale-90"
        aria-label="Add New Chat"
        onClick={() => {
          // New chat button click handler (to be implemented)
          console.log("Plus button clicked");
        }}
      >
        <IconPlus size={24} />
      </button>
      {/* プルダウンメニュー */}
      <select
        className="ml-2 border rounded-xl px-2 py-1 h-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Options Dropdown"
        defaultValue="default"
        onChange={(e) => {
          // プルダウン選択時の処理（必要に応じて実装）
          console.log("Dropdown selected:", e.target.value);
        }}
      >
        <option value="default" disabled>
          オプションを選択
        </option>
        <option value="option1">オプション1</option>
        <option value="option2">オプション2</option>
      </select>
    </div>
  );
}
