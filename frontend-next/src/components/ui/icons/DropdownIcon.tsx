import React from 'react';

import Icon from './Icon';

interface DropdownIconProps {
  src: any;
  className?: string;
}

const DropdownIcon: React.FC<DropdownIconProps> = ({ src, className }) => {
  return (
    <div className={`flex items-start justify-center p-2 rounded-lg bg-baseIron200 ${className}`}>
      <div className='w-6 h-6'>
        <Icon src={src} className='w-full h-full text-coreRed950' />
      </div>
    </div>
  );
};

export default DropdownIcon;
