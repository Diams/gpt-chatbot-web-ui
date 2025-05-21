import ChatInput from "@/components/ui/chat_input";

type HomePagePromiseProps = {
  lang: string;
};

type HomePageProps = {
  params: Promise<HomePagePromiseProps>;
};

export default async function Home(props: HomePageProps) {
  const { lang } = await props.params;
  return (
    <main>
      <ChatInput lang={lang} />
    </main>
  );
}
