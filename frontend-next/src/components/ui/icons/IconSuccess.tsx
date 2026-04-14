import Image from 'next/image';
import React from 'react';

import verifiedIcon from '@/assets/icons/verified.svg';

const IconSuccess: React.FC = () => {
  return (
    <div className='bg-accentAmber500 rounded-[8px] p-2 flex items-center justify-center size-[40px]'>
      <div className='relative size-[24px]'>
        <Image src={verifiedIcon} alt='Success' fill className='object-contain' />
      </div>
    </div>
  );
};

export default IconSuccess;
