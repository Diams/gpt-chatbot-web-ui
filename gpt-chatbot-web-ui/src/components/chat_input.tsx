import { initTranslations } from "@/lib/i18n";

export default async function ChatInput({ lang }: { lang: string }) {
  const { t } = await initTranslations({
    locale: lang,
    namespaces: ["temporary"],
  });
  return <div>{t("This is ChatInput component.")}</div>;
}
