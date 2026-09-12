
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
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach((card) => {
      let isHovered = false;
      let reqId = null;
      let targetRotX = 0;
      let targetRotY = 0;
      let curRotX = 0;
      let curRotY = 0;

      const maxTilt = parseFloat(card.getAttribute('data-tilt-max')) || 12;

      const updateCard = () => {
        curRotX += (targetRotX - curRotX) * 0.12;
        curRotY += (targetRotY - curRotY) * 0.12;

        card.style.transform = `perspective(1000px) rotateX(${curRotX}deg) rotateY(${curRotY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (isHovered || Math.abs(targetRotX - curRotX) > 0.05 || Math.abs(targetRotY - curRotY) > 0.05) {
          reqId = requestAnimationFrame(updateCard);
        } else {
          card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        }
      };

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        if (reqId) cancelAnimationFrame(reqId);
        reqId = requestAnimationFrame(updateCard);
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS custom property for specular glare
        card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;

        targetRotX = -normY * maxTilt;
        targetRotY = normX * maxTilt;
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        targetRotX = 0;
        targetRotY = 0;
      });
    });
  }

  setupMagneticButtons() {
    const magnetics = document.querySelectorAll('[data-magnetic]');
    magnetics.forEach((btn) => {
      const strength = parseFloat(btn.getAttribute('data-magnetic-strength')) || 0.35;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate3d(0px, 0px, 0)`;
      });
    });
  }

  setupScrollParallax() {
    const parallaxItems = document.querySelectorAll('[data-parallax-speed]');
    if (parallaxItems.length === 0) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      parallaxItems.forEach((item) => {
        const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.1;
        const rect = item.parentElement ? item.parentElement.getBoundingClientRect() : null;
        if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (window.innerHeight - rect.top) * speed * 0.2;
          item.style.transform = `translate3d(0, ${-offset}px, 0)`;
        }
      });
    }, { passive: true });
  }
}
