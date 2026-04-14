import React from 'react';

import dotIcon from '@/assets/icons/ellipse.svg';

import Icon from './icons/Icon';

interface TitleDotProps {
  title: string;
  className?: string;
}

const TitleDot: React.FC<TitleDotProps> = ({ title, className }) => {
  return (
    <div className={`bg-baseIron00 h-[28px] px-2 rounded-lg flex items-center gap-3 w-fit ${className || ''}`}>
      <div className='size-[10px] shrink-0'>
        <Icon src={dotIcon} className='size-full' bgColor='#FF6B00' />
      </div>
      <span className='ContentSBold text-coreRed900'>{title}</span>
    </div>
  );
};

export default TitleDot;
