"use client";

import { useTranslation } from "react-i18next";
import TextareaAutosize from "react-textarea-autosize";

export default function ChatInput() {
  const { t } = useTranslation();
  return (
    <div className="flex fixed bottom-0 left-0 w-full py-10 justify-center">
      <div className="flex w-[min(90%,750px)] bg-white dark:bg-gray-500 p-2 border rounded-xl">
        <TextareaAutosize
          maxRows={10}
          minRows={1}
          placeholder={t("Type your question here.")}
          className="flex-grow resize-none break-word focus:outline-none"
        />
      </div>
    </div>
  );
}
