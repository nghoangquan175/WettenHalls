import HomeBanner from './components/HomeBanner';
import HomeBrands from './components/HomeBrands';
import HomeCategorySection from './components/HomeCategorySection';
import HomeCoverageSection from './components/HomeCoverageSection';
import HomeFeatureSection from './components/HomeFeatureSection';
import HomeHeroBanner from './components/HomeHeroBanner';
import HomeMotionContactSection from './components/HomeMotionContactSection';
import HomeTestimonialSection from './components/HomeTestimonialSection';
import TeamSection from './components/TeamSection';

const blockComponents: { [key: string]: React.FC<any> } = {
  'shared.hero-banner': HomeHeroBanner,
  'shared.feature': HomeFeatureSection,
  'shared.category': HomeCategorySection,
  'shared.coverage': HomeCoverageSection,
  'shared.team': TeamSection,
  'shared.banner': HomeBanner,
  'shared.testimonial': HomeTestimonialSection,
  'shared.motion': HomeMotionContactSection,
};

export default function HomePage({ blocks = [] }: { blocks: any[] }) {
  return (
    <main>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.__component];
        if (!Component) return null;

        return <Component key={`${block.__component}-${index}`} data={block} />;
      })}

      {/* Brands section is static as it's not currently in Strapi Dynamic Zone */}
      <HomeBrands />
    </main>
  );
}
