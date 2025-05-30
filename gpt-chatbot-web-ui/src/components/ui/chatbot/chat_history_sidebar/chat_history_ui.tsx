import { useState } from "react";
import {
  IconCheck,
  IconEdit,
  IconMessage,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useChatHistoryManager } from "@/components/providers/context_providers/chat_history_manager_provider";

export default function ChatHistoryUI({
  chat_id,
  title,
  onClicked,
}: {
  chat_id: string;
  title: string;
  onClicked?: () => void;
}) {
  const chat_history_manager = useChatHistoryManager();
  const [is_editing, set_is_editing] = useState(false);
  const [is_deleting, set_is_deleting] = useState(false);
  const [current_title, set_current_title] = useState(title);
  const [new_title, set_new_title] = useState(title);
  const handle_save = () => {
    if (new_title.trim() === "") return;
    console.log("Saving new title:", new_title);
    set_current_title(new_title);
    chat_history_manager.UpdateTitle(chat_id, new_title);
    set_is_editing(false);
  };
  return (
    <div className="flex flex-row w-full pl-4 pr-2 py-2 gap-3 hover:bg-gray-300 dark:hover:bg-gray-500">
      {is_editing ? (
        <div className="flex flex-grow flex-row gap-3 min-w-0">
          <div className="shrink">
            <IconMessage />
          </div>
          <input
            className="w-full bg-neutral-300 text-neutral-900 border-2 rounded-md"
            defaultValue={current_title}
            onChange={(e) => {
              set_new_title(e.target.value);
            }}
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
            {new_title}
          </div>
        </button>
      )}
      {is_editing || is_deleting ? (
        <button
          onClick={() => {
            if (is_editing) {
              handle_save();
            }
          }}
          className="shrink dark:hover:text-green-300 hover:text-blue-600 active:scale-90"
        >
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
      {is_editing || is_deleting ? (
        <div
          onClick={() => {
            if (is_editing) {
              set_new_title(current_title); // Reset to original title
              set_is_editing(false);
            } else if (is_deleting) {
              set_is_deleting(false);
            }
          }}
          className="shrink dark:hover:text-red-500 hover:text-blue-600 active:scale-90"
        >
          <IconX />
        </div>
      ) : (
        <button
          onClick={() => {
            set_is_deleting(true);
          }}
          className="shrink dark:hover:text-gray-700 hover:text-blue-600 active:scale-90"
        >
          <IconTrash />
        </button>
      )}
    </div>
  );
}
