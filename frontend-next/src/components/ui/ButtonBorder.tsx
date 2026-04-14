'use client';

import Link from 'next/link';
import React from 'react';

import IconArrowRight from './icons/IconArrowRight';

interface ButtonBorderProps {
  label: string;
  url?: string;
  icon?: boolean;
}

const ButtonBorder: React.FC<ButtonBorderProps> = ({ label, url, icon = false }) => {
  const commonClasses = `bg-baseIron00 border border-baseIron950 flex items-center p-[4px] relative rounded-[80px] transition-all duration-300 cursor-pointer w-fit text-baseIron950 hover:border-baseIron700 hover:text-baseIron700 transition-all`;

  const content = (
    <div className='flex items-center justify-center px-[12px] relative shrink-0 gap-2'>
      <p className='ContentMBold leading-[1.2] not-italic relative shrink-0 text-[16px] text-center whitespace-nowrap'>{label}</p>
      {icon && <IconArrowRight />}
    </div>
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

export default ButtonBorder;
