/**
 * TILT & SPATIAL PARALLAX ENGINE
 * --------------------------------------------------------------------------
 * Handles 3D card perspective tilt, specular reflections, magnetic buttons,
 * and multi-plane scroll parallax for suspended zero-gravity elements.
 */

export class TiltParallaxEngine {
  constructor() {
    this.tiltCards = [];
    this.magneticElements = [];
    this.parallaxNodes = [];
    this.init();
  }

  init() {
    this.setupTiltCards();
    this.setupMagneticButtons();
    this.setupScrollParallax();
  }

  refresh() {
    this.setupTiltCards();
    this.setupMagneticButtons();
    this.setupScrollParallax();
  }

  setupTiltCards() {
    // Disable tilt on touch devices or if reduced motion is preferred
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const cards = document.querySelectorAll('[data-tilt]');

    if (isTouch || prefersReducedMotion) {
      cards.forEach(card => {
        card.style.transform = 'none';
      });
      return;
    }

    cards.forEach((card) => {
      let isHovered = false;
      let reqId = null;
      let targetRotX = 0;
      let targetRotY = 0;
      let curRotX = 0;
      let curRotY = 0;
      let cardRect = null;

      // Cap max tilt to subtle 2.5 degrees for buttery-smooth premium feel
      const rawMax = parseFloat(card.getAttribute('data-tilt-max')) || 2.5;
      const maxTilt = Math.min(rawMax, 2.5);

      const updateCard = () => {
        curRotX += (targetRotX - curRotX) * 0.15;
        curRotY += (targetRotY - curRotY) * 0.15;

        if (isHovered || Math.abs(targetRotX - curRotX) > 0.05 || Math.abs(targetRotY - curRotY) > 0.05) {
          card.style.transform = `rotateX(${curRotX.toFixed(2)}deg) rotateY(${curRotY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
          reqId = requestAnimationFrame(updateCard);
        } else {
          card.style.transform = 'none';
        }
      };

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        cardRect = card.getBoundingClientRect();
        if (reqId) cancelAnimationFrame(reqId);
        reqId = requestAnimationFrame(updateCard);
      });

      card.addEventListener('mousemove', (e) => {
        if (!cardRect) cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;

        // Set CSS custom property for specular glare
        card.style.setProperty('--mouse-x', `${(x / cardRect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / cardRect.height) * 100}%`);

        const normX = (x / cardRect.width) * 2 - 1;
        const normY = (y / cardRect.height) * 2 - 1;

        targetRotX = -normY * maxTilt;
        targetRotY = normX * maxTilt;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        cardRect = null;
        targetRotX = 0;
        targetRotY = 0;
      });
    });
  }

  setupMagneticButtons() {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const magnetics = document.querySelectorAll('[data-magnetic]');
    magnetics.forEach((btn) => {
      const strength = Math.min(parseFloat(btn.getAttribute('data-magnetic-strength')) || 0.2, 0.25);

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        btn.style.transform = `translate3d(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  setupScrollParallax() {
    const isTouch = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const parallaxItems = document.querySelectorAll('[data-parallax-speed]');
    if (!parallaxItems.length) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.1;
            item.style.transform = `translate3d(0, ${-(scrollY * speed).toFixed(1)}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}
