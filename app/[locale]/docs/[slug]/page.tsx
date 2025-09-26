export default function DocsPage({ params }: { params: { locale: string; slug: string } }) {
  return (
    <div>
      <h1>Docs for {params.slug}</h1>
    </div>
  );
}
