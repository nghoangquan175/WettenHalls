import Image from 'next/image';
import React from 'react';

import ButtonBlack from '@/components/ui/ButtonBlack';
import ButtonBorder from '@/components/ui/ButtonBorder';

interface HomeCategoryCardProps {
  img: string;
  title: string;
  description: string;
  primaryBtn?: {
    label: string;
    url: string;
    icon?: boolean;
  };
  secondaryBtn?: {
    label: string;
    url: string;
    icon?: boolean;
  };
}

const HomeCategoryCard: React.FC<HomeCategoryCardProps> = ({ img, title, description, primaryBtn, secondaryBtn }) => {
  return (
    <div className='h-[521px] w-[1121px] bg-white p-5 rounded-[40px] flex flex-col lg:flex-row gap-10 items-stretch min-h-[480px]'>
      {/* Content Section */}
      <div className='flex-1 flex flex-col justify-between p-5'>
        <div className='flex flex-col gap-5'>
          <h3 className='HeadingLBold text-baseIron950'>{title}</h3>
          <p className='ContentXLRegular text-baseIron700'>{description}</p>
        </div>

        <div className='flex gap-4 mt-8 flex-wrap'>
          {primaryBtn && <ButtonBlack label={primaryBtn.label} url={primaryBtn.url} icon={primaryBtn.icon ?? true} />}
          {secondaryBtn && <ButtonBorder label={secondaryBtn.label} url={secondaryBtn.url} icon={secondaryBtn.icon ?? false} />}
        </div>
      </div>

      {/* Image Section */}
      <div className='w-full lg:w-[480px] h-[300px] lg:h-auto min-h-[300px] relative rounded-[40px] overflow-hidden shrink-0'>
        <Image src={img} alt={title} fill className='object-cover' />
      </div>
    </div>
  );
};

export default HomeCategoryCard;
