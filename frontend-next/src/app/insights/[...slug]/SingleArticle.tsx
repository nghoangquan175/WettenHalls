import Image from 'next/image';
import Link from 'next/link';

import RichTextRenderer from '@/components/ui/RichTextRenderer';

interface SingleArticleProps {
  article: {
    title: string;
    description: string;
    content: string;
    date: string;
    thumbnail: string;
    slug: string;
  };
}

export default function SingleArticle({ article }: SingleArticleProps) {
  return (
    <main className='min-h-screen bg-white'>
      {/* Top Navigation / Breadcrumbs */}
      <nav className='w-full max-w-[1440px] mx-auto px-5 lg:px-10 pt-10 lg:pt-16 pb-6'>
        <Link href='/insights' className='inline-flex items-center gap-3 text-baseIron600 hover:text-accentAmber600 transition-all group'>
          <div className='w-8 h-8 flex items-center justify-center border border-baseIron200 rounded-full group-hover:border-accentAmber50 group-hover:bg-accentAmber50 transition-all'>
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' className='rotate-180 transition-transform group-hover:-translate-x-1'>
              <path d='M5 12H19M19 12L12 5M19 12L12 19' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </div>
          <span className='text-[14px] font-bold uppercase tracking-widest'>Back to Insights</span>
        </Link>
      </nav>

      {/* Article Content Section */}
      <article className='w-full max-w-[1440px] mx-auto px-5 lg:px-10 pb-20'>
        <div className='max-w-[1000px] mx-auto flex flex-col gap-10 md:gap-14'>
          {/* Header: Date & Title */}
          <header className='flex flex-col gap-6 text-center md:text-left'>
            <div className='flex flex-col gap-4'>
              <p className='text-accentAmber600 text-[14px] lg:text-[16px] font-bold uppercase tracking-[0.2em]'>{article.date}</p>
              <h1 className='HeadingXLBold text-baseIron950 text-[36px] md:text-[56px] lg:text-[72px] uppercase leading-[1.05] tracking-tight'>{article.title}</h1>
            </div>
            {article.description && <p className='ContentLRegular text-baseIron600 text-[18px] lg:text-[22px] leading-relaxed max-w-[850px]'>{article.description}</p>}
          </header>

          {/* Hero Image / Cover */}
          <div className='w-full aspect-[21/9] relative rounded-[20px] md:rounded-[30px] lg:rounded-[40px] overflow-hidden bg-baseIron100 shadow-xl shadow-baseIron950/5'>
            <Image src={article.thumbnail} alt={article.title} fill className='object-cover transition-transform duration-1000 hover:scale-[1.02]' />
          </div>

          {/* Main Rich Text Content */}
          <div className='max-w-[800px] mx-auto w-full'>
            <RichTextRenderer content={article.content} />
          </div>
        </div>
      </article>
    </main>
  );
}
