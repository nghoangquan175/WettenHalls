import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className='bg-white/50 backdrop-blur-[10px] p-5 rounded-[16px] flex flex-col items-start gap-5 self-stretch min-h-[220px] justify-between'>
      <div className='flex flex-col gap-5 items-start w-full'>
        <div className='bg-accentAmber500 p-2 rounded-[8px] text-accentAmber950 flex items-center justify-center'>{icon}</div>
        <h3 className='ContentXLBold text-baseIron950 uppercase leading-[1.2]'>{title}</h3>
      </div>
      <p className='ContentLRegular text-baseIron950 leading-[1.2]'>{description}</p>
    </div>
  );
};

export default FeatureCard;
