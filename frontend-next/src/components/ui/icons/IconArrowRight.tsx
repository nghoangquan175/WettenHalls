import React from 'react';

import right from '@/assets/icons/call_made.svg';

import Icon from './Icon';

export default function IconArrowRight() {
  return (
    <div className='bg-accentAmber500 rounded-full p-[8px] flex items-center justify-center text-coreRed900 shrink-0 cursor-pointer'>
      <div className='w-[16px] h-[16px]'>
        <Icon src={right} className='size-[16px]' />
      </div>
    </div>
  );
}
