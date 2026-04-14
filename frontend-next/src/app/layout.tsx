import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '../styles/global.scss';

import GeneralLayout from '@/components/layout/GeneralLayout';

import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WettenHalls',
  description: 'Welcome to WettenHalls',
};

async function getGlobalData() {
  try {
    const res = await fetch('http://localhost:5000/api/navigation/public', {
      next: { revalidate: 10 },
    });
    return await res.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error fetching global data:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <GeneralLayout headerData={globalData?.header} footerData={globalData?.footer}>
            {children}
          </GeneralLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
