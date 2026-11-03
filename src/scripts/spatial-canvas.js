/**
 * SPATIAL ZERO-GRAVITY CANVAS ENGINE (HIGH-PERFORMANCE & CRISP)
 * --------------------------------------------------------------------------
 * Renders crisp, pixel-perfect suspended spatial nodes and elegant filament
 * constellation lines over warm alabaster / deep ink backgrounds.
 * Optimized DPR matching physical display (no blur), zero heavy shadowBlurs,
 * squared distance pruning for 60fps fluid performance.
 */

export class SpatialCanvasEngine {
  constructor(canvasId = 'spatial-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    
    this.particles = [];
    this.numParticles = window.innerWidth < 768 ? 38 : 58;
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 160 };
    this.scroll = { current: 0, last: 0, velocity: 0 };
    this.accentColor = { r: 217, g: 119, b: 6 }; // default amber
    this.isPaused = false;
    this.animationId = null;
    
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();

    if (this.isReducedMotion()) {
      this.draw();
      return;
    }

    this.animate();
  }

  isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  setAccentColor(r, g, b) {
    this.accentColor = { r, g, b };
  }

  resize() {
    // True crisp pixel density matching device (max 2 for crisp 4K / Retina without memory waste)
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    // Reset transform matrix before scaling to prevent cumulative scale drift
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      const isAccent = Math.random() > 0.65;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        zDepth: 0.4 + Math.random() * 0.8,
        baseRadius: isAccent ? 1.5 + Math.random() * 2.0 : 1.0 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        baseAlpha: 0.3 + Math.random() * 0.4,
        pulseOffset: Math.random() * Math.PI * 2,
        isAccent,
        hasRing: isAccent && Math.random() > 0.6
      });
    }
  }

  bindEvents() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.resize();
        this.createParticles();
        if (this.isReducedMotion()) this.draw();
      }, 100);
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = -1000;
      this.mouse.targetY = -1000;
    });

    window.addEventListener('scroll', () => {
      this.scroll.current = window.scrollY;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.isPaused = true;
        if (this.animationId) cancelAnimationFrame(this.animationId);
      } else {
        if (!this.isReducedMotion()) {
          this.isPaused = false;
          this.animate();
        }
      }
    });
  }

  updatePhysics() {
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.1;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.1;

    this.scroll.velocity = (this.scroll.current - this.scroll.last) * 0.04;
    this.scroll.last = this.scroll.current;

    const mouseActive = this.mouse.x > 0 && this.mouse.x < this.width;
    const mouseRadiusSq = this.mouse.radius * this.mouse.radius;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx * p.zDepth;
      p.y += (p.vy - this.scroll.velocity * 0.25) * p.zDepth;

      if (mouseActive) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / this.mouse.radius) * 1.5 * p.zDepth;
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * force;
          p.y -= Math.sin(angle) * force;
        }
      }

      // Torus screen wrap
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isDark = document.documentElement.classList.contains('dark');
    const time = performance.now() * 0.0012;

    // 1. Subtle, crisp constellation filament lines (Squared distance check for performance)
    const maxLinkDist = 120;
    const maxLinkDistSq = maxLinkDist * maxLinkDist;

    this.ctx.lineWidth = 0.65;
    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxLinkDistSq) {
          const dist = Math.sqrt(distSq);
          const alpha = (1 - dist / maxLinkDist) * 0.28 * Math.min(p1.zDepth, p2.zDepth);

          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);

          if (p1.isAccent || p2.isAccent) {
            this.ctx.strokeStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha * 0.85})`;
          } else {
            this.ctx.strokeStyle = isDark
              ? `rgba(200, 210, 225, ${alpha * 0.35})`
              : `rgba(40, 36, 28, ${alpha * 0.25})`;
          }
          this.ctx.stroke();
        }
      }
    }

    // 2. Crisp Suspended Zero-G Nodes (Zero shadowBlur for maximum GPU speed & sharpness)
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.2;
      const radius = Math.max(0.7, (p.baseRadius + pulse) * p.zDepth);
      const alpha = Math.min(1, Math.max(0.15, (p.baseAlpha + pulse * 0.15) * p.zDepth));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

      if (p.isAccent) {
        this.ctx.fillStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${Math.min(1, alpha * 1.4)})`;
        this.ctx.fill();

        // Crisp single-pixel concentric orbital ring
        if (p.hasRing) {
          const ringRadius = radius * 2.2;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha * 0.45})`;
          this.ctx.lineWidth = 0.75;
          this.ctx.stroke();
        }
      } else {
        this.ctx.fillStyle = isDark
          ? `rgba(215, 220, 235, ${alpha * 0.6})`
          : `rgba(35, 30, 22, ${alpha * 0.45})`;
        this.ctx.fill();
      }
    }
  }

  animate() {
    if (this.isPaused) return;
    this.updatePhysics();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}
