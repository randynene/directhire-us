import './globals.css';
import { ModalProvider } from '@/components/SearchModal';
import { PageAnimations } from '@/components/PageAnimations';

export const metadata = {
  title: 'CloudEmployee — Direct hire',
  description:
    'Permanent hires, on your payroll. Every candidate interviewed by a senior engineer. Two profiles, not two hundred CVs.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

/* NavBar/Footer render per-page (see app/page.jsx and app/uk/page.jsx) rather
   than here, since each locale route has its own chrome copy. */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="page">
        <ModalProvider>
          <PageAnimations />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
