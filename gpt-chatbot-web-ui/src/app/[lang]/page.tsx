import TranslationsProvider from "@/components/providers/translations_provider";
import ChatHistorySidebar from "@/components/ui/chat_history_sidebar";
import ChatRoomUI from "@/components/ui/chat_room_ui";
import { initTranslations } from "@/lib/localization/i18n";

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
        <div className="flex flex-col md:flex-row max-w-full max-h-full w-full h-full overflow-hidden">
          <ChatHistorySidebar />
          <ChatRoomUI />
        </div>
      </TranslationsProvider>
    </main>
  );
}
