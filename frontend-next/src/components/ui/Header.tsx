'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import { useAuth } from '@/context/AuthContext';

import ButtonWhite from './ButtonWhite';
import HeaderDropdown from './HeaderDropdown';

interface HeaderProps {
  data?: {
    items?: any[];
    button?: {
      text?: string;
      url?: string;
    };
  };
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navItems = data?.items || [];

  const toggleDropdown = (name: string, _e: React.MouseEvent) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  return (
    <div className='w-full'>
      <div className='relative max-w-[1440px] mx-auto'>
        <div className='absolute top-[80px] left-[654px] z-[100] flex justify-center px-3 py-2'>
          <div className='flex h-14 w-full items-center justify-between gap-6 rounded-lg bg-baseIron1000/50 px-3 py-2 backdrop-blur-[15px]'>
            {/* Navigation Menu */}
            <nav className='flex items-center gap-4'>
              {navItems.map((item, index) => {
                const hasDropdown = item.children && item.children.length > 0;
                // Fallback for Insights page if not set in CMS
                const url = item.url === '/#' ? null : item.url || (item.label?.toLowerCase() === 'insights' ? '/Insights' : null);

                const content = (
                  <div className='relative flex items-center gap-1 ContentMRegular text-white cursor-pointer' onClick={(e) => hasDropdown && toggleDropdown(item.label, e)}>
                    <span>{item.label}</span>

                    {/* Dropdown Menu */}
                    {hasDropdown && openDropdown === item.label && <HeaderDropdown items={item.children} />}
                  </div>
                );

                if (url) {
                  return (
                    <Link key={`${item.label}-${index}`} href={url}>
                      {content}
                    </Link>
                  );
                }

                return <React.Fragment key={`${item.label}-${index}`}>{content}</React.Fragment>;
              })}
            </nav>
            <div className='flex items-center gap-4 ml-4'>
              {user ? (
                <div className='flex items-center gap-4'>
                  <div className='flex flex-col items-end'>
                    <span className='ContentSBold text-white'>Welcome, {user.name}</span>
                    <button onClick={logout} className='text-[10px] text-white/40 hover:text-white transition-all uppercase tracking-widest font-bold'>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex items-center gap-3'>
                  <ButtonWhite label='LOGIN' url='/auth?tab=login' />
                  <ButtonWhite label='SIGN UP' url='/auth?tab=signup' />
                </div>
              )}
              {/* CTA Button */}
              {data?.button && <ButtonWhite label={data.button.text || 'CONTACT US'} url={data.button.url || '#contact'} />}
            </div>
          </div>
        </div>
      </div>
      {/* Overlay to close dropdown */}
      {openDropdown && <div className='fixed inset-0 z-[90]' onClick={() => setOpenDropdown(null)} />}
    </div>
  );
};

export default Header;
