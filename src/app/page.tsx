import { SiteHeader } from '@/shared/components/common/SiteHeader';
import { SiteFooter } from '@/shared/components/common/SiteFooter';
import { HeroSection } from '@/features/flights/components/home/HeroSection';
import { FeatureHighlights } from '@/features/flights/components/home/FeatureHighlights';
import { PopularRoutes } from '@/features/flights/components/home/PopularRoutes';
import { Promotions } from '@/features/flights/components/home/Promotions';
import { AirlinePartners } from '@/features/flights/components/home/AirlinePartners';
import { SupportCta } from '@/features/flights/components/home/SupportCta';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <FeatureHighlights />
        <PopularRoutes />
        <Promotions />
        <AirlinePartners />
        <SupportCta />
      </main>

      <SiteFooter />
    </div>
  );
}
