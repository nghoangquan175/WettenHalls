'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ProfileCard from '@/components/ui/ProfileCard';
import TitleDotCard from '@/components/ui/TitleDotCard';

interface TeamSectionProps {
  data?: any;
}

const TeamSection: React.FC<TeamSectionProps> = ({ data }) => {
  const dotTitle = data?.dotTitle;
  const title = data?.title;
  const description = data?.des;
  const teamMembers = data?.profileCards || [];

  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const getFullUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${strapiUrl}${url}`;
  };

  if (!data) return null;

  return (
    <section className='bg-white py-[80px] relative overflow-hidden'>
      <div className='container mx-auto max-w-[1440px] flex flex-col lg:flex-row gap-5 lg:gap-0 items-stretch px-20'>
        {/* Left Column: Branding Card (Sticky & Overlapping) */}
        <div className='w-full lg:w-[440px] shrink-0 z-20 sticky lg:relative top-0 lg:top-0 h-fit lg:h-auto'>
          {/* Left Mask: Prevents cards from showing beyond the TitleDotCard */}
          <div className='absolute top-0 bottom-0 left-[-100vw] right-[-20px] bg-white -z-10 hidden lg:block' />
          <TitleDotCard dotTitle={dotTitle || 'TEAM'} mainTitle={<div className='whitespace-pre-wrap uppercase'>{title}</div>} description={description} className='h-full bg-baseIron100' />
        </div>

        {/* Right Column: Swiper Carousel */}
        <div className='flex-1 w-full lg:w-0 lg:-ml-10 overflow-visible pl-5 lg:pl-16 mt-10 lg:mt-0'>
          <Swiper slidesPerView='auto' spaceBetween={16} className='team-swiper !overflow-visible'>
            {teamMembers.map((member: any, index: number) => {
              // Handle Strapi 4 (member.attributes) and Strapi 5 (member) structures
              const attrs = member.attributes || member;
              const name = attrs.name;
              const position = attrs.title;
              const imgData = attrs.img;

              const imgUrl = getFullUrl(imgData?.[0]?.url || imgData?.url || imgData?.data?.attributes?.url || imgData?.data?.[0]?.attributes?.url);

              return (
                <SwiperSlide key={index} className='!w-auto'>
                  <ProfileCard img={imgUrl} name={name} position={position} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
