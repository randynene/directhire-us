import { NavBar, Footer, DeRiskBand } from '@/components/ds/Navigation';
import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Explainer } from '@/components/sections/Explainer';
import { Process } from '@/components/sections/Process';
import { Differentiators } from '@/components/sections/Differentiators';
import { Pricing } from '@/components/sections/Pricing';
import { Faq } from '@/components/sections/Faq';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { uk } from '@/lib/content/uk';

export const metadata = {
  title: 'CloudEmployee — Direct hire, United Kingdom',
  description:
    'Permanent hires, on your payroll. Every candidate interviewed by a senior engineer. Two profiles, not two hundred CVs.',
};

export default function UkPage() {
  return (
    <>
      <NavBar brand={uk.nav.brand} links={uk.nav.links} cta={uk.nav.cta} />
      <main>
        <Hero content={uk} />
        <Problem content={uk} />
        <Explainer content={uk} />
        <Process content={uk} />
        <DeRiskBand items={uk.deRisk} />
        <Differentiators content={uk} />
        <Pricing content={uk} />
        <Faq content={uk} />
        <ClosingCta content={uk} />
      </main>
      <Footer left={uk.footer.left} right={uk.footer.right} rightHref="/" />
    </>
  );
}
