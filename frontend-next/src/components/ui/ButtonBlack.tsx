'use client';

import Link from 'next/link';
import React from 'react';

import IconArrowRight from './icons/IconArrowRight';

interface ButtonBlackProps {
  label: string;
  url?: string;
  icon?: boolean;
}

const ButtonBlack: React.FC<ButtonBlackProps> = ({ label, url, icon = false }) => {
  const commonClasses = `bg-baseIron950 flex items-center p-[4px] relative rounded-[80px] transition-all duration-300 cursor-pointer w-fit text-white hover:bg-baseIron700`;

  const content = (
    <>
      <div className='flex px-[12px] py-[4px] items-center justify-center relative shrink-0 gap-3'>
        <p className='ContentMBold leading-[1.2] not-italic relative shrink-0 text-[16px] text-center whitespace-nowrap'>{label}</p>
      </div>
      {icon && <IconArrowRight />}
    </>
  );

  if (url) {
    return (
      <Link href={url} className={commonClasses}>
        {content}
      </Link>
    );
  }

  return <div className={commonClasses}>{content}</div>;
};

export default ButtonBlack;
