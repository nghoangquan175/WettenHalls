'use client';

import Link from 'next/link';
import React from 'react';

import IconArrowRight from './icons/IconArrowRight';

interface ButtonWhiteProps {
  label: string;
  url?: string;
  icon?: boolean;
  onClick?: () => void;
  hover?: boolean;
}

const ButtonWhite: React.FC<ButtonWhiteProps> = ({ label, url = '', icon = false, onClick, hover = false }) => {
  const commonClasses = `bg-baseIron00 flex items-center p-[4px] relative rounded-[80px] transition-all duration-300 cursor-pointer w-fit text-coreRed900 ${hover ? 'hover:bg-baseIron200' : ''}`;

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

  return (
    <div className={commonClasses} onClick={onClick}>
      {content}
    </div>
  );
};

export default ButtonWhite;
