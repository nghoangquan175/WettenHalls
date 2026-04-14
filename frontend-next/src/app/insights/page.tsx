import { unstable_noStore as noStore } from 'next/cache';

import InsightPage from './InsightPage';
async function getArticles() {
  // const params = {
  //     fields: ['title', 'description', 'slug', 'publishedAt'],
  //     populate: {
  //         cover: {
  //             fields: ['url']
  //         }
  //     },
  //     sort: ['publishedAt:desc']
  // };

  // try {
  //     const res = await fetchStrapi('/articles', params);

  //     // Strapi v5 directly returns data as an array
  //     const articlesData = res.data || [];

  //     return articlesData.map((article: any) => {
  //         const coverUrl = article.cover?.url || '';
  //         const fullImageUrl = coverUrl.startsWith('http')
  //             ? coverUrl
  //             : `${process.env.NEXT_PUBLIC_API_URL}${coverUrl}`;

  //         return {
  //             id: article.id,
  //             title: article.title,
  //             slug: article.slug,
  //             content: article.description || '',
  //             date: article.publishedAt
  //                 ? new Date(article.publishedAt).toLocaleDateString('en-GB')
  //                 : '',
  //             thumbnail: fullImageUrl,
  //         };
  //     });
  // } catch (error) {
  //     console.error('Error fetching articles:', error);
  //     return [];
  // }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/published`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.statusText}`);
    }

    const data = await res.json();
    const articlesData = data.articles || [];

    return articlesData.map((article: any) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      content: article.description || '',
      date: article.createdAt ? new Date(article.createdAt).toLocaleDateString('en-GB') : '',
      thumbnail: article.thumbnail || '',
    }));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function Page() {
  noStore();
  const articles = await getArticles();

  return <InsightPage articles={articles} />;
}
