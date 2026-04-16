'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

export default function GeneralLayout({ children, headerData, footerData }: { children: React.ReactNode; headerData?: any; footerData?: any }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth') || pathname?.startsWith('/reset-password');

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header data={headerData} />
      {children}
      <Footer data={footerData} />
    </>
  );
}
