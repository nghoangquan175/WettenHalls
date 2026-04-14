import React, { forwardRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface CaptchaPopupProps {
  show: boolean;
  onClose: () => void;
  onCaptchaChange: (token: string | null) => void;
  sitekey?: string;
  className?: string;
}

/**
 * Reusable Captcha Full-screen Overlay Component
 * Uses forwardRef to allow resetting the captcha from the parent component.
 */
const CaptchaPopup = forwardRef<ReCAPTCHA, CaptchaPopupProps>(({ show, onClose, onCaptchaChange, sitekey, className }, ref) => {
  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-300 ${className || ''}`} onClick={onClose}>
      {/* Prevent click events inside the container from closing the overlay */}
      <div className='p-4' onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col items-center gap-4'>
          <div className='bg-white p-2 rounded-lg shadow-2xl'>
            <ReCAPTCHA ref={ref} sitekey={sitekey || process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''} onChange={onCaptchaChange} theme='light' />
          </div>
          <button onClick={onClose} className='ContentSRegular text-white hover:text-coreRed50 transition-colors uppercase underline'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
});

CaptchaPopup.displayName = 'CaptchaPopup';

export default CaptchaPopup;
