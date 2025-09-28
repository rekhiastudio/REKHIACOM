export default function DocsPage({ params }: { params: { locale: string; slug: string } }) {
  return (
    <main>
      <h1>Docs for {params.slug}</h1>
    </main>
  );
}
