'use client';

import Image from 'next/image';
import React from 'react';

import ButtonWhite from '@/components/ui/ButtonWhite';
import Icon from '@/components/ui/icons/Icon';

// Import icons & images
import shieldIcon from '@/assets/icons/shield.svg';

import BannerActionCard from './BannerActionCard';

interface HomeHeroBannerProps {
  data?: any;
}

const HomeHeroBanner: React.FC<HomeHeroBannerProps> = ({ data }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic data from Strapi
  const title = data?.title;
  const buttonLabel = data?.buttonFind?.text;
  const buttonUrl = data?.buttonFind?.url;
  const actionCards = data?.heroBannerCards || [];

  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const getFullUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${strapiUrl}${url}`;
  };

  const bgUrl = getFullUrl(data?.bg?.[0]?.url || data?.bg?.url);
  const logoUrl = getFullUrl(data?.logo?.url);

  if (!data) return null;

  return (
    <section className='relative w-full h-[812px] bg-white overflow-hidden'>
      {/* Background Image & Overlay */}
      <div className='absolute inset-0 z-0'>
        {mounted && bgUrl && <Image src={bgUrl} alt='Hero Banner' fill className='object-cover' />}
        <div className='absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent pointer-events-none' />
      </div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-10 pt-[200px] flex flex-col gap-10 max-w-[1440px]'>
        {/* Logo */}
        {logoUrl && (
          <div className='absolute top-10 left-10 w-[226px] h-[40px]'>
            <Image src={logoUrl} alt='Wettenhalls Logo' fill className='object-contain' priority />
          </div>
        )}

        {/* Trust Badge */}
        <div className='bg-baseIron1000/50 backdrop-blur-[10px] rounded-[8px] px-2 py-1 flex items-center gap-1 w-fit'>
          <div className='text-white'>
            <Icon src={shieldIcon} className='size-[20px]' />
          </div>
          <span className='ContentSBold text-white text-[14px] leading-[1.2] uppercase'>TRUSTED BY "BRANDNAME"</span>
        </div>

        {/* Heading & CTA */}
        <div className='flex flex-col gap-10 max-w-[520px]'>
          {title && <h1 className='DisplayXLPoster text-coreRed900 text-[64px] leading-[0.8] tracking-[-2.56px] uppercase whitespace-pre-wrap'>{title}</h1>}

          {buttonLabel && <ButtonWhite label={buttonLabel} url={buttonUrl || '#'} icon={true} />}
        </div>
        <div className='absolute top-[680px] left-[40px] z-10 flex gap-[188px] items-end container mx-auto max-w-[1440px]'>
          {/* Dots / Indicators */}
          <div className='bg-baseIron1000/50 backdrop-blur-[10px] rounded-[16px] p-[10px] flex items-center justify-center gap-2 h-[32px] w-[132px]'>
            <div className='bg-accentAmber500 h-2 w-[60px] rounded-[16px] relative overflow-hidden'>
              <div className='absolute inset-0 bg-coreRed600 translate-x-[-100%]' />
            </div>
            <div className='bg-baseIron700 h-2 w-2 rounded-full' />
            <div className='bg-baseIron700 h-2 w-2 rounded-full' />
          </div>

          {/* Action Cards */}
          <div className='flex gap-5 flex-1 max-w-[1000px]'>
            {actionCards.map((card: any, index: number) => (
              <BannerActionCard key={index} title={card.title} icon={<Icon src={card.icon} className='size-[24px]' />} link={card.url || '#'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroBanner;
