'use client';

import Link from 'next/link';
import React from 'react';

interface BannerActionCardProps {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const BannerActionCard: React.FC<BannerActionCardProps> = ({ title, icon, link }) => {
  return (
    <Link
      href={link}
      className='backdrop-blur-[10px] bg-baseIron1000/50 flex flex-col gap-[8px] items-center justify-center p-[10px] relative rounded-[16px] size-full transition-all duration-300 hover:bg-baseIron1000/60 group'
    >
      <div className='relative shrink-0 size-[24px] text-white flex items-center justify-center'>{icon}</div>
      <p className='ContentMBold leading-[1.2] not-italic relative shrink-0 text-[16px] text-center text-white whitespace-nowrap'>{title}</p>
    </Link>
  );
};

export default BannerActionCard;
