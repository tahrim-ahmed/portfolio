// Portfolio interactivity: mobile nav, smooth scroll, scroll reveal, back-to-top.

const HEADER_OFFSET = 76;

function scrollToTarget(id: string): void {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

function initMobileNav(): void {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initSmoothScroll(): void {
  const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  anchors.forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget(href.slice(1));
    });
  });
}

function initScrollReveal(): void {
  const targets = document.querySelectorAll<HTMLElement>('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          setTimeout(() => el.classList.add('is-visible'), (index % 4) * 60);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

function initBackToTop(): void {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    },
    { passive: true }
  );
}

function initActiveNavHighlight(): void {
  const sections = document.querySelectorAll<HTMLElement>('main > section[id]');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

function initYear(): void {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initSmoothScroll();
  initScrollReveal();
  initBackToTop();
  initActiveNavHighlight();
  initYear();
});