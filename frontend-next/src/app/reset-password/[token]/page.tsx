'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordValues) => {
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push('/auth?tab=login');
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-baseIron1000 relative overflow-hidden px-4'>
      <div className='absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-coreRed800/20 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-coreRed600/10 rounded-full blur-[100px] pointer-events-none' />

      <div className='w-full max-w-[480px] z-10'>
        <div className='bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[24px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-center'>
          {isSuccess ? (
            <div className='flex flex-col gap-6 animate-in zoom-in-95 duration-500'>
              <div className='flex flex-col gap-2'>
                <h2 className='HeadingLBold text-white'>Password Reset Successful!</h2>
                <p className='ContentMRegular text-white/60'>Your password has been updated. Redirecting to login page...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full animate-in fade-in duration-500'>
              <div className='flex flex-col gap-2'>
                <h2 className='HeadingLBold text-white'>Reset Password</h2>
                <p className='ContentMRegular text-white/60'>Enter your new password below.</p>
              </div>

              <div className='flex flex-col gap-4 text-left'>
                <div className='flex flex-col gap-1'>
                  <label className='ContentSBold text-white/80 ml-1'>New Password</label>
                  <input
                    {...register('password')}
                    type='password'
                    placeholder='••••••••'
                    className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
                  />
                  {errors.password && <span className='text-red-500 text-xs ml-1'>{errors.password.message}</span>}
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='ContentSBold text-white/80 ml-1'>Confirm New Password</label>
                  <input
                    {...register('confirmPassword')}
                    type='password'
                    placeholder='••••••••'
                    className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
                  />
                  {errors.confirmPassword && <span className='text-red-500 text-xs ml-1'>{errors.confirmPassword.message}</span>}
                </div>
                {error && <p className='text-red-500 text-sm text-center font-bold px-2 py-1 bg-red-500/10 rounded border border-red-500/20'>{error}</p>}
              </div>

              <button type='submit' disabled={isSubmitting} className='w-full bg-white text-coreRed900 font-bold py-3 rounded-lg hover:bg-baseIron100 transition-all disabled:opacity-50'>
                {isSubmitting ? 'RESETTING...' : 'RESET PASSWORD'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
