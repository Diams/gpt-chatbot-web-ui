export default function ChatHistoryHeader() {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold">Chat History</h2>
      <button
        className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={() => {
          // Placeholder for future functionality
          console.log("Clear chat history clicked");
        }}
      >
        Clear History
      </button>
    </div>
  );
}
