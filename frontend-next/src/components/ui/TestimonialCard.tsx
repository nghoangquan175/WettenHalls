import Image from 'next/image';
import React from 'react';

interface TestimonialCardProps {
  img: string;
  description: string;
  name: string;
  position?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ img, description, name, position }) => {
  return (
    <div className='bg-baseIron100 w-[596px] h-full p-5 rounded-[24px] flex flex-col md:flex-row gap-4 items-stretch shrink-0'>
      {/* Profile Picture */}
      <div className='relative rounded-[16px] overflow-hidden size-[140px] shrink-0'>
        <Image src={img} alt={name} fill className='object-cover' />
      </div>

      {/* Testimonial Content */}
      <div className='bg-baseIron00 p-5 rounded-[16px] flex flex-col justify-between flex-1 gap-6 text-baseIron950'>
        {/* Quote */}
        <p className='ContentXLRegular text-[18px] lg:text-[20px] leading-[1.3] min-w-[280px]'>{description}</p>

        {/* User Info */}
        <div className='flex flex-col gap-1'>
          <h4 className='HeadingSBold text-[24px] uppercase leading-none'>{name}</h4>
          {position && <p className='ContentMRegular text-[16px] leading-[1.2]'>{position}</p>}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
