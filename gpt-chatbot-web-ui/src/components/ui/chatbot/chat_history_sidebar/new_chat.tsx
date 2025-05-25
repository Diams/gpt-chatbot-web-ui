"use client";

import { useTranslation } from "react-i18next";
import { IconPlus } from "@tabler/icons-react";

export default function NewChat() {
  const { t } = useTranslation("chat_history_sidebar");
  return (
    <button className="flex flex-row gap-2 border-1 rounded-xl items-center w-[90%] px-2 py-2 justify-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 cursor-pointer active:scale-90">
      <IconPlus size={30} />
      <div className="lg:block hidden">{t("New Chat")}</div>
    </button>
  );
}
