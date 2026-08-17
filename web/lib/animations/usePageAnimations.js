'use client';

import { useEffect } from 'react';

/* Page-load timeline + every ScrollTrigger reveal from the design handoff's
   GSAP spec (design_handoff_directhire_us/README.md → "GSAP animation spec").
   The original prototype had to poll for the design system's async-mounted
   DOM before building timelines; React mounts synchronously, so — per the
   README's own "Critical implementation note" — that workaround is dropped
   here and everything just runs in a useEffect after the page mounts. */
export function usePageAnimations() {
  useEffect(() => {
    let ctx;
    let cancelled = false;

    async function run() {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      if (cancelled) return;

      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.default;
      gsap.registerPlugin(ScrollTrigger);

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      ctx = gsap.context(() => {
        gsap.defaults({ ease: 'power3.out' });
        const q = (s) => Array.from(document.querySelectorAll(s));
        const one = (s) => document.querySelector(s);
        const from = (targets, vars) => {
          const t = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
          return t.length ? gsap.from(t, vars) : null;
        };

        /* ---------- page load timeline ---------- */
        const tl = gsap.timeline({ delay: 0.1 });
        const nav = one('.navbar');
        if (nav) tl.from(nav, { y: -24, opacity: 0, duration: 0.7 }, 0);

        const heroCopy = one('[data-hero-copy]');
        if (heroCopy && heroCopy.children.length) {
          tl.from(Array.from(heroCopy.children), { y: 28, opacity: 0, duration: 0.85, stagger: 0.075 }, 0.15);
        }

        const panel = one('[data-shortlist]');
        if (panel) {
          tl.from(panel, { y: 44, opacity: 0, scale: 0.985, duration: 1, transformOrigin: '50% 0%' }, 0.35);
          const cards = Array.from(panel.querySelectorAll('.candidate-card'));
          if (cards.length) tl.from(cards, { y: 14, opacity: 0, duration: 0.6, stagger: 0.09 }, 0.7);
        }

        /* ---------- scroll progress bar ---------- */
        const bar = one('[data-progress]');
        if (bar) {
          gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
        }

        /* ---------- generic reveals ---------- */
        q('[data-reveal]').forEach((el) => {
          const targets = el.getAttribute('data-reveal') === 'stagger' ? Array.from(el.children) : [el];
          from(targets, {
            y: 34, opacity: 0, duration: 0.85, stagger: 0.08,
            scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
          });
        });

        /* ---------- section headers ---------- */
        q('[data-sec-head]').forEach((head) => {
          from(Array.from(head.children), {
            y: 26, opacity: 0, duration: 0.75, stagger: 0.1,
            scrollTrigger: { trigger: head, start: 'top 88%', toggleActions: 'play none none none' },
          });
        });

        /* ---------- applicant grid -> two profiles ---------- */
        const gridWrap = one('[data-anim="grid"]');
        if (gridWrap) {
          const cells = Array.from(gridWrap.querySelectorAll('.job-post-grid__cell'));
          if (cells.length) {
            gsap.from(cells, {
              opacity: 0, scale: 0.55, duration: 0.5, ease: 'power2.out',
              stagger: { each: 0.004, from: 'random' },
              scrollTrigger: { trigger: gridWrap, start: 'top 82%', toggleActions: 'play none none none' },
            });
            gsap.to(cells, {
              opacity: 0.45, duration: 0.6, ease: 'none',
              scrollTrigger: { trigger: gridWrap, start: 'top 45%', end: 'bottom 60%', scrub: true },
            });
          }
          const floaters = one('[data-anim="floaters"]');
          if (floaters) from(Array.from(floaters.children), {
            y: 34, opacity: 0, scale: 0.94, duration: 0.9, stagger: 0.13,
            scrollTrigger: { trigger: floaters, start: 'top 92%', toggleActions: 'play none none none' },
          });
          gsap.to(gridWrap, {
            yPercent: -6, ease: 'none',
            scrollTrigger: { trigger: gridWrap, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          });
        }

        /* ---------- video slot: clip reveal + parallax ---------- */
        const video = one('[data-anim="video"]');
        if (video) {
          gsap.fromTo(video,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.out',
              scrollTrigger: { trigger: video, start: 'top 82%', toggleActions: 'play none none none' } });
          gsap.from(video.firstElementChild, {
            scale: 1.08, duration: 1.4, ease: 'power3.out',
            scrollTrigger: { trigger: video, start: 'top 82%', toggleActions: 'play none none none' },
          });
        }

        /* ---------- stage cards ---------- */
        const stages = one('[data-anim="stages"]');
        if (stages) from(Array.from(stages.children), {
          y: 46, opacity: 0, duration: 0.9, stagger: 0.12,
          scrollTrigger: { trigger: stages, start: 'top 84%', toggleActions: 'play none none none' },
        });

        /* ---------- code panel lines ---------- */
        const code = one('[data-anim="codepanel"]');
        if (code) {
          gsap.from(code, { y: 34, opacity: 0, duration: 0.85, scrollTrigger: { trigger: code, start: 'top 85%', toggleActions: 'play none none none' } });
          const lines = Array.from(code.querySelectorAll('[data-code-line]'));
          if (lines.length) gsap.from(lines, {
            x: -12, opacity: 0, duration: 0.4, stagger: 0.055, ease: 'power2.out',
            scrollTrigger: { trigger: code, start: 'top 78%', toggleActions: 'play none none none' },
          });
        }

        /* ---------- report card: bars grow, verdicts count ---------- */
        const report = one('[data-anim="report"]');
        if (report) {
          gsap.from(report, { y: 40, opacity: 0, duration: 0.9, scrollTrigger: { trigger: report, start: 'top 85%', toggleActions: 'play none none none' } });
          const fills = Array.from(report.querySelectorAll('.progress > div'));
          if (fills.length) gsap.from(fills, {
            scaleX: 0, transformOrigin: '0% 50%', duration: 1.1, ease: 'power3.out', stagger: 0.14,
            scrollTrigger: { trigger: report, start: 'top 78%', toggleActions: 'play none none none' },
          });
          ScrollTrigger.create({
            trigger: report, start: 'top 78%', toggleActions: 'play none none none',
            onEnter: () => report.querySelectorAll('.score-row__verdict').forEach((s) => {
              if (/^\d+%$/.test(s.textContent.trim())) countUp(gsap, s);
            }),
          });
        }

        /* ---------- funnel: staggered reveal, no pin ---------- */
        const funnel = one('[data-anim="funnel"]');
        if (funnel) {
          const rows = Array.from(funnel.querySelectorAll('.funnel-row'));
          const funnelFills = Array.from(funnel.querySelectorAll('.progress > div'));
          if (rows.length) {
            const ftl = gsap.timeline({
              scrollTrigger: { trigger: funnel, start: 'top 78%', toggleActions: 'play none none none' },
            });
            ftl.from(funnel, { y: 34, opacity: 0, duration: 0.7 }, 0);
            rows.forEach((row, i) => {
              const at = 0.18 + i * 0.11;
              ftl.from(row, { y: 14, opacity: 0, duration: 0.55 }, at);
              if (funnelFills[i]) ftl.from(funnelFills[i], { scaleX: 0, transformOrigin: '0% 50%', duration: 0.85, ease: 'power2.out' }, at);
              const val = row.querySelector('.funnel-row__value');
              if (val) ftl.add(() => countUp(gsap, val), at);
            });
          }
        }

        /* ---------- de-risk band ---------- */
        const derisk = one('[data-anim="derisk"]');
        if (derisk) {
          const deriskItems = Array.from(derisk.querySelectorAll('.derisk-band__item'));
          if (deriskItems.length) gsap.from(deriskItems, {
            y: 16, opacity: 0, duration: 0.6, stagger: 0.09,
            scrollTrigger: { trigger: derisk, start: 'top 92%', toggleActions: 'play none none none' },
          });
        }

        /* ---------- feature cards ---------- */
        const feats = one('[data-anim="features"]');
        if (feats) from(Array.from(feats.children), {
          y: 40, opacity: 0, duration: 0.85, stagger: 0.1,
          scrollTrigger: { trigger: feats, start: 'top 84%', toggleActions: 'play none none none' },
        });

        /* ---------- pricing ---------- */
        const pricing = one('[data-anim="pricing"]');
        if (pricing) {
          gsap.from(pricing, { y: 44, opacity: 0, duration: 0.95, scrollTrigger: { trigger: pricing, start: 'top 84%', toggleActions: 'play none none none' } });
          const big = pricing.querySelector('.pricing-card__headline');
          if (big) gsap.from(big, { scale: 0.9, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', transformOrigin: '0% 50%', scrollTrigger: { trigger: pricing, start: 'top 80%', toggleActions: 'play none none none' } });
        }

        /* ---------- faq ---------- */
        const faq = one('[data-anim="faq"]');
        if (faq) from(Array.from(faq.querySelectorAll('.accordion-item__trigger')), {
          y: 22, opacity: 0, duration: 0.6, stagger: 0.06,
          scrollTrigger: { trigger: faq, start: 'top 86%', toggleActions: 'play none none none' },
        });

        /* ---------- closing heading ---------- */
        const cta = one('[data-anim="cta-heading"]');
        if (cta) gsap.fromTo(cta,
          { clipPath: 'inset(0% 0% 100% 0%)', y: 26 },
          { clipPath: 'inset(0% 0% -12% 0%)', y: 0, duration: 1.1, ease: 'power4.out',
            scrollTrigger: { trigger: cta, start: 'top 88%', toggleActions: 'play none none none' } });

        const refresh = () => ScrollTrigger.refresh();
        [200, 700, 1500].forEach((t) => setTimeout(refresh, t));
        window.addEventListener('load', refresh);
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
      });
    }

    run();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);
}

function countUp(gsap, el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const raw = el.textContent.trim();
  const m = raw.match(/[\d,]+/);
  if (!m) return;
  const target = parseFloat(m[0].replace(/,/g, ''));
  const pre = raw.slice(0, m.index);
  const post = raw.slice(m.index + m[0].length);
  const o = { v: 0 };
  gsap.to(o, {
    v: target, duration: 0.9, ease: 'power2.out',
    onUpdate: () => { el.textContent = pre + Math.round(o.v).toLocaleString() + post; },
  });
}
