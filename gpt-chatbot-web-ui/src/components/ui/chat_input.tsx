"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ChatInput() {
  const { t } = useTranslation();
  const textarea_ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (textarea_ref.current) {
      ResizeTextarea(textarea_ref.current);
    }
  }, [value]);
  return (
    <div className="flex fixed bottom-0 left-0 w-full py-10 justify-center">
      <textarea
        ref={textarea_ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={1}
        className="border break-words bg-white rounded-xl dark:bg-gray-500 p-2 w-[min(90%,750px)]"
        placeholder={t("Type your question here.")}
      />
    </div>
  );
}

function ResizeTextarea(textarea: HTMLTextAreaElement) {
  textarea.style.height = "auto";
  const scroll_height = textarea.scrollHeight;
  const line_height = 24;
  const max_height = line_height * 10;
  textarea.style.height = `${Math.min(scroll_height, max_height)}px`;
}
