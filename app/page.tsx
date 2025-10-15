import Link from 'next/link';
import { getArticles } from '@/lib/getArticles';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <section>
      <h2>Artigos</h2>
      <ul>
        {articles.map((a) => (
          <li key={a.slug} style={{ margin: '1rem 0' }}>
            <h3>
              <Link href={`/artigos/${a.slug}`}>{a.titulo}</Link>
            </h3>
            <p>{a.descricao}</p>
            <small>
              Por {a.autor} — {new Date(a.data).toLocaleDateString('pt-BR')}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
