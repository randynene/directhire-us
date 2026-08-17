/* ============================================================
   CE Direct Hire — US · interactions + GSAP animation suite
   Animation spec ported 1:1 from the design handoff README
   (page-load timeline + ScrollTrigger reveals). Since this is
   static markup — nothing mounts asynchronously — the original
   prototype's "wait for DOM to settle" polling hack is dropped,
   exactly as the README recommends for a real build.
   ============================================================ */

(function () {
  'use strict';

  /* ---------------- job post grid (160 decorative cells) ---------------- */
  var jobGrid = document.getElementById('job-grid');
  if (jobGrid) {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 160; i++) {
      var cell = document.createElement('div');
      cell.className = 'job-post-grid__cell';
      frag.appendChild(cell);
    }
    jobGrid.appendChild(frag);
  }

  /* ---------------- modal ---------------- */
  var scrim = document.querySelector('[data-modal-scrim]');
  var modalTitle = document.querySelector('[data-modal-title]');
  var modalBody = document.querySelector('[data-modal-body]');
  var modalFooter = document.querySelector('[data-modal-footer]');
  var lastFocused = null;

  var FORM_BODY = modalBody ? modalBody.innerHTML : '';
  var FORM_FOOTER = modalFooter ? modalFooter.innerHTML : '';

  var SENT_BODY =
    '<ul style="margin:0;padding:0;display:grid;gap:11px">' +
    '<li class="check-item"><span class="check-item__icon"><svg class="icon" viewBox="0 0 15 15" width="15" height="15" stroke-width="0.938" aria-hidden="true"><path d="M2.5 7.5l3.125 3.125L12.5 3.75"/></svg></span><span class="check-item__text">A senior engineer reads the brief today</span></li>' +
    '<li class="check-item"><span class="check-item__icon"><svg class="icon" viewBox="0 0 15 15" width="15" height="15" stroke-width="0.938" aria-hidden="true"><path d="M2.5 7.5l3.125 3.125L12.5 3.75"/></svg></span><span class="check-item__text">45-minute scoping call before we search</span></li>' +
    '<li class="check-item"><span class="check-item__icon"><svg class="icon" viewBox="0 0 15 15" width="15" height="15" stroke-width="0.938" aria-hidden="true"><path d="M2.5 7.5l3.125 3.125L12.5 3.75"/></svg></span><span class="check-item__text">$3,000 to start, credited in full to the fee</span></li>' +
    '</ul>';

  var SENT_FOOTER =
    '<button type="button" class="btn btn--primary btn--sm btn--no-arrow" data-close-modal>Close</button>';

  function openModal() {
    if (!scrim) return;
    lastFocused = document.activeElement;
    resetModalToForm();
    scrim.hidden = false;
    var firstField = scrim.querySelector('input, textarea, select, button');
    if (firstField) firstField.focus();
    document.addEventListener('keydown', onModalKeydown);
  }

  function closeModal() {
    if (!scrim) return;
    scrim.hidden = true;
    document.removeEventListener('keydown', onModalKeydown);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function resetModalToForm() {
    if (modalTitle) modalTitle.textContent = 'Start a search';
    if (modalBody) modalBody.innerHTML = FORM_BODY;
    if (modalFooter) modalFooter.innerHTML = FORM_FOOTER;
    bindModalFooterButtons();
  }

  function showSentState() {
    if (modalTitle) modalTitle.textContent = 'Thanks — we’ll be in touch';
    if (modalBody) modalBody.innerHTML = SENT_BODY;
    if (modalFooter) modalFooter.innerHTML = SENT_FOOTER;
    bindModalFooterButtons();
  }

  function bindModalFooterButtons() {
    var send = modalFooter && modalFooter.querySelector('[data-modal-send]');
    if (send) send.addEventListener('click', showSentState);
    var closers = modalFooter ? modalFooter.querySelectorAll('[data-close-modal]') : [];
    closers.forEach(function (b) { b.addEventListener('click', closeModal); });
  }

  function onModalKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (btn) {
    btn.addEventListener('click', closeModal);
  });
  if (scrim) {
    scrim.addEventListener('click', function (e) {
      if (e.target === scrim) closeModal();
    });
  }
  bindModalFooterButtons();

  /* ---------------- accordion ---------------- */
  var accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    var items = Array.from(accordion.querySelectorAll('.accordion-item'));
    items.forEach(function (item) {
      var trigger = item.querySelector('.accordion-item__trigger');
      trigger.addEventListener('click', function () {
        var willOpen = item.getAttribute('data-open') !== 'true';
        items.forEach(function (other) {
          other.setAttribute('data-open', 'false');
          other.querySelector('.accordion-item__trigger').setAttribute('aria-expanded', 'false');
          setIcon(other, 'plus');
        });
        if (willOpen) {
          item.setAttribute('data-open', 'true');
          trigger.setAttribute('aria-expanded', 'true');
          setIcon(item, 'minus');
        }
      });
    });
  }
  function setIcon(item, name) {
    var icon = item.querySelector('[data-icon-plus] svg path');
    if (!icon) return;
    icon.setAttribute('d', name === 'minus' ? 'M3.75 9h10.5' : 'M9 3.75v10.5M3.75 9h10.5');
  }

  /* ---------------- report card tabs ---------------- */
  var tablist = document.querySelector('[data-tabs]');
  if (tablist) {
    var tabs = Array.from(tablist.querySelectorAll('.tab'));
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.setAttribute('aria-selected', 'false'); });
        tab.setAttribute('aria-selected', 'true');
      });
    });
  }

  /* ============================================================
     GSAP animation suite
     ============================================================ */
  function initAnimations() {
    if (!window.gsap || !window.ScrollTrigger) return;
    var gsap = window.gsap, ST = window.ScrollTrigger;
    gsap.registerPlugin(ST);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.defaults({ ease: 'power3.out' });
    var q = function (s) { return Array.from(document.querySelectorAll(s)); };
    var one = function (s) { return document.querySelector(s); };
    var from = function (targets, vars) {
      var t = (Array.isArray(targets) ? targets : [targets]).filter(Boolean);
      return t.length ? gsap.from(t, vars) : null;
    };

    /* ---------- page load timeline ---------- */
    var tl = gsap.timeline({ delay: 0.1 });
    var nav = one('.navbar');
    if (nav) tl.from(nav, { y: -24, opacity: 0, duration: 0.7 }, 0);

    var heroCopy = one('[data-hero-copy]');
    if (heroCopy && heroCopy.children.length) {
      tl.from(Array.from(heroCopy.children), { y: 28, opacity: 0, duration: 0.85, stagger: 0.075 }, 0.15);
    }

    var panel = one('[data-shortlist]');
    if (panel) {
      tl.from(panel, { y: 44, opacity: 0, scale: 0.985, duration: 1, transformOrigin: '50% 0%' }, 0.35);
      var cards = Array.from(panel.querySelectorAll('.candidate-card'));
      if (cards.length) tl.from(cards, { y: 14, opacity: 0, duration: 0.6, stagger: 0.09 }, 0.7);
    }

    /* ---------- scroll progress bar ---------- */
    var bar = one('[data-progress]');
    if (bar) {
      gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
    }

    /* ---------- generic reveals ---------- */
    q('[data-reveal]').forEach(function (el) {
      var targets = el.getAttribute('data-reveal') === 'stagger' ? Array.from(el.children) : [el];
      from(targets, {
        y: 34, opacity: 0, duration: 0.85, stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
      });
    });

    /* ---------- section headers ---------- */
    q('[data-sec-head]').forEach(function (head) {
      from(Array.from(head.children), {
        y: 26, opacity: 0, duration: 0.75, stagger: 0.1,
        scrollTrigger: { trigger: head, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    /* ---------- applicant grid -> two profiles ---------- */
    var gridWrap = one('[data-anim="grid"]');
    if (gridWrap) {
      var cells = Array.from(gridWrap.querySelectorAll('.job-post-grid__cell'));
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
      var floaters = one('[data-anim="floaters"]');
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
    var video = one('[data-anim="video"]');
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
    var stages = one('[data-anim="stages"]');
    if (stages) from(Array.from(stages.children), {
      y: 46, opacity: 0, duration: 0.9, stagger: 0.12,
      scrollTrigger: { trigger: stages, start: 'top 84%', toggleActions: 'play none none none' },
    });

    /* ---------- code panel lines ---------- */
    var code = one('[data-anim="codepanel"]');
    if (code) {
      gsap.from(code, { y: 34, opacity: 0, duration: 0.85, scrollTrigger: { trigger: code, start: 'top 85%', toggleActions: 'play none none none' } });
      var lines = Array.from(code.querySelectorAll('[data-code-line]'));
      if (lines.length) gsap.from(lines, {
        x: -12, opacity: 0, duration: 0.4, stagger: 0.055, ease: 'power2.out',
        scrollTrigger: { trigger: code, start: 'top 78%', toggleActions: 'play none none none' },
      });
    }

    /* ---------- report card: bars grow, verdicts count ---------- */
    var report = one('[data-anim="report"]');
    if (report) {
      gsap.from(report, { y: 40, opacity: 0, duration: 0.9, scrollTrigger: { trigger: report, start: 'top 85%', toggleActions: 'play none none none' } });
      var fills = Array.from(report.querySelectorAll('.progress > div'));
      if (fills.length) gsap.from(fills, {
        scaleX: 0, transformOrigin: '0% 50%', duration: 1.1, ease: 'power3.out', stagger: 0.14,
        scrollTrigger: { trigger: report, start: 'top 78%', toggleActions: 'play none none none' },
      });
      ST.create({
        trigger: report, start: 'top 78%', toggleActions: 'play none none none',
        onEnter: function () {
          report.querySelectorAll('.score-row__verdict').forEach(function (s) {
            if (/^\d+%$/.test(s.textContent.trim())) countUp(s);
          });
        },
      });
    }

    /* ---------- funnel: staggered reveal, no pin ---------- */
    var funnel = one('[data-anim="funnel"]');
    if (funnel) {
      var rows = Array.from(funnel.querySelectorAll('.funnel-row'));
      var funnelFills = Array.from(funnel.querySelectorAll('.progress > div'));
      if (rows.length) {
        var ftl = gsap.timeline({
          scrollTrigger: { trigger: funnel, start: 'top 78%', toggleActions: 'play none none none' },
        });
        ftl.from(funnel, { y: 34, opacity: 0, duration: 0.7 }, 0);
        rows.forEach(function (row, i) {
          var at = 0.18 + i * 0.11;
          ftl.from(row, { y: 14, opacity: 0, duration: 0.55 }, at);
          if (funnelFills[i]) ftl.from(funnelFills[i], { scaleX: 0, transformOrigin: '0% 50%', duration: 0.85, ease: 'power2.out' }, at);
          var val = row.querySelector('.funnel-row__value');
          if (val) ftl.add(function () { countUp(val); }, at);
        });
      }
    }

    /* ---------- de-risk band ---------- */
    var derisk = one('[data-anim="derisk"]');
    if (derisk) {
      var deriskItems = Array.from(derisk.querySelectorAll('.derisk-band__item'));
      if (deriskItems.length) gsap.from(deriskItems, {
        y: 16, opacity: 0, duration: 0.6, stagger: 0.09,
        scrollTrigger: { trigger: derisk, start: 'top 92%', toggleActions: 'play none none none' },
      });
    }

    /* ---------- feature cards ---------- */
    var feats = one('[data-anim="features"]');
    if (feats) from(Array.from(feats.children), {
      y: 40, opacity: 0, duration: 0.85, stagger: 0.1,
      scrollTrigger: { trigger: feats, start: 'top 84%', toggleActions: 'play none none none' },
    });

    /* ---------- pricing ---------- */
    var pricing = one('[data-anim="pricing"]');
    if (pricing) {
      gsap.from(pricing, { y: 44, opacity: 0, duration: 0.95, scrollTrigger: { trigger: pricing, start: 'top 84%', toggleActions: 'play none none none' } });
      var big = pricing.querySelector('.pricing-card__headline');
      if (big) gsap.from(big, { scale: 0.9, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', transformOrigin: '0% 50%', scrollTrigger: { trigger: pricing, start: 'top 80%', toggleActions: 'play none none none' } });
    }

    /* ---------- faq ---------- */
    var faq = one('[data-anim="faq"]');
    if (faq) from(Array.from(faq.querySelectorAll('.accordion-item__trigger')), {
      y: 22, opacity: 0, duration: 0.6, stagger: 0.06,
      scrollTrigger: { trigger: faq, start: 'top 86%', toggleActions: 'play none none none' },
    });

    /* ---------- closing heading ---------- */
    var cta = one('[data-anim="cta-heading"]');
    if (cta) gsap.fromTo(cta,
      { clipPath: 'inset(0% 0% 100% 0%)', y: 26 },
      { clipPath: 'inset(0% 0% -12% 0%)', y: 0, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: cta, start: 'top 88%', toggleActions: 'play none none none' } });

    [200, 700, 1500].forEach(function (t) { setTimeout(function () { ST.refresh(); }, t); });
    window.addEventListener('load', function () { ST.refresh(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { ST.refresh(); });
    window.addEventListener('resize', function () { ST.refresh(); });
  }

  function countUp(el) {
    if (el.__counted) return;
    el.__counted = true;
    var raw = el.textContent.trim();
    var m = raw.match(/[\d,]+/);
    if (!m) return;
    var target = parseFloat(m[0].replace(/,/g, ''));
    var pre = raw.slice(0, m.index), post = raw.slice(m.index + m[0].length);
    var o = { v: 0 };
    window.gsap.to(o, {
      v: target, duration: 0.9, ease: 'power2.out',
      onUpdate: function () { el.textContent = pre + Math.round(o.v).toLocaleString() + post; },
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
