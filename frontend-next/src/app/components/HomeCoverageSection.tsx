import Image from 'next/image';
import React from 'react';

import TitleDot from '@/components/ui/TitleDot';

import mapImg from '@/assets/images/01_map.png';

import HomeCoverageCard from './HomeCoverageCard';

interface HomeCoverageSectionProps {
  data?: any;
}

const HomeCoverageSection: React.FC<HomeCoverageSectionProps> = ({ data }) => {
  const dotTitle = data?.dotTitle;
  const title = data?.title;
  const des = data?.des;
  const coverageCard = data?.coverageCard;

  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const getFullUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${strapiUrl}${url}`;
  };

  const cardImgUrl = getFullUrl(coverageCard?.img?.[0]?.url || coverageCard?.img?.url);

  if (!data) return null;

  return (
    <section className='bg-white pb-[40px]'>
      <div className='relative container mx-auto max-w-[1440px] h-[800px]'>
        <div className='absolute w-[1657px] h-[1632px] top-[-450px] left-[-57px] z-[1]'>
          <Image src={mapImg} className='w-full h-full' alt='map' />
        </div>

        <div className='flex justify-between'>
          {/* Left Column: Branding Content */}
          <div className='absolute top-[80px] left-[80px] w-[480px] h-[200px] flex flex-col gap-6 z-2'>
            {dotTitle && <TitleDot title={dotTitle} />}
            <h2 className='DisplayMPoster text-coreRed900 uppercase whitespace-pre-wrap'>{title}</h2>
            <p className='ContentXLRegular text-baseIron950'>{des}</p>
          </div>

          {/* Right Column: Coverage Card */}
          <div className='absolute top-[80px] left-[760px] z-2'>
            <HomeCoverageCard title={coverageCard?.title || ''} description={coverageCard?.des || ''} img={cardImgUrl} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCoverageSection;
