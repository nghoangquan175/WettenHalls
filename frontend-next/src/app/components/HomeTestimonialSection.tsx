'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import TestimonialCard from '@/components/ui/TestimonialCard';
import TitleDotCard from '@/components/ui/TitleDotCard';

interface HomeTestimonialSectionProps {
  data?: any;
}

const HomeTestimonialSection: React.FC<HomeTestimonialSectionProps> = ({ data }) => {
  const dotTitle = data?.dotTitle;
  const title = data?.title;
  const description = data?.des;
  const testimonials = data?.testimonialCards || [];

  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const getFullUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${strapiUrl}${url}`;
  };

  if (!data) return null;

  return (
    <section className='bg-white lg:h-[600px] relative overflow-hidden'>
      <div className='container h-full mx-auto max-w-[1440px] p-[80px] flex flex-col lg:flex-row gap-5 lg:gap-0 items-stretch'>
        {/* Left Column: Branding Card (Sticky & Overlapping) */}
        <div className='w-full lg:w-[440px] shrink-0 z-20 sticky lg:relative top-0 lg:top-0 h-fit lg:h-auto'>
          {/* Left Mask: Prevents cards from showing beyond the TitleDotCard */}
          <div className='absolute top-0 bottom-0 left-[-100vw] right-[-20px] bg-white -z-10 hidden lg:block' />
          <TitleDotCard dotTitle={dotTitle || 'TESTIMONIALS'} mainTitle={title} description={description} className='h-full bg-baseIron100' />
        </div>

        {/* Right Column: Swiper Carousel */}
        <div className='flex-1 w-full lg:w-0 lg:-ml-10 overflow-visible pl-5 lg:pl-16 mt-10 lg:mt-0'>
          <Swiper slidesPerView='auto' spaceBetween={16} className='testimonial-swiper !overflow-visible h-full'>
            {testimonials.map((testimonial: any, index: number) => {
              const attrs = testimonial.attributes || testimonial;
              const imgUrl = getFullUrl(attrs.img?.[0]?.url || attrs.img?.url || attrs.img?.data?.attributes?.url || attrs.img?.data?.[0]?.attributes?.url);

              return (
                <SwiperSlide key={index} className='!w-auto h-full'>
                  <TestimonialCard img={imgUrl} description={attrs.review} name={attrs.name} position={attrs.title} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonialSection;
