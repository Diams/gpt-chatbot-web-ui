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
    </div>
  );
}
