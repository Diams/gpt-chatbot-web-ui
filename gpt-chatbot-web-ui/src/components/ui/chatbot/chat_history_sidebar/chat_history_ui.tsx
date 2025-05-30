import { useState } from "react";
import {
  IconCheck,
  IconEdit,
  IconMessage,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

export default function ChatHistoryUI({
  title,
  onClicked,
}: {
  title: string;
  onClicked?: () => void;
}) {
  const [is_editing, set_is_editing] = useState(false);
  return (
    <div className="flex flex-row w-full pl-4 pr-2 py-2 gap-3 hover:bg-gray-300 dark:hover:bg-gray-500">
      {is_editing ? (
        <div className="flex flex-grow flex-row gap-3 min-w-0">
          <div className="shrink">
            <IconMessage />
          </div>
          <input
            className="w-full bg-neutral-300 text-neutral-900 border-2 rounded-md"
            defaultValue={title}
          ></input>
        </div>
      ) : (
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
      )}
      {is_editing ? (
        <button className="shrink dark:hover:text-green-300 hover:text-blue-600 active:scale-90">
          <IconCheck />
        </button>
      ) : (
        <button
          onClick={() => {
            set_is_editing(true);
          }}
          className="shrink dark:hover:text-gray-700 hover:text-blue-600 active:scale-90"
        >
          <IconEdit />
        </button>
      )}
      {is_editing ? (
        <div
          onClick={() => {
            set_is_editing(false);
          }}
          className="shrink dark:hover:text-red-500 hover:text-blue-600 active:scale-90"
        >
          <IconX />
        </div>
      ) : (
        <button className="shrink dark:hover:text-gray-700 hover:text-blue-600 active:scale-90">
          <IconTrash />
        </button>
      )}
    </div>
  );
}
