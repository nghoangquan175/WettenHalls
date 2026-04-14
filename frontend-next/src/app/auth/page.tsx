'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { useAuth } from '@/context/AuthContext';

import ForgotPasswordForm from './ForgotPasswordForm';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot-password'>('login');
  // const [step, setStep] = useState<'signup' | 'otp' | 'success'>('signup');

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'signup') {
      setMode('signup');
    } else if (tab === 'forgot-password') {
      setMode('forgot-password');
    } else {
      setMode('login');
    }
  }, [searchParams]);

  const handleSwitch = (newMode: 'login' | 'signup' | 'forgot-password') => {
    setMode(newMode);
    router.push(`/auth?tab=${newMode}`, { scroll: false });
  };

  if (isLoading) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center bg-baseIron1000 relative overflow-hidden px-4'>
        <div className='text-white text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4'></div>
          <p className='ContentMRegular opacity-60'>Checking session...</p>
        </div>
      </div>
    );
  }

  if (user) return null; // Prevent flicker before redirect

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-baseIron1000 relative overflow-hidden px-4'>
      {/* Background Decorative Elements */}
      <div className='absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-coreRed800/20 rounded-full blur-[120px] pointer-events-none' />
      <div className='absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-coreRed600/10 rounded-full blur-[100px] pointer-events-none' />

      {/* Auth Card */}
      <div className='w-full max-w-[480px] z-10'>
        <div className='bg-white/5 backdrop-blur-[20px] border border-white/10 rounded-[24px] p-8 md:p-12 shadow-2xl relative overflow-hidden'>
          {/* Mode Toggle Overlay - Hidden in Forgot Password Mode */}
          {mode !== 'forgot-password' && (
            <div className='flex justify-center mb-8'>
              <div className='bg-white/5 p-1 rounded-full border border-white/5 flex relative w-full'>
                <div
                  className='absolute h-[calc(100%-8px)] rounded-full bg-white transition-all duration-300 ease-out z-0'
                  style={{
                    width: 'calc(50% - 4px)',
                    left: mode === 'login' ? '4px' : 'calc(50%)',
                  }}
                />
                <button
                  onClick={() => handleSwitch('login')}
                  className={`flex-1 py-2 text-sm font-bold rounded-full relative z-10 transition-colors duration-300 ${mode === 'login' ? 'text-coreRed900' : 'text-white/60 hover:text-white'}`}
                >
                  LOGIN
                </button>
                <button
                  onClick={() => handleSwitch('signup')}
                  className={`flex-1 py-2 text-sm font-bold rounded-full relative z-10 transition-colors duration-300 ${mode === 'signup' ? 'text-coreRed900' : 'text-white/60 hover:text-white'}`}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          )}

          {/* Forms with simple fade */}
          <div className='relative min-h-[400px] flex items-center justify-center'>
            {mode === 'login' ? (
              <LoginForm onSwitchToSignup={() => handleSwitch('signup')} onSwitchToForgot={() => handleSwitch('forgot-password')} />
            ) : mode === 'signup' ? (
              <SignupForm onSwitchToLogin={() => handleSwitch('login')} />
            ) : (
              <ForgotPasswordForm onSwitchToLogin={() => handleSwitch('login')} />
            )}
          </div>
        </div>

        {/* Footer / Home Link */}
        <div className='mt-8 text-center'>
          <button onClick={() => router.push('/')} className='ContentSRegular text-white/40 hover:text-white transition-all underline underline-offset-4'>
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div className='min-h-screen bg-baseIron1000 flex items-center justify-center text-white'>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}
