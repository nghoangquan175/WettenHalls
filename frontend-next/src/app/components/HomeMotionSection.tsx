import Image from 'next/image';
import React from 'react';

import ButtonWhite from '@/components/ui/ButtonWhite';

import motionLogo from '@/assets/images/01_Motion.svg';

interface HomeMotionSectionProps {
  data?: any;
  onContactClick?: () => void;
}

const HomeMotionSection: React.FC<HomeMotionSectionProps> = ({ data, onContactClick }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const text = data?.text;
  const buttonContact = data?.buttonContact;
  const imgUrl = data?.img?.url || data?.img?.[0]?.url;

  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const getFullUrl = (url?: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${strapiUrl}${url}`;
  };

  if (!data) return null;

  return (
    <section className='bg-baseIron950 h-[797px] py-[120px] relative overflow-hidden flex flex-col items-center justify-center text-center'>
      {/* Background Decorations (Optional based on design context) */}
      <div className='absolute inset-x-0 bottom-0 h-px bg-white/10' />

      {/* Central Content */}
      <div className='container mx-auto h-[447px] w-[800px] px-5 flex flex-col items-center gap-10 lg:gap-16 relative z-10'>
        {/* Motion Logo */}
        <div className='size-[120px] lg:size-[160px] relative shrink-0'>
          <Image src={mounted ? getFullUrl(imgUrl) : motionLogo.src} alt='Motion Logo' fill className='object-contain' />
        </div>

        {/* Main Headline */}
        <h2 className='text-white DisplayLPoster text-[40px] md:text-[56px] lg:text-[64px] uppercase leading-[0.8] tracking-[-1.5px] lg:tracking-[-2.24px] max-w-[900px]'>{text}</h2>

        {/* Call To Action */}
        <div className='mt-4'>
          <ButtonWhite label={buttonContact?.text || 'CONTACT US'} icon={true} onClick={onContactClick} hover={true} />
        </div>
      </div>
    </section>
  );
};

export default HomeMotionSection;
