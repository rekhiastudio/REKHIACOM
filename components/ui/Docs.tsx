
import { DocsSidebar } from "./DocsSidebar"
import { DocsArticleRenderer } from "./DocsArticleRenderer"

export default async function Docs( { params, t, messages, triggers } : { params: { locale: string; slug: string }, t: any, messages: any, triggers: any } ) {

  const { slug } = await params;

  const findArticle = (slug: string) => {
      const data = messages.docs.articles.find( art => art.link === slug)
      return data
  }

  const article = findArticle(slug);

    return (
        <section id="docs" className="flex flex-col flex-grow md:flex-row w-full text-white pt-40 pb-20 md:pt-0 md:pb-40">
            {/* Sidebar */}
            <aside id="sidebar" className="hidden md:flex md:flex-col border-r border-neutral-800 space-y-3  px-10 w-1/3  py-20 md:py-10  items-end">

                <div className="min-w-[16rem] mb-6 ">
                    <h2 className="text-lg font-bold">{t('title')} / {article.title}</h2>
                </div>
                

                {/* Aquí luego va el Accordion */}
                <div className="w-[15rem] max-w-[15rem]">
                    <DocsSidebar triggers={triggers} current={slug}/>
                </div>
            </aside>


                <div className="px-6">
                    <h2 className="block md:hidden text-sm font-medium">{t('title')} / {article.title}</h2>
                </div>

            {/* Content */}
            <section id="article" className="px-6 md:px-12 py-5 md:py-10 flex-grow ">
                <DocsArticleRenderer article={article} />
            </section>
        </section>
    )
}