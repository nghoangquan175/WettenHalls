import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';

import SingleArticle from './SingleArticle';
async function getArticle(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/articles/public/${slug}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Failed to fetch article: ${res.statusText}`);
    }

    const article = await res.json();

    return {
      id: article.id,
      title: article.title,
      description: article.description,
      content: article.content,
      date: article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-GB') : '',
      thumbnail: article.thumbnail || '',
      slug: article.slug,
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching article:', error);
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  noStore();
  const { slug } = await params;

  // For catch-all [...slug], we'll take the first part as the slug
  const articleSlug = slug[slug.length - 1];

  const article = await getArticle(articleSlug);

  if (!article) {
    notFound();
  }

  return <SingleArticle article={article} />;
}
