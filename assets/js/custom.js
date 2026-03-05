(function () {
  const STORAGE_KEY = 'theme';
  const THEME_ATTR = 'data-theme';
  const THEMES = { light: 'light', dark: 'dark' };
  const root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? THEMES.dark
      : THEMES.light;
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      return null;
    }
  }

  function setSavedTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (err) {
      // no-op
    }
  }

  function syncThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    const toggle = document.getElementById('theme-toggle');
    if (!icon || !toggle) return;

    icon.classList.toggle('fa-moon', theme === THEMES.light);
    icon.classList.toggle('fa-sun', theme === THEMES.dark);
    toggle.setAttribute('aria-label', theme === THEMES.dark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function applyTheme(theme, persist) {
    root.setAttribute(THEME_ATTR, theme);
    syncThemeIcon(theme);
    if (persist) setSavedTheme(theme);
  }

  window.toggleTheme = function toggleTheme() {
    const current = root.getAttribute(THEME_ATTR) || getSystemTheme();
    const next = current === THEMES.dark ? THEMES.light : THEMES.dark;
    applyTheme(next, true);
  };

  window.scrollToAbout = function scrollToAbout() {
    const target = document.getElementById('about');
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - 76;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
  };

  function initTheme() {
    const currentAttr = root.getAttribute(THEME_ATTR);
    const saved = getSavedTheme();
    const startingTheme = saved || currentAttr || getSystemTheme();
    applyTheme(startingTheme, false);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function (event) {
        event.preventDefault();
        window.toggleTheme();
      });
    }

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (!getSavedTheme()) {
          applyTheme(getSystemTheme(), false);
        }
      });
    }
  }

  function initRevealAnimations() {
    const revealNodes = Array.from(document.querySelectorAll('.reveal'));
    if (!revealNodes.length) return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealNodes.forEach(function (node) {
        node.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -40px 0px' }
    );

    revealNodes.forEach(function (node) {
      observer.observe(node);
    });
  }

  function initScrollArrow() {
    const about = document.getElementById('about');
    const arrow = document.getElementById('scrollArrow');
    if (!about || !arrow || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          arrow.classList.toggle('hidden', entry.isIntersecting);
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(about);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initRevealAnimations();
    initScrollArrow();
  });
})();
