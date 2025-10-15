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
  let articles: any[] = [];

  if (process.env.USE_API === 'true' && process.env.CRUDCRUD_URL) {
    try {
      const res = await fetch(process.env.CRUDCRUD_URL!, { cache: 'no-store' });
      if (!res.ok) throw new Error('Falha ao buscar API');
      articles = await res.json();
    } catch (err) {
      console.error('Erro ao buscar API, caindo para JSON local:', err);
    }
  }

  if (!articles.length) {
    const raw = await fs.readFile(dataFile, 'utf-8');
    articles = JSON.parse(raw);
  }


  const formatted = articles.map((a) => ({
    slug: a.slug,
    titulo: a.titulo || a.title || 'Sem título',
    descricao: a.descricao || a.description || '',
    autor: a.autor || a.author || 'Autor desconhecido',
    data: a.data || a.publishedAt || new Date().toISOString(),
    conteudo: a.conteudo || a.content || '',
  }));

  return formatted;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug);
}
