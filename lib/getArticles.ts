import fs from 'fs/promises';
import path from 'path';

export interface Article {
  slug: string;
  titulo: string;
  descricao?: string;
  autor: string;
  data: string;
  conteudo: string;
}

const dataFile = path.join(process.cwd(), 'data', 'artigos.json');

export async function getArticles(): Promise<Article[]> {
    if (process.env.USE_API === 'true' && process.env.CRUDCRUD_URL) {
        try {
            const res = await fetch(process.env.CRUDCRUD_URL!, { cache: 'no-store' });
            if (!res.ok) throw new Error('Falha ao buscar API');
            const data = await res.json();
            return data as Article[];
            } catch (err) {
                console.error('Erro ao buscar API, caindo para JSON local:', err);
            }
    }

    const raw = await fs.readFile(dataFile, 'utf-8');
    const parsed = JSON.parse(raw) as Article[];
    return parsed;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
    const articles = await getArticles();
    return articles.find(a => a.slug === slug);
}
