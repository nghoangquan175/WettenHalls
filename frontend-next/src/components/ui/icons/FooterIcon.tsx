import Link from 'next/link';
import React from 'react';

import { icons } from '@/assets/icons';

interface FooterIconProps {
  icon: string;
  url: string;
}

const FooterIcon: React.FC<FooterIconProps> = ({ icon, url }) => {
  return (
    <Link href={url} className='cursor-pointer' target='_blank' rel='noopener noreferrer'>
      <div
        className='size-[40px]'
        style={{
          backgroundImage: `url(${icons[icon].src})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
    </Link>
  );
};

export default FooterIcon;
