'use client';

import Image from 'next/image';
import React from 'react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import brandImage from '@/assets/images/01_brand.png';

export default function HomeBrands() {
  return (
    <section className='relative bg-baseIron100 overflow-hidden'>
      {/* Horizontal Lines - Fixed Background */}
      <div className='absolute top-[79px] left-0 w-full h-[1px] bg-[#B7C2C2]'></div>
      <div className='absolute top-[239px] left-0 w-full h-[1px] bg-[#B7C2C2]'></div>
      <div className='absolute top-[401px] left-0 w-full h-[1px] bg-[#B7C2C2]'></div>
      <div className='absolute top-[560px] left-0 w-full h-[1px] bg-[#B7C2C2]'></div>

      {/* Frame Container - Centered 1440px wide viewing window */}
      <div className='relative h-[642px] max-w-[1440px] mx-auto bg-baseIron100'>
        {/* Swiper Scrollable Area */}
        <Swiper
          modules={[FreeMode, Mousewheel]}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          mousewheel={{
            forceToAxis: true,
          }}
          resistance={true}
          resistanceRatio={0}
          slidesPerView='auto'
          className='h-full w-full select-none cursor-grab active:cursor-grabbing no-scrollbar'
        >
          <SwiperSlide style={{ width: '2880px' }}>
            <div className='w-[2880px] h-full flex items-center'>
              <Image src={brandImage} alt='Brands' width={2880} height={642} className='max-h-full object-cover pointer-events-none' priority />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
