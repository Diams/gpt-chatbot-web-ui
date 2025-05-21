"use client";

import { useTranslation } from "react-i18next";

export default function ChatInput() {
  const { t } = useTranslation();
  return (
    <div className="flex fixed bottom-0 left-0 w-full py-10 justify-center">
      <textarea
        className="border break-words bg-white rounded-xl dark:bg-gray-500 p-2 w-[min(90%,750px)]"
        placeholder={t("Type your question here.")}
      />
    </div>
  );
}
