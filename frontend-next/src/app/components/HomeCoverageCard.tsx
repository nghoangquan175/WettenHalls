import Image from 'next/image';
import React from 'react';

import ButtonWhite from '@/components/ui/ButtonWhite';

interface HomeCoverageCardProps {
  title: string;
  img: string;
  description: string;
}

const HomeCoverageCard: React.FC<HomeCoverageCardProps> = ({ title, img, description }) => {
  return (
    <div className='bg-coreRed900  w-[599px] p-10 rounded-[16px] flex flex-col gap-10 items-start'>
      <h3 className='HeadingLBold text-white text-[32px] leading-[1.1]'>{title}</h3>

      <div className='flex flex-col gap-6 w-full'>
        {/* Image Section */}
        <div className='w-full h-[300px] lg:h-[400px] relative rounded-[20px] overflow-hidden shrink-0'>
          <Image src={img} alt={title} fill className='object-cover' />
        </div>

        {/* Description and Button */}
        <div className='flex flex-col gap-8'>
          <p className='ContentMRegular text-white text-[16px] leading-[1.4] max-w-[600px]'>{description}</p>

          <div className='w-fit'>
            <ButtonWhite label='CONTACT US' url='/contact' icon={true} hover={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCoverageCard;
