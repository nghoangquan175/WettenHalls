'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin }) => {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      setIsSent(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isSent) {
    return (
      <div className='flex flex-col gap-6 w-full max-w-sm animate-in fade-in duration-500 text-center'>
        <div className='flex flex-col gap-2'>
          <h2 className='HeadingLBold text-white'>Check Your Email</h2>
          <p className='ContentMRegular text-white/60'>We have sent a password reset link to your email address.</p>
        </div>
        <button onClick={onSwitchToLogin} className='w-full bg-white text-coreRed900 font-bold py-3 rounded-lg hover:bg-baseIron100 transition-all'>
          BACK TO LOGIN
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full max-w-sm animate-in fade-in duration-500'>
      <div className='flex flex-col gap-2 text-center'>
        <h2 className='HeadingLBold text-white'>Forgot Password?</h2>
        <p className='ContentMRegular text-white/60'>Enter your email and we'll send you a link to reset your password.</p>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label className='ContentSBold text-white/80 ml-1'>Email</label>
          <input
            {...register('email')}
            type='email'
            placeholder='your@email.com'
            className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
          />
          {errors.email && <span className='text-red-500 text-xs ml-1'>{errors.email.message}</span>}
        </div>
        {error && <p className='text-red-500 text-sm text-center font-bold px-2 py-1 bg-red-500/10 rounded border border-red-500/20'>{error}</p>}
      </div>

      <div className='flex flex-col gap-4 mt-2'>
        <button type='submit' disabled={isSubmitting} className='w-full bg-white text-coreRed900 font-bold py-3 rounded-lg hover:bg-baseIron100 transition-all disabled:opacity-50'>
          {isSubmitting ? 'SENDING...' : 'SEND RESET LINK'}
        </button>

        <div className='text-center'>
          <button type='button' onClick={onSwitchToLogin} className='text-white hover:underline transition-all ContentSRegular opacity-60'>
            Return to Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
