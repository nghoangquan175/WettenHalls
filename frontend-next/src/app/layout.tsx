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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000/api';

  if (!baseUrl || baseUrl === 'undefined' || baseUrl.startsWith('undefined')) {
    // eslint-disable-next-line no-console
    console.warn('NEXT_PUBLIC_BASE_URL is not defined. Skipping global data fetch.');
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

  try {
    const res = await fetch(`${baseUrl}/navigation/public`, {
      next: { revalidate: 10 },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch global data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    return error;
  } finally {
    clearTimeout(timeoutId);
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
