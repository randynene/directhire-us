import './globals.css';
import { ModalProvider } from '@/components/SearchModal';
import { NavBar, Footer } from '@/components/ds/Navigation';
import { PageAnimations } from '@/components/PageAnimations';
import { us } from '@/lib/content/us';

export const metadata = {
  title: 'CloudEmployee — Direct hire, United States',
  description:
    'Permanent hires, on your payroll. Every candidate interviewed by a senior engineer. Two profiles, not two hundred CVs.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="page">
        <ModalProvider>
          <NavBar brand={us.nav.brand} links={us.nav.links} cta={us.nav.cta} />
          <PageAnimations />
          <main>{children}</main>
          <Footer left={us.footer.left} right={us.footer.right} />
        </ModalProvider>
      </body>
    </html>
  );
}
