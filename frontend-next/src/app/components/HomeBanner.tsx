import React from 'react';

import ButtonWhite from '@/components/ui/ButtonWhite';

import participationBg from '@/assets/images/01_Participation.png';

interface HomeBannerProps {
  data?: any;
}

const HomeBanner: React.FC<HomeBannerProps> = ({ data }) => {
  const title = data?.title;
  const description = data?.des;
  const button = data?.button;
  const imgUrl = data?.img?.url || data?.img?.[0]?.url;

  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const getFullUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${strapiUrl}${url}`;
  };

  if (!data) return null;

  const fullImgUrl = getFullUrl(imgUrl) || participationBg.src;

  return (
    <section className='bg-white pt-[80px] px-[80px]'>
      <div className='container mx-auto max-w-[1280px]'>
        <div className='h-[360px] relative rounded-[20px] overflow-hidden flex items-center p-10 lg:p-16'>
          {/* Background Image */}
          <div
            className='absolute h-full inset-0 z-0'
            style={{
              backgroundImage: `
                            url(${fullImgUrl}),
                            linear-gradient(270deg, rgba(237,237,237,0) 50%, #EDEDED 100%),
                            url(${fullImgUrl})
                            `,
              backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
              backgroundSize: 'cover',
            }}
          />

          {/* Content Stack */}
          <div className='relative z-10 max-w-[580px] flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <h2 className='text-coreRed900 DisplayMPoster text-[40px] lg:text-[48px] uppercase leading-[0.85] tracking-[-1px] lg:tracking-[-1.92px]'>{title}</h2>
              <p className='ContentXLRegular text-baseIron950 text-[18px] lg:text-[20px] leading-[1.3] max-w-[500px]'>{description}</p>
            </div>

            {button && <ButtonWhite label={button.text} icon={true} url={button.url} hover={true} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
