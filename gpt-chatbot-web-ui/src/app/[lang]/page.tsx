import ChatHistoryManagerProvider from "@/components/providers/context_providers/chat_history_manager_provider";
import TranslationsProvider from "@/components/providers/translations_provider";
import ChatHistorySidebar from "@/components/ui/chatbot/chat_history_sidebar";
import ChatRoomUI from "@/components/ui/chatbot/chat_room_ui";
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
        <div className="flex flex-row max-w-full max-h-full w-full h-full overflow-hidden min-w-0">
          <ChatHistoryManagerProvider>
            <div className="md:w-1/5 w-0 md:block hidden">
              <ChatHistorySidebar />
            </div>
            <div className="md:w-4/5 w-full">
              <ChatRoomUI />
            </div>
          </ChatHistoryManagerProvider>
        </div>
      </TranslationsProvider>
    </main>
  );
}
