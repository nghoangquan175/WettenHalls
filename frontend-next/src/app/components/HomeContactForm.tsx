import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import ButtonWhite from '@/components/ui/ButtonWhite';
import CaptchaPopup from '@/components/ui/CaptchaPopup';
import IconArrowRight from '@/components/ui/icons/IconArrowRight';

import { submitContact } from '@/actions/submitContact';

const contactFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10,11}$/, 'Phone must be 10-11 digits'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface HomeContactFormProps {
  onBackClick?: () => void;
}

const HomeContactForm: React.FC<HomeContactFormProps> = ({ onBackClick }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleInitialSubmit = () => {
    setShowCaptcha(true);
  };

  const onCaptchaChange = async (token: string | null) => {
    if (!token) return;
    setShowCaptcha(false);
    await processSubscription(token);
  };

  const processSubscription = async (token: string) => {
    setIsSubmitting(true);
    const data = getValues();
    try {
      const result: any = await submitContact({
        ...data,
        captchaToken: token,
      });

      if (result.success) {
        reset(); // Clear all inputs
      } else {
        // const errorMsg = result.error?.message || result.error || 'Something went wrong. Please try again.';
      }
    } catch {
      // const errorMsg = result.error?.message || result.error || 'Something went wrong. Please try again.';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='bg-baseIron950 h-auto lg:h-[797px] py-[100px] lg:py-[150px]'>
      <div className='container mx-auto max-w-[1280px] px-5 flex flex-col lg:flex-row gap-20 items-stretch'>
        {/* Left Column: Contact Info */}
        <div className='lg:w-[440px] shrink-0 flex flex-col justify-between py-2'>
          <div className='flex flex-col gap-10'>
            {/* Back Button */}
            <div className='rotate-180 w-fit cursor-pointer' onClick={onBackClick}>
              <IconArrowRight />
            </div>

            {/* Branding Content */}
            <div className='flex flex-col gap-5'>
              <h2 className='HeadingLBold text-accentAmber500 text-[32px] lg:text-[40px] uppercase leading-none'>MESSAGE US</h2>
              <p className='ContentMRegular text-white/70 text-[16px] leading-[1.4] max-w-[400px]'>
                Wettenhalls is dedicated to supporting the communities where we live and work. We provide sponsorship and support for various local organisations.
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className='flex flex-col gap-8 mt-12 lg:mt-0'>
            <div className='flex flex-col gap-2'>
              <span className='text-white ContentXSBold text-[12px] uppercase opacity-60'>GENERAL CONTACT</span>
              <span className='text-accentAmber500 ContentMRegular text-[18px]'>HELLO@WETTENHELLS.COM.AU</span>
            </div>
            <div className='flex flex-col gap-2'>
              <span className='text-white ContentXSBold text-[12px] uppercase opacity-60'>PARTNERSHIP</span>
              <span className='text-accentAmber500 ContentMRegular text-[18px]'>HELLO@WETTENHELLS.COM.AU</span>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className='flex-1 flex flex-col gap-10'>
          <form className='flex flex-col gap-6' onSubmit={handleSubmit(handleInitialSubmit)}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* First Name */}
              <div className='flex flex-col gap-1'>
                <label className='text-white ContentSRegular text-[14px] uppercase truncate'>FIRST NAME*</label>
                <input
                  {...register('firstName')}
                  type='text'
                  placeholder='Input'
                  className={`bg-baseIron800 border ${errors.firstName ? 'border-red-500' : 'border-baseIron500'} rounded-[8px] h-[50px] px-5 text-white focus:outline-none focus:border-accentAmber500 transition-colors`}
                />
                {errors.firstName && <span className='text-red-500 text-xs'>{errors.firstName.message}</span>}
              </div>
              {/* Last Name */}
              <div className='flex flex-col gap-1'>
                <label className='text-white ContentSRegular text-[14px] uppercase truncate'>LAST NAME*</label>
                <input
                  {...register('lastName')}
                  type='text'
                  placeholder='Input'
                  className={`bg-baseIron800 border ${errors.lastName ? 'border-red-500' : 'border-baseIron500'} rounded-[8px] h-[50px] px-5 text-white focus:outline-none focus:border-accentAmber500 transition-colors`}
                />
                {errors.lastName && <span className='text-red-500 text-xs'>{errors.lastName.message}</span>}
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Email */}
              <div className='flex flex-col gap-1'>
                <label className='text-white ContentSRegular text-[14px] uppercase truncate'>EMAIL*</label>
                <input
                  {...register('email')}
                  type='email'
                  placeholder='Input'
                  className={`bg-baseIron800 border ${errors.email ? 'border-red-500' : 'border-baseIron500'} rounded-[8px] h-[50px] px-5 text-white focus:outline-none focus:border-accentAmber500 transition-colors`}
                />
                {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
              </div>
              {/* Phone */}
              <div className='flex flex-col gap-1'>
                <label className='text-white ContentSRegular text-[14px] uppercase truncate'>PHONE*</label>
                <input
                  {...register('phone')}
                  type='tel'
                  placeholder='Input (10-11 digits)'
                  className={`bg-baseIron800 border ${errors.phone ? 'border-red-500' : 'border-baseIron500'} rounded-[8px] h-[50px] px-5 text-white focus:outline-none focus:border-accentAmber500 transition-colors`}
                />
                {errors.phone && <span className='text-red-500 text-xs'>{errors.phone.message}</span>}
              </div>
            </div>

            {/* Subject */}
            <div className='flex flex-col gap-1'>
              <label className='text-white ContentSRegular text-[14px] uppercase truncate'>SELECT SUBJECT*</label>
              <div className='relative'>
                <select
                  {...register('subject')}
                  className={`bg-baseIron800 border ${errors.subject ? 'border-red-500' : 'border-baseIron500'} rounded-[8px] h-[50px] px-5 text-white/50 focus:outline-none focus:border-accentAmber500 transition-colors w-full appearance-none`}
                >
                  <option value=''>Select one</option>
                  <option value='General Inquiry'>General Inquiry</option>
                  <option value='Careers'>Careers</option>
                  <option value='Partnership'>Partnership</option>
                </select>
                <div className='absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50'>
                  <svg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1 1L6 6L11 1' stroke='white' strokeWidth='2' strokeLinecap='round' />
                  </svg>
                </div>
              </div>
              {errors.subject && <span className='text-red-500 text-xs'>{errors.subject.message}</span>}
            </div>

            {/* Message */}
            <div className='flex flex-col gap-1'>
              <label className='text-white ContentSRegular text-[14px] uppercase'>MESSAGE*</label>
              <textarea
                {...register('message')}
                placeholder='Input'
                className={`bg-baseIron800 border ${errors.message ? 'border-red-500' : 'border-baseIron500'} rounded-[8px] h-[150px] p-5 text-white resize-none focus:outline-none focus:border-accentAmber500 transition-colors`}
              />
              {errors.message && <span className='text-red-500 text-xs'>{errors.message.message}</span>}
            </div>

            {/* Submit Button & Captcha Container */}
            <div className='mt-4 flex items-center gap-5 relative overflow-visible'>
              <button type='submit' disabled={isSubmitting} className='group'>
                <ButtonWhite label={isSubmitting ? 'SENDING...' : 'SUBMIT'} icon={!isSubmitting} />
              </button>

              <CaptchaPopup ref={recaptchaRef} show={showCaptcha} onClose={() => setShowCaptcha(false)} onCaptchaChange={onCaptchaChange} className='left-0 bottom-0 right-0 top-0' />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeContactForm;
