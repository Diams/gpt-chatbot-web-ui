"use client";

import { useTranslation } from "react-i18next";
import { IconPlus } from "@tabler/icons-react";

export default function NewChat() {
  const { t } = useTranslation();
  return (
    <button className="flex flex-row border-1 m-6 px-3 lg:px-18 py-2 rounded-xl gap-2 items-center hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 cursor-pointer active:scale-90">
      <IconPlus size={30} />
      <div className="lg:block hidden">{t("New Chat")}</div>
    </button>
  );
}
