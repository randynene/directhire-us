'use client';

import { usePageAnimations } from '@/lib/animations/usePageAnimations';

/* Mounted once at the page root. Owns every GSAP/ScrollTrigger timeline for
   the page — see lib/animations/usePageAnimations.js for the full spec. */
export function PageAnimations() {
  usePageAnimations();
  return null;
}
