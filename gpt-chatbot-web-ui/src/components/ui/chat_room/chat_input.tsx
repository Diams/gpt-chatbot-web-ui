"use client";

import { IconSend, IconSendOff } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TextareaAutosize from "react-textarea-autosize";
import { useChatRoom } from "@/components/providers/chat_room_provider";

export default function ChatInput() {
  const { t } = useTranslation();
  const [input_value, set_input] = useState("");
  const [is_blocked_input_bar_value, set_is_blocked_input_bar] =
    useState<boolean>(false);
  const chat_room = useChatRoom();
  const handle_send = async () => {
    if (input_value !== "" && !is_blocked_input_bar_value) {
      const prompt = input_value;
      set_input("");
      set_is_blocked_input_bar(true);
      await chat_room.Chat(prompt);
      set_is_blocked_input_bar(false);
    }
  };
  return (
    <div className="flex fixed bottom-0 left-0 w-full py-10 justify-center items-center px-2">
      <div className="flex w-[min(90%,750px)] bg-white dark:bg-gray-500 p-2 border rounded-xl">
        <TextareaAutosize
          maxRows={10}
          minRows={1}
          placeholder={t("Type your question here.")}
          value={input_value}
          onChange={(e) => set_input(e.target.value)}
          onKeyDown={async (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              await handle_send();
            }
          }}
          className="flex-grow resize-none break-word focus:outline-none"
        />
      </div>
      <div
        className="border-2 rounded-full p-2 ml-2 cursor-pointer transition-colors hover:bg-gray-900 hover:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-900 active:scale-90"
        onClick={async () => {
          await handle_send();
        }}
      >
        {is_blocked_input_bar_value ? <IconSendOff /> : <IconSend />}
      </div>
    </div>
  );
}
