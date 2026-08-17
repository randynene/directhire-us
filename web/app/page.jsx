import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Explainer } from '@/components/sections/Explainer';
import { Process } from '@/components/sections/Process';
import { Differentiators } from '@/components/sections/Differentiators';
import { Pricing } from '@/components/sections/Pricing';
import { Faq } from '@/components/sections/Faq';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { DeRiskBand } from '@/components/ds/Navigation';
import { us } from '@/lib/content/us';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Explainer />
      <Process />
      <DeRiskBand items={us.deRisk} />
      <Differentiators />
      <Pricing />
      <Faq />
      <ClosingCta />
    </>
  );
}
