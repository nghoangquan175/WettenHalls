import Image from 'next/image';
import React from 'react';

import IconArrowRight from './icons/IconArrowRight';

interface ProfileCardProps {
  img: string;
  name: string;
  position: string;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ img, name, position, className }) => {
  return (
    <div className={`bg-baseIron100 p-5 rounded-[20px] flex flex-col gap-4 w-full md:w-[360px] ${className || ''}`}>
      {/* Image Section */}
      <div className='h-[328px] relative rounded-[20px] overflow-hidden w-full shrink-0'>
        <Image src={img} alt={name} fill className='object-cover' />
      </div>

      {/* Details Row */}
      <div className='flex items-end justify-between gap-4 mt-2'>
        <div className='flex-1 flex flex-col gap-2'>
          <h4 className='HeadingSBold text-baseIron950 text-[24px] uppercase leading-none'>{name}</h4>
          <p className='ContentLRegular text-baseIron950 text-[18px] leading-[1.2]'>{position}</p>
        </div>

        {/* Arrow Button */}
        <div className='bg-accentAmber500 rounded-full p-2.5 flex items-center justify-center shrink-0 size-10'>
          <IconArrowRight />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
