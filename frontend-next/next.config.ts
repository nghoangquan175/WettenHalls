import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  async headers() {
    const domains = [
      'http://localhost:1337',
      'http://localhost:5000',
      'https://www.googletagmanager.com',
      'https://*.google.com',
      'https://*.google.com.vn',
      'https://*.google.com.au',
      'https://*.gstatic.com',
      'https://www.livehire.com',
      'https://staging-pittsherry.mw-aws.com',
      'https://pittsherry.mw-aws.com',
      'https://staging-api.pittsherry.mw-aws.com',
      'https://api.pittsherry.mw-aws.com',
      'https://pittsh.com.au',
      'https://www.pittsh.com.au',
      'https://pittsherry-prod.b-cdn.net',
      'https://pittsherry-staging.b-cdn.net',
      'https://analytics.google.com',
      'https://*.google.com.vn',
      'https://*.google.com.au',
      'https://*.doubleclick.net',
      'https://*.google-analytics.com',
    ].join(' ');
    const cspValue = `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' ${domains}; style-src 'self' 'unsafe-inline' ${domains}; font-src 'self' data: ${domains}; media-src * 'self' data: blob: ${domains}; img-src * 'self' data: blob: ${domains}; frame-src * 'self' ${domains}; connect-src * 'self' ${domains}`;

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspValue,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevents MIME type sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'no-referrer-when-downgrade', // Referrer policy configuration
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains', // HSTS
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Prevents click jacking
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self)', // Permissions policy configuration
          },
        ],
      },
    ];
  },
};

export default nextConfig;
