import { initTranslations } from "@/lib/i18n";

export default async function ChatInput({ lang }: { lang: string }) {
  const { t } = await initTranslations({
    locale: lang,
    namespaces: ["temporary"],
  });
  return (
    <div className="fixed bottom-0 left-0 w-full">
      {t("This is ChatInput component.")}
    </div>
  );
}
