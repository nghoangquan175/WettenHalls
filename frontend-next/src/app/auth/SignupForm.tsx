'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const [step, setStep] = useState<'signup' | 'otp' | 'success'>('signup');
  const [tempEmail, setTempEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onInitialSubmit = async (data: SignupFormValues) => {
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setTempEmail(data.email);
        setStep('otp');
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);

    const otpString = otp.join('');
    if (otpString.length < 6) {
      setError('Please enter the full 6-digit code');
      setIsVerifying(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: tempEmail,
          otp: otpString,
        }),
      });

      if (res.ok) {
        setStep('success');
        setTimeout(() => {
          onSwitchToLogin();
        }, 3000);
      } else {
        const errorData = await res.json();
        setError(errorData.message || 'Verification failed');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  if (step === 'success') {
    return (
      <div className='flex flex-col gap-6 w-full max-w-sm animate-in zoom-in-95 duration-500 text-center'>
        <div className='flex flex-col gap-2'>
          <h2 className='HeadingLBold text-white'>Registration Successful!</h2>
          <p className='ContentMRegular text-white/60'>Your account has been created. Redirecting to login...</p>
        </div>
        <button onClick={onSwitchToLogin} className='w-full bg-white text-coreRed900 font-bold py-3 rounded-lg hover:bg-baseIron100 transition-all'>
          GO TO LOGIN
        </button>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className='flex flex-col gap-6 w-full max-w-sm animate-in fade-in duration-500'>
        <div className='flex flex-col gap-2 text-center'>
          <h2 className='HeadingLBold text-white'>Verify Your Email</h2>
          <p className='ContentMRegular text-white/60'>
            We've sent a 6-digit code to <span className='text-white font-bold'>{tempEmail}</span>
          </p>
        </div>

        <form onSubmit={handleVerifyOtp} className='flex flex-col gap-6'>
          <div className='flex justify-between gap-2'>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  otpInputs.current[index] = el;
                }}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='w-12 h-14 bg-white/5 border border-white/10 rounded-lg text-center text-xl text-white font-bold focus:outline-none focus:border-white/30 transition-all'
              />
            ))}
          </div>

          {error && <p className='text-red-500 text-sm text-center font-bold'>{error}</p>}

          <div className='flex flex-col gap-4'>
            <button type='submit' disabled={isVerifying} className='w-full bg-white text-coreRed900 font-bold py-3 rounded-lg hover:bg-baseIron100 transition-all disabled:opacity-50'>
              {isVerifying ? 'VERIFYING...' : 'VERIFY OPT'}
            </button>

            <button type='button' onClick={() => setStep('signup')} className='text-white/40 hover:text-white transition-all text-xs text-center'>
              Change Email Address
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onInitialSubmit)} className='flex flex-col gap-5 w-full max-w-sm animate-in fade-in duration-500'>
      <div className='flex flex-col gap-2'>
        <h2 className='HeadingLBold text-white text-center'>Create Account</h2>
        <p className='ContentMRegular text-white/60 text-center'>Join WettenHalls family today</p>
      </div>

      <div className='flex flex-col gap-3'>
        {error && <p className='text-red-500 text-sm text-center font-bold'>{error}</p>}
        <div className='flex flex-col gap-1'>
          <label className='ContentSBold text-white/80 ml-1'>Full Name</label>
          <input
            {...register('name')}
            type='text'
            placeholder='John Doe'
            className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
          />
          {errors.name && <span className='text-red-500 text-xs ml-1'>{errors.name.message}</span>}
        </div>

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

        <div className='flex flex-col gap-1'>
          <label className='ContentSBold text-white/80 ml-1'>Password</label>
          <input
            {...register('password')}
            type='password'
            placeholder='••••••••'
            className={`w-full bg-white/5 border ${errors.password ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
          />
          {errors.password && <span className='text-red-500 text-xs ml-1'>{errors.password.message}</span>}
        </div>

        <div className='flex flex-col gap-1'>
          <label className='ContentSBold text-white/80 ml-1'>Confirm Password</label>
          <input
            {...register('confirmPassword')}
            type='password'
            placeholder='••••••••'
            className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-500' : 'border-white/10'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-all`}
          />
          {errors.confirmPassword && <span className='text-red-500 text-xs ml-1'>{errors.confirmPassword.message}</span>}
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-2'>
        <button type='submit' disabled={isSubmitting} className='w-full bg-white text-coreRed900 font-bold py-3 rounded-lg hover:bg-baseIron100 transition-all disabled:opacity-50'>
          {isSubmitting ? 'SENDING CODE...' : 'CONTINUE'}
        </button>

        <div className='text-center'>
          <p className='ContentSRegular text-white/60'>
            Already have an account?{' '}
            <button type='button' onClick={onSwitchToLogin} className='text-white hover:underline transition-all'>
              Login
            </button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
