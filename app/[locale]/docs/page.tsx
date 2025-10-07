import { redirect } from "next/navigation";

export default async function DocsDefaultPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;


  const messages = (await import(`@/messages/${locale}.json`)).default;
  const firstArticle = messages.docs?.articles?.[0]?.link || "about";

  redirect(`/${locale}/docs/${firstArticle}`);
}
