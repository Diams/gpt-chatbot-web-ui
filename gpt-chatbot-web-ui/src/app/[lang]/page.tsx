import TranslationsProvider from "@/components/providers/translations_provider";
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
    <main>
      <TranslationsProvider
        locale={lang}
        namespaces={namespaces}
        resources={resources}
      >
        <ChatRoomUI />
      </TranslationsProvider>
    </main>
  );
}
