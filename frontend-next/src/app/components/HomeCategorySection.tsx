'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import HomeCategoryCard from './HomeCategoryCard';

interface HomeCategorySectionProps {
  data?: any;
}

const HomeCategorySection: React.FC<HomeCategorySectionProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [swiper, setSwiper] = useState<any>(null);
  const [offset, setOffset] = useState(0);

  const title = data?.title;
  const description = data?.des;
  const categoryItems = data?.cateTitles || [];

  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const getFullUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${strapiUrl}${url}`;
  };

  useEffect(() => {
    const updateOffset = () => {
      const containerWidth = 1440;
      const padding = Math.max(40, (window.innerWidth - containerWidth) / 2);
      setOffset(padding);
    };

    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  const scrollToTab = (index: number) => {
    setActiveTab(index);
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  if (!data) return null;

  return (
    <section className='bg-baseIron100 py-[80px] overflow-hidden relative z-[2]'>
      <div className='container max-w-[1440px] mx-auto mb-10 px-4 lg:px-[80px]'>
        <div className='flex flex-col gap-[40px]'>
          {/* Header */}
          <div className='flex flex-col gap-5 items-center'>
            <h2 className='DisplayMPoster text-coreRed900 text-[48px] uppercase text-center leading-[0.8] tracking-[-1.92px]'>{title}</h2>
            <p className='ContentXLRegular text-baseIron950 text-[20px] text-center leading-[1.2]'>{description}</p>
          </div>
          {/* Tab Navigation */}
          <div className='flex items-center w-fit mx-auto border border-baseIron950 rounded-[80px] overflow-hidden z-10 bg-white shadow-sm'>
            {categoryItems.map((cat: any, index: number) => (
              <button
                key={index}
                onClick={() => scrollToTab(index)}
                className={`px-6 py-3 ContentMBold text-[16px] transition-all duration-300 whitespace-nowrap cursor-pointer
                                    ${activeTab === index ? 'bg-coreRed900 text-white' : 'bg-white text-baseIron950 hover:bg-baseIron100'}
                                    ${index !== categoryItems.length - 1 ? 'border-r border-baseIron950' : ''}
                                `}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Swiper Slider */}
      <div className='w-full'>
        <Swiper
          onSwiper={setSwiper}
          onSlideChange={(s) => setActiveTab(s.activeIndex)}
          slidesPerView='auto'
          spaceBetween={20}
          centeredSlides={false}
          className='category-swiper !overflow-visible'
          slidesOffsetBefore={offset}
          slidesOffsetAfter={offset}
        >
          {categoryItems.map((cat: any, index: number) => {
            const cardData = cat.cateCards;
            const imgUrl = getFullUrl(cardData?.img?.[0]?.url || cardData?.img?.url);

            return (
              <SwiperSlide key={index} className='!w-[1121px]'>
                <div className='h-[521px] transition-all duration-500'>
                  <HomeCategoryCard
                    img={imgUrl}
                    title={cat.title}
                    description={cardData?.des || ''}
                    primaryBtn={cat.buttonFind ? { label: cat.buttonFind.text, url: cat.buttonFind.url } : undefined}
                    secondaryBtn={cat.buttonTrack ? { label: cat.buttonTrack.text, url: cat.buttonTrack.url } : undefined}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCategorySection;
