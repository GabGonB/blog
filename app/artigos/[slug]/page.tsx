import { getArticles } from '@/lib/getArticles';
import type { Metadata } from 'next';

type Params = { slug: string };

export async function generateMetadata(
  { params }: { params: Params }
): Promise<Metadata> {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return {
      title: 'Artigo não encontrado',
      description: 'O artigo solicitado não existe.',
    };
  }

  return {
    title: article.titulo,
    description: article.descricao || article.conteudo.slice(0, 150),
  };
}


export default async function ArtigoPage({
  params,
}: {
  params: Params;
}) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);

  if (!article) {
    return <h1>Artigo não encontrado</h1>;
  }

  return (
    <article className="container mx-auto py-10 prose">
      <h1>{article.titulo}</h1>
      <p className="text-gray-500">
        {article.autor} — {article.data}
      </p>
      <div dangerouslySetInnerHTML={{ __html: article.conteudo }} />
    </article>
  );
}


export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}
