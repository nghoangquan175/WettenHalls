'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import FooterConfirmation from '@/components/ui/FooterConfirmation';
import FooterNews from '@/components/ui/FooterNews';

interface FooterProps {
  data?: any;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const linkColumns =
    data?.items?.map((column: any) => ({
      title: column.label,
      links: column.children || [],
    })) || [];

  return (
    <footer className='bg-coreRed800 h-[800px] relative overflow-hidden text-white'>
      <div className='container flex flex-col justify-between max-w-[1440px] h-full p-10 mx-auto'>
        {/* Top Section */}
        <div className='flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20'>
          {/* Newsletter Container */}
          {/* <div className=""> */}
          {!isConfirmed ? <FooterNews onSubmitNews={() => setIsConfirmed(true)} socialIcons={data?.socialIcons} /> : <FooterConfirmation />}
          {/* </div> */}

          {/* Links Grid */}
          <div className='flex-1 grid grid-cols-2 md:grid-cols-4 gap-10'>
            {linkColumns.map((col: any, idx: number) => (
              <div key={idx} className='flex flex-col gap-[10px] w-[200px]'>
                <h4 className='ContentMBold text-baseIron00'>{col.title}</h4>
                <ul className='flex flex-col gap-[10px]'>
                  {col.links.map((link: any, lIdx: number) => (
                    <li key={lIdx} className='leading-none'>
                      <Link href={link.url || '#'} target={link.targetBlank ? '_blank' : undefined} className='ContentMRegular text-baseIron00'>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className=''>
          <div className='relative w-full pointer-events-none'>
            <svg width='1360' height='241' viewBox='0 0 1360 241' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <g clipPath='url(#clip0_3059_6423)'>
                <path
                  d='M238.844 75.7598H322.445L315.977 116.032H277.477L273.888 138.228H307.958L301.888 177.216H267.686L263.654 202.247H302.154L295.996 240.526H212.395L238.844 75.7598Z'
                  fill='#FD8B1C'
                />
                <path
                  d='M564.211 75.7598H647.812L641.388 116.032H602.844L599.3 138.228H633.369L627.256 177.216H593.053L589.066 202.247H627.566L621.407 240.526H537.762L564.211 75.7598Z'
                  fill='#FD8B1C'
                />
                <path d='M338.303 240.526L358.018 116.032H333.43L339.898 75.7598H434.575L428.107 116.032H402.544L382.873 240.526H338.303Z' fill='#FD8B1C' />
                <path d='M450.571 240.526L470.287 116.032H445.742L452.166 75.7598H546.844L540.375 116.032H514.856L495.185 240.526H450.571Z' fill='#FD8B1C' />
                <path d='M747.538 75.7598L733.715 162.285L716.348 75.7598H673.949L647.5 240.526H690.696L702.614 165.697L721.31 240.526H763.532L789.981 75.7598H747.538Z' fill='#FD8B1C' />
                <path
                  d='M855.773 240.526L865.963 177.216H845.14L834.994 240.526H789.938L816.475 75.7598H861.4L851.387 138.228H872.21L882.267 75.7598H927.368L900.919 240.526H855.773Z'
                  fill='#FD8B1C'
                />
                <path d='M1059.17 240.526L1085.58 75.7598H1130.15L1110.17 202.203H1143.66L1137.46 240.526H1059.17Z' fill='#FD8B1C' />
                <path d='M1154.96 240.526L1181.32 75.7598H1225.89L1205.91 202.203H1239.36L1233.2 240.526H1154.96Z' fill='#FD8B1C' />
                <path
                  d='M1359.95 0H199.323L150.456 136.943L142.614 75.7596H99.8609L77.6203 137.253L70.1773 0H22.3734H15.1076L0 39.8292L24.7215 39.8735L36.4621 240.526H40.3165H41.6013H83.557L110.139 166.317L113.506 240.526H161.089L231.798 39.8735H1353.75L1359.95 0Z'
                  fill='#FD8B1C'
                />
                <path
                  d='M1277.72 92.2413C1250.83 124.45 1273.34 154.4 1280.6 164.102C1281.45 165.21 1282.38 166.406 1283.35 167.691C1288.4 174.248 1292.74 180.938 1294.07 186.387C1294.21 186.874 1294.29 187.406 1294.38 187.938C1294.47 188.469 1294.47 188.957 1294.47 189.488C1294.47 189.887 1294.47 190.241 1294.47 190.64C1294.47 191.127 1294.38 191.482 1294.25 191.969C1294.16 192.279 1294.12 192.59 1293.98 192.944C1292.65 197.108 1288.98 199.988 1284.33 201.273C1278.79 203.134 1270.77 202.691 1256.99 202.248L1250.83 240.526C1262.57 240.969 1272.94 240.925 1282.55 240.748C1300.76 239.419 1317.38 235.609 1330.89 214.963C1350.16 185.412 1327.65 156.216 1318.04 143.722C1317.2 142.615 1316.4 141.596 1315.65 140.621C1312.1 135.836 1309.89 132.248 1308.87 129.191C1308.56 128.349 1308.29 127.507 1308.12 126.665C1307.63 124.583 1307.63 122.457 1308.29 120.419C1309.62 116.387 1313.03 113.507 1317.47 112.178C1318.26 111.957 1319.02 111.779 1319.81 111.646C1319.81 111.646 1319.86 111.646 1319.9 111.646C1323 111.07 1325.97 111.026 1328.76 111.292C1331.69 111.469 1335.14 112.134 1339.04 113.551C1340.81 114.216 1341.97 114.703 1342.05 114.748L1342.19 114.836L1348.08 77.178C1332.93 71.5071 1299.74 65.9691 1277.81 92.2856'
                  fill='#FD8B1C'
                />
                <path
                  d='M981.508 177.216L999.141 116.032V177.216H981.508ZM1043.36 240.526L1034.58 75.7598H976.28L916.293 240.526H961.483L969.236 216.424H998.211L997.856 240.526H1043.27H1043.36Z'
                  fill='#FD8B1C'
                />
              </g>
              <defs>
                <clipPath id='clip0_3059_6423'>
                  <rect width='1359.95' height='240.88' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </div>
          {/* Legal Bottom Bar */}
          <div className="mt-[39px] pt-[21px] border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[14px] font-['Zetta_Sans:Regular',sans-serif] opacity-60">
            <p>©2026 Wettenhalls Pty Ltd.</p>
            <div className='flex flex-wrap justify-center gap-6 lg:gap-10 text-center'>
              <Link href='#' className='hover:text-white transition-colors'>
                Accreditations and Terms & Conditions
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                Privacy Policy
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                Sitemap
              </Link>
              <Link href='#' className='hover:text-white transition-colors'>
                Code of conduct
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
