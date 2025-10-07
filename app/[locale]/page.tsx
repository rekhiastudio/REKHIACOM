
import { HeroParallaxDemo } from "@/components/ui/Hero";
import Services from "@/components/ui/Services";
import TimelineDemo from "@/components/ui/Timeline";
import CTA from "@/components/ui/cta-prefooter";
import type { Metadata } from "next";

type Props = {
  params: { locale: string };
};

// SEO dinámico para homepage
export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { locale } = await params;
  const { default: seo } = await import(`@/messages/${locale}/seo.json`);
  const homeSeo = seo.home;

  return {
    title: homeSeo.title,
    description: homeSeo.description,
    alternates: {
      languages: {
        en: "https://www.rekhia.com/en",
        he: "https://www.rekhia.com/he"
      }
    },
    openGraph: {
      title: homeSeo.title,
      description: homeSeo.description,
      url: `https://www.rekhia.com/${locale}`,
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
      title: homeSeo.title,
      description: homeSeo.description,
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