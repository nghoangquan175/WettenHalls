'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onSwitchToForgot }) => {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        login(result.user);
        router.push('/');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Login failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full max-w-sm animate-in fade-in duration-500'>
      <div className='flex flex-col gap-2'>
        <h2 className='HeadingLBold text-white text-center'>Welcome Back</h2>
        <p className='ContentMRegular text-white/60 text-center'>Login to your account to continue</p>
      </div>

      <div className='flex flex-col gap-4'>
        {error && <div className='bg-red-500/10 border border-red-500/20 text-red-500 text-xs py-2 px-3 rounded-lg text-center font-bold'>{error}</div>}
        <div className='flex flex-col gap-1'>
          <label className='ContentSBold text-white/80 ml-1'>Email</label>
          <input
            {...register('email')}
            type='email'
            placeholder='email@domain.com'
            className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
          />
          {errors.email && <span className='text-red-500 text-xs ml-1'>{errors.email.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label className='ContentSBold text-white/80 ml-1'>Password</label>
          <input
            {...register('password')}
            type='password'
            placeholder='••••••••'
            className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
          />
          {errors.password && <span className='text-red-500 text-xs ml-1'>{errors.password.message}</span>}
          <div className='flex justify-end'>
            <button type='button' onClick={onSwitchToForgot} className='text-xs text-white/40 hover:text-white/60 transition-colors mt-1'>
              Forgot password?
            </button>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-2'>
        <button type='submit' disabled={isSubmitting} className='w-full bg-white text-coreRed900 font-bold py-3 rounded-lg hover:bg-baseIron100 transition-all disabled:opacity-50'>
          {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
        </button>

        <div className='text-center'>
          <p className='ContentSRegular text-white/60'>
            Don't have an account?{' '}
            <button type='button' onClick={onSwitchToSignup} className='text-white hover:underline transition-all'>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
