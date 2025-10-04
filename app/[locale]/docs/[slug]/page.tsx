import { useTranslations, useMessages } from "next-intl";
import CTA from "@/components/ui/cta-prefooter";
import Docs from "@/components/ui/Docs";


export default function DocsPage({ params }: { params: { locale: string; slug: string } }) {

  const t = useTranslations('docs')
  const messages = useMessages()
  const triggers = messages.docs.triggers

  return (
    <main className="flex flex-col min-h-screen bg-black ">
      
      <div className="hidden md:block h-[15rem] w-full"/>

      <Docs params={params} t={t} messages={messages} triggers={triggers}/>

      <CTA/>

    </main>
  );
}
