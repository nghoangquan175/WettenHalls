import React from 'react';

import IconSuccess from './icons/IconSuccess';

const FooterConfirmation: React.FC = () => {
  return (
    <div className='bg-coreRed950 rounded-[20px] p-5 w-[360px] h-[300px] flex flex-col items-center justify-center text-center gap-6'>
      <IconSuccess />
      <div className='flex flex-col gap-3'>
        <h3 className='ContentXLBold'>THANK YOU FOR SUBSCRIBING</h3>
        <p className='ContentMRegular'>
          Your subscription has been confirmed. <br /> Stay tuned for our latest updates.
        </p>
      </div>
    </div>
  );
};

export default FooterConfirmation;
