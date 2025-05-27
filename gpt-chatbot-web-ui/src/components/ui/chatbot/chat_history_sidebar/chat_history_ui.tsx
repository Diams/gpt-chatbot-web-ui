import { IconEdit, IconMessage, IconTrash } from "@tabler/icons-react";

export default function ChatHistoryUI({
  title,
  onClicked,
}: {
  title: string;
  onClicked?: () => void;
}) {
  return (
    <div className="flex flex-row w-full pl-4 pr-2 py-2 gap-3 hover:bg-gray-300 dark:hover:bg-gray-500">
      <button
        onClick={() => {
          if (onClicked) {
            onClicked();
          }
        }}
        className="flex flex-grow flex-row gap-3 min-w-0 active:scale-90"
      >
        <div className="shrink">
          <IconMessage />
        </div>
        <div className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
          {title}
        </div>
      </button>
      <button className="shrink dark:hover:text-gray-700 hover:text-blue-600 active:scale-90">
        <IconEdit />
      </button>
      <button className="shrink dark:hover:text-gray-700 hover:text-blue-600 active:scale-90">
        <IconTrash />
      </button>
    </div>
  );
}
