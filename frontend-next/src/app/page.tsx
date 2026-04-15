import { unstable_noStore as noStore } from 'next/cache';
import * as React from 'react';

import HomePage from './HomePage';

// async function getHomepageData() {
//   const params = {
//     populate: {
//       blocks: {
//         on: {
//           'shared.hero-banner': {
//             populate: {
//               buttonFind: true,
//               heroBannerCards: { populate: { img: true } },
//               logo: true,
//               bg: true,
//             },
//           },
//           'shared.feature': {
//             populate: '*',
//           },
//           'shared.category': {
//             populate: {
//               buttonFind: true,
//               buttonTrack: true,
//               cateTitles: {
//                 populate: {
//                   cateCards: { populate: { img: true } },
//                 },
//               },
//             },
//           },
//           'shared.coverage': {
//             populate: {
//               coverageCard: { populate: { img: true } },
//             },
//           },
//           'shared.team': {
//             populate: {
//               profileCards: {
//                 populate: {
//                   img: true,
//                 },
//               },
//             },
//           },
//           'shared.banner': {
//             populate: {
//               img: true,
//               button: true,
//             },
//           },
//           'shared.testimonial': {
//             populate: {
//               testimonialCards: {
//                 populate: {
//                   img: true,
//                 },
//               },
//             },
//           },
//           'shared.motion': {
//             populate: {
//               img: true,
//               buttonContact: true,
//             },
//           },
//         },
//       },
//     },
//   };

//   try {
//     const res = await fetchStrapi('/homepage', params);
//     return res.data;
//   } catch (error) {
//     // eslint-disable-next-line no-console
//     console.log('Error fetching homepage data:', error);
//     return null;
//   }
// }

export default async function Page() {
  noStore();
  // const homepageData = await getHomepageData();
  // const blocks = homepageData?.blocks || [];
  const blocks: any[] = [];

  return <HomePage blocks={blocks} />;
}
