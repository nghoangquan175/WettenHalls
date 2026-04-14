import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import IconArrowRight from '@/components/ui/icons/IconArrowRight';

interface InsightCardProps {
  thumbnail: string;
  category?: string;
  title: string;
  content: string;
  date: string;
  slug: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ thumbnail, category, title, content, date, slug }) => {
  return (
    <Link href={`/insights/${slug}`} className='group h-full'>
      <div className='bg-baseIron100 p-4 rounded-[20px] flex flex-col gap-4 h-full transition-all duration-300 hover:bg-baseIron200'>
        {/* Image Section */}
        <div className='aspect-square relative rounded-[15px] overflow-hidden w-full shrink-0'>
          <Image src={thumbnail} alt={title} fill className='object-cover transition-transform duration-500 group-hover:scale-105' />
          {/* Category Tag */}
          {category && (
            <div className='absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-center min-w-[80px]'>
              <span className='text-[12px] font-bold text-baseIron950 uppercase'>{category}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className='flex flex-col flex-1 justify-between gap-4'>
          <div className='flex flex-col gap-2'>
            <p className='text-[14px] text-baseIron600 font-medium uppercase'>{date}</p>
            <h4 className='HeadingSBold text-baseIron950 text-[18px] lg:text-[20px] uppercase leading-tight line-clamp-2 group-hover:text-accentAmber600 transition-colors'>{title}</h4>
            <p className='ContentMRegular text-baseIron600 text-[14px] leading-relaxed line-clamp-2'>{content}</p>
          </div>

          {/* Footer Row */}
          <div className='flex items-center justify-end'>
            <div className='bg-accentAmber500 rounded-full p-2 flex items-center justify-center shrink-0 size-8 transition-transform group-hover:translate-x-1'>
              <IconArrowRight />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InsightCard;
