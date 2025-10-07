import { useTranslations, useMessages } from "next-intl";
import CTA from "@/components/ui/cta-prefooter";
import Docs from "@/components/ui/Docs";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string, slug: string }>;
};

// Dynamic SEO for each doc article
export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { locale, slug } = await params;
  const { default: seo } = await import(`@/messages/${locale}/seo.json`);

  const articleSeo = seo.docs[slug] || seo.docs['default'];


  const title = articleSeo?.title 
  const description = articleSeo?.description 

  const url = `https://rekhia.com/${locale}/docs/${slug}`;
  const imageUrl = articleSeo?.imgUrl 

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "Rekhia Studio",
      locale: locale === "he" ? "he_IL" : "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}

export default function DocsPage({ params }: { params: { locale: string; slug: string } }) {

  const t = useTranslations('docs')
  const messages = useMessages()
  const triggers = messages.docs.triggers

  return (
    <main id="docs" className="flex flex-col min-h-screen bg-black ">
      <div className="hidden md:block h-[15rem] w-full"/>

      <Docs params={params} t={t} messages={messages} triggers={triggers}/>
      <CTA/>
    </main>
  );
}
