'use client';

import React, { useState } from 'react';

import HomeContactForm from './HomeContactForm';
import HomeMotionSection from './HomeMotionSection';

interface HomeMotionContactSectionProps {
  data?: any;
}

const HomeMotionContactSection: React.FC<HomeMotionContactSectionProps> = ({ data }) => {
  const [isContactMode, setIsContactMode] = useState(false);

  if (isContactMode) {
    return <HomeContactForm onBackClick={() => setIsContactMode(false)} />;
  }

  return <HomeMotionSection data={data} onContactClick={() => setIsContactMode(true)} />;
};

export default HomeMotionContactSection;
