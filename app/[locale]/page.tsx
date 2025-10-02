
import { HeroParallaxDemo } from "@/components/ui/Hero";
import Services from "@/components/ui/Services";
import TimelineDemo from "@/components/ui/Timeline";
import CTA from "@/components/ui/cta-prefooter";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { locale: string };
};

// SEO dinámico para homepage
export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: {
      languages: {
        en: "https://www.rekhia.com/en",
        he: "https://www.rekhia.com/he"
      }
    },
    openGraph: {
      title: t("home.title"),
      description: t("home.description"),
      url: `https://rekhia.com/${locale}`,
      siteName: "Rekhia",
      images: [
        {
          url: "https://www.rekhia.com/og-home.png",
          width: 1200,
          height: 630,
          alt: "Rekhia Studio - Home"
        }
      ],
      locale: locale === "he" ? "he_IL" : "en_US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: t("home.title"),
      description: t("home.description"),
      images: ["https://www.rekhia.com/og-home.png"]
    }
  };
}

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-items-center min-h-screen gap-16 bg-black">
      <HeroParallaxDemo />
      <Services />
      <TimelineDemo />
      <CTA />
    </main>
  );
};