import ButtonBlack from '@/components/ui/ButtonBlack';
import ButtonBorder from '@/components/ui/ButtonBorder';
import Icon from '@/components/ui/icons/Icon';

import FeatureCard from './FeatureCard';

interface HomeFeatureSectionProps {
  data?: any;
}

const HomeFeatureSection: React.FC<HomeFeatureSectionProps> = ({ data }) => {
  const lightTitle = data?.lightTitle;
  const boldTitle = data?.boldTitle;
  const buttonExplore = data?.buttonExplore;
  const buttonFind = data?.buttonFind;
  const features = data?.featureCards || [];

  if (!data) return null;

  return (
    <section className='bg-baseIron100 '>
      <div className='container mx-auto max-w-[1440px] pt-[120px] pb-[86px] px-[80px] flex flex-col items-center gap-[40px]'>
        <h2 className='DisplayXLRegular text-coreRed900 text-center max-w-[960px]'>
          {lightTitle} {boldTitle && <span className='font-bold'>{boldTitle}</span>}
        </h2>

        <div className='flex gap-5 items-center'>
          {buttonExplore?.text && <ButtonBlack label={buttonExplore.text} url={buttonExplore.url || '#'} icon={buttonExplore.icon === 'right'} />}
          {buttonFind?.text && <ButtonBorder label={buttonFind.text} url={buttonFind.url || '#'} icon={buttonFind.icon === 'right'} />}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full'>
          {features.map((feature: any, index: number) => (
            <FeatureCard key={index} icon={<Icon src={feature.icon} className='size-[24px]' />} title={feature.title} description={feature.des} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatureSection;
