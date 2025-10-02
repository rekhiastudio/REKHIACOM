import { FaqAccordion } from "@/components/ui/FaqAccordion"
import { useTranslations } from "next-intl"
import { useMessages } from "next-intl";
import CTA from "@/components/ui/cta-prefooter";
import { useLocale } from "next-intl";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";


type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("faq.title"),
    description: t("faq.description"),
    alternates: {
      languages: {
        en: "https://www.rekhia.com/en/faq",
        he: "https://www.rekhia.com/he/faq"
      }
    },
    openGraph: {
      title: t("faq.title"),
      description: t("faq.description"),
      url: `https://www.rekhia.com/${locale}/faq`,
      siteName: "Rekhia",
      images: [
        {
          url: "https://www.rekhia.com/og-faq.png",
          width: 1200,
          height: 630,
          alt: "Rekhia - FAQ"
        }
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: t("faq.title"),
      description: t("faq.description"),
      images: ["https://www.rekhia.com/og-faq.png"]
    }
  };
}

export default function Faq(){
  const t = useTranslations('faq');
  const messages = useMessages();
  const locale = useLocale();

  const isRTL = locale === "he";

  const items1 = messages.faq.items1;
  const items2 = messages.faq.items2;

  return (
    <main className="flex flex-col min-h-screen bg-black">
      <section id="header" className="flex flex-col items-center justify-center  pt-[13rem] md:pt-[15rem] px-5 md:px-20">
        <h1 className="text-3xl font-bold text-neutral-200 text-center mb-5">
          {t("title")}
        </h1>
        <p className="max-w-2xl text-center text-neutral-300">
          {t("subtitle")}
        </p>
      </section>

      <section id="questions" className="grid grid-cols-1 flex-1 h-full xl:grid-cols-2 pb-40">
        <div className={`flex justify-center px-10 pt-16 ${isRTL ? "xl:justify-end xl:pl-16" : "xl:justify-end xl:pr-16"} `}>
          <FaqAccordion items={items1} isRTL={isRTL}/>
        </div>
        <div className={`flex justify-center px-10 pt-16 ${isRTL ? "xl:justify-start xl:pr-16" : "xl:justify-start xl:pl-16"}`}>
          <FaqAccordion items={items2} isRTL={isRTL}/>
        </div>
      </section>

      <CTA/>
    </main>
  )
}
