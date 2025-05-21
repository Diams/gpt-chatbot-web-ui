import { initTranslations } from "@/lib/i18n";
import ChatInput from "@/components/chat_input";

type HomePagePromiseProps = {
  lang: string;
};

type HomePageProps = {
  params: Promise<HomePagePromiseProps>;
};

export default async function Home(props: HomePageProps) {
  const { lang } = await props.params;
  const { t } = await initTranslations({
    locale: lang,
    namespaces: ["temporary"],
  });
  return (
    <main>
      <ChatInput />
    </main>
  );
}
