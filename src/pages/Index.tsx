
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatsSection from '@/components/home/StatsSection';
import CtaSection from '@/components/home/CtaSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <HowItWorksSection />
      <FeaturedSection />
      <TestimonialsSection />
      <StatsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
