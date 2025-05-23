"use client";

import { useTranslation } from "react-i18next";

export default function NewChat() {
  const { t } = useTranslation();
  return <button>{t("New Chat")}</button>;
}
