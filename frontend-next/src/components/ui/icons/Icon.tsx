'use client';
import React from 'react';

import { icons } from '@/assets/icons';

interface IconProps {
  src: any;
  className?: string;
  bgColor?: string;
}

const Icon: React.FC<IconProps> = ({ src, className, bgColor }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const iconData = typeof src === 'string' ? icons[src] : src;
  const finalSrc = iconData?.src || iconData || '';

  return (
    <div
      className={className}
      style={{
        maskImage: mounted && finalSrc ? `url(${finalSrc})` : 'none',
        maskSize: 'contain',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        backgroundColor: bgColor || 'currentColor',
      }}
    />
  );
};

export default Icon;
