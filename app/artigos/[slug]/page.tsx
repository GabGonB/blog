import { getArticleBySlug, getArticles, Article } from '../../../lib/getArticles';

type Props = {
    params: { slug: string };
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const articles = await getArticles();
    return articles.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
    const article = await getArticleBySlug(params.slug);
    if (!article) {
        return {
            title: 'Artigo não encontrado',
            description: 'O artigo solicitado não foi encontrado.'
        };
    }

    return {
        title: `${article.title} — Meu Blog`,
        description: article.description ?? article.content.slice(0, 160)
    };
}

export default async function ArticlePage({ params }: Props) {
    const article = await getArticleBySlug(params.slug);

    if (!article) {
        return (
            <div>
                <h2>Artigo não encontrado</h2>
                <p>Não encontramos o artigo solicitado.</p>
            </div>
        );
    }

    return (
        <article>
            <h1>{article.title}</h1>
            <p>
                <em>
                    Por {article.author} — {new Date(article.publishedAt).toLocaleDateString('pt-BR')}
                </em>
            </p>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
    );
}

