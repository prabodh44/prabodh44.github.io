/* ============================================================
   Prabodh Tuladhar — Portfolio
   Handles: scroll-spy nav, mobile menu, contact form submit,
   dynamic footer year.
   ============================================================ */

(() => {
  'use strict';

  /* -------- Footer year -------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------- Mobile nav toggle -------- */
  const sidebar = document.getElementById('sidebar');
  const navToggle = document.getElementById('navToggle');
  const body = document.body;

  const closeNav = () => {
    sidebar.classList.remove('is-open');
    body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  const openNav = () => {
    sidebar.classList.add('is-open');
    body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('is-open')) closeNav();
      else openNav();
    });
  }

  // Close mobile nav after tapping a link
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 820px)').matches) {
        closeNav();
      }
    });
  });

  // Close on scrim click / Escape
  document.addEventListener('click', (e) => {
    if (!sidebar.classList.contains('is-open')) return;
    if (sidebar.contains(e.target) || navToggle.contains(e.target)) return;
    closeNav();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) closeNav();
  });

  /* -------- Scroll-spy -------- */
  const navLinks = document.querySelectorAll('[data-nav]');
  const sectionIds = Array.from(navLinks).map(a => a.getAttribute('href').slice(1));
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const setActive = (id) => {
    navLinks.forEach(link => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isMatch);
    });
  };

  // Use IntersectionObserver to detect which section is mostly in view.
  // We track all sections and pick the one with the highest intersection ratio
  // that is actively intersecting — this feels most natural to the reader.
  const ratios = new Map();
  sections.forEach(s => ratios.set(s.id, 0));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
    });

    // Pick the section with the largest ratio currently
    let topId = null;
    let topRatio = 0;
    for (const [id, ratio] of ratios) {
      if (ratio > topRatio) {
        topRatio = ratio;
        topId = id;
      }
    }
    if (topId) setActive(topId);
  }, {
    // Slightly biased toward the top so the section you're reading is "active"
    rootMargin: '-20% 0px -50% 0px',
    threshold: [0, 0.15, 0.3, 0.5, 0.75, 1]
  });

  sections.forEach(s => observer.observe(s));

  // Fallback: set first section active on load if nothing fires yet
  if (sections.length) setActive(sections[0].id);

  /* -------- Contact form -------- */
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.className = 'contact-form__status';
      status.textContent = 'sending…';

      // Guard against the unconfigured placeholder endpoint
      if (form.action.includes('YOUR_FORMSPREE_ID')) {
        status.className = 'contact-form__status is-error';
        status.textContent = 'Form not yet configured. See README for Formspree setup.';
        return;
      }

      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.reset();
          status.className = 'contact-form__status is-success';
          status.textContent = '✓ Message sent. I\'ll reply within a day or two.';
        } else {
          const payload = await res.json().catch(() => ({}));
          const msg = (payload.errors && payload.errors.map(e => e.message).join(', '))
            || 'Something went wrong. Please email directly.';
          status.className = 'contact-form__status is-error';
          status.textContent = msg;
        }
      } catch (err) {
        status.className = 'contact-form__status is-error';
        status.textContent = 'Network error. Please try again or email directly.';
      }
    });
  }
})();
