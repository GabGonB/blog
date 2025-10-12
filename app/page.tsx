import Link from 'next/link';
import { getArticles } from '../lib/getArticles';

export const dynamic = 'force-static';

export default async function HomePage() {
    const articles = await getArticles();

    return (
        <section>
            <h2>Artigos</h2>
            <ul>
                {articles.map(a => (
                    <li key={a.slug} style={{ margin: '1rem 0' }}>
                        <h3>
                            <Link href={`/artigos/${a.slug}`}>{a.title}</Link>
                        </h3>
                        <p>{a.description}</p>
                        <small>
                            Por {a.author} — {new Date(a.publishedAt).toLocaleDateString('pt-BR')}
                        </small>
                    </li>
                ))}
            </ul>
        </section>
    );
}