import TranslationsProvider from "@/components/providers/translations_provider";
import { initTranslations } from "@/lib/localization/i18n";
import Chatbot from "@/components/ui/chatbot";

type HomePagePromiseProps = {
  lang: string;
};

type HomePageProps = {
  params: Promise<HomePagePromiseProps>;
};

export default async function Home(props: HomePageProps) {
  const { lang } = await props.params;
  const namespaces = ["chat_room"];
  const { resources } = await initTranslations({
    locale: lang,
    namespaces,
  });
  return (
    <main className="w-screen h-screen">
      <TranslationsProvider
        locale={lang}
        namespaces={namespaces}
        resources={resources}
      >
        <div className="flex flex-row max-w-full max-h-full w-full h-full overflow-hidden min-w-0">
          <Chatbot />
        </div>
      </TranslationsProvider>
    </main>
  );
}
