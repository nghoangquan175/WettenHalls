import React from 'react';

import InsightCard from './InsightCard';

export interface Article {
  id: number;
  title: string;
  category?: string;
  date: string;
  thumbnail: string;
  content: string;
  slug: string;
}

interface InsightListProps {
  articles: Article[];
}

const InsightList: React.FC<InsightListProps> = ({ articles }) => {
  return (
    <div className='w-full max-w-[1440px] mx-auto px-5 lg:px-10 py-[60px] lg:py-[100px]'>
      <div className='flex flex-col gap-10 lg:gap-16'>
        {/* Header Section */}
        <div className='flex flex-col gap-6 max-w-[800px]'>
          <h1 className='HeadingXLBold text-baseIron950 text-[48px] lg:text-[64px] uppercase leading-none'>
            Our Latest <span className='text-accentAmber500'>Insights</span>
          </h1>
          <p className='ContentLRegular text-baseIron600 text-[18px] lg:text-[20px] leading-[1.6]'>
            Stay up to date with the latest news, transport innovations, and regional logistics updates from Wettenhalls.
          </p>
        </div>

        {/* Grid Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
          {articles.map((article) => (
            <InsightCard key={article.id} title={article.title} category={article.category} date={article.date} thumbnail={article.thumbnail} content={article.content} slug={article.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightList;
