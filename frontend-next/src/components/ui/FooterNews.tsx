import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { subscribeNewsletter } from '@/actions/subscribeNewsletter';

import CaptchaPopup from './CaptchaPopup';
import FooterIcon from './icons/FooterIcon';
import IconArrowRight from './icons/IconArrowRight';

const schema = z.object({
  email: z.string().min(1, { message: 'Email address is required' }).email({ message: 'Please enter a valid email address' }),
});

type FormData = z.infer<typeof schema>;

interface FooterNewsProps {
  onSubmitNews?: () => void;
  socialIcons?: { icon: string; url: string }[];
}

const FooterNews: React.FC<FooterNewsProps> = ({ onSubmitNews, socialIcons }) => {
  const [loading, setLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const emailValue = watch('email');
  const iconsToRender = socialIcons || [];

  const handleInitialSubmit = (_data: FormData) => {
    setShowCaptcha(true);
  };

  const onCaptchaChange = async (token: string | null) => {
    if (!token) return;

    setShowCaptcha(false);
    const currentEmail = getValues('email');

    setLoading(true);
    try {
      const result = await subscribeNewsletter(currentEmail, token);

      if (result.error) {
        // eslint-disable-next-line no-console
        console.error('Subscription failed:', result.error);
        // Optionally show error to user
        alert(result.error);
      } else {
        // Success
        reset(); // Clear the form
        onSubmitNews?.();
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error during subscription:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  return (
    <div className='bg-coreRed950 rounded-[20px] p-5 w-[360px] h-[300px] flex flex-col gap-[35px] relative overflow-visible'>
      {/* New Reusable Captcha Popup */}
      <CaptchaPopup ref={recaptchaRef} show={showCaptcha} onClose={() => setShowCaptcha(false)} onCaptchaChange={onCaptchaChange} />

      {/* Social Links Row */}
      <div className='flex gap-4 items-start'>
        {iconsToRender.map((item, index) => (
          <FooterIcon key={index} icon={item.icon} url={item.url} />
        ))}
      </div>

      {/* Newsletter Content */}
      <div className='flex flex-col gap-[15px]'>
        <h3 className='ContentXLBold text-[20px] lg:text-[24px] text-coreIron00 leading-[1.2] uppercase'>
          GET THE LATEST UPDATES <br /> AND INSIGHTS
        </h3>

        {/* Newsletter Signup Form */}
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(handleInitialSubmit)}>
          <div className={`bg-coreRed900 border ${errors.email ? 'border-accentAmber500' : 'border-transparent'} rounded-full flex items-center justify-between pl-4 pr-1 py-1 transition-colors`}>
            <div className='flex-1 flex items-center gap-1 relative'>
              <input
                {...register('email')}
                type='text'
                placeholder=' '
                className='peer ContentSRegular bg-transparent text-coreRed50 outline-none focus:outline-none focus:ring-0 flex-1 p-0 border-0 z-10'
                disabled={loading}
              />
              {!emailValue && (
                <div className='ContentSRegular absolute left-0 flex items-center pointer-events-none'>
                  <span className='text-coreRed50'>Email Address</span>
                  <span className='text-accentAmber500'>*</span>
                </div>
              )}
            </div>
            <button type='submit' disabled={loading} className={loading ? 'opacity-50 cursor-not-allowed' : ''}>
              <IconArrowRight />
            </button>
          </div>
          {errors.email && <p className='text-accentAmber500 text-[12px] px-4 font-medium'>{errors.email.message}</p>}
        </form>
        <p className='ContentMRegular text-baseIron00'>Your email address will be kept confidential and only used to send our newsletter or respond to any queries.</p>
      </div>
    </div>
  );
};

export default FooterNews;
