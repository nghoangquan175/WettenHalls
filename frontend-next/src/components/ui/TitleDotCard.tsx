import React from 'react';

import TitleDot from './TitleDot';

interface TitleDotCardProps {
  dotTitle: string;
  mainTitle: React.ReactNode;
  description: string;
  className?: string;
}

const TitleDotCard: React.FC<TitleDotCardProps> = ({ dotTitle, mainTitle, description, className }) => {
  return (
    <div className={`bg-baseIron100 p-8 rounded-[40px] flex flex-col gap-5 items-start w-full ${className || ''}`}>
      <TitleDot title={dotTitle} />

      <h2 className='DisplayMPoster text-coreRed900'>{mainTitle}</h2>

      <p className='ContentXLRegular text-baseIron950'>{description}</p>
    </div>
  );
};

export default TitleDotCard;
