/**
 * SPATIAL ZERO-GRAVITY CANVAS ENGINE (OPTIMIZED & ADAPTIVE)
 * --------------------------------------------------------------------------
 * Renders suspended multi-depth spatial particles, subtle constellation lines,
 * and ambient zero-G inertia over warm alabaster / deep ink canvas.
 * Optimized DPR capped at 1.5, tab visibility pausing, and prefers-reduced-motion.
 */

export class SpatialCanvasEngine {
  constructor(canvasId = 'spatial-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.numParticles = window.innerWidth < 768 ? 45 : 85;
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180 };
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

    // Honor prefers-reduced-motion
    if (this.isReducedMotion()) {
      this.draw(); // Single static render
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
    // Cap DPR at 1.5 for maximum battery/rendering performance
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.numParticles; i++) {
      const isAccent = Math.random() > 0.65;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        zDepth: 0.3 + Math.random() * 0.9,
        baseRadius: isAccent ? 1.2 + Math.random() * 2.2 : 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        baseAlpha: 0.25 + Math.random() * 0.35,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        isAccent,
        hasRing: isAccent && Math.random() > 0.7
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
      if (this.isReducedMotion()) this.draw();
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

    // Pause animation when browser tab is inactive or hidden
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
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    this.scroll.velocity = (this.scroll.current - this.scroll.last) * 0.04;
    this.scroll.last = this.scroll.current;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx * p.zDepth;
      p.y += (p.vy - this.scroll.velocity * 0.25) * p.zDepth;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius && dist > 0) {
        const force = (1 - dist / this.mouse.radius) * 1.8 * p.zDepth;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force;
        p.y -= Math.sin(angle) * force;
      }

      if (p.x < -30) p.x = this.width + 30;
      if (p.x > this.width + 30) p.x = -30;
      if (p.y < -30) p.y = this.height + 30;
      if (p.y > this.height + 30) p.y = -30;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const isDark = document.documentElement.classList.contains('dark');
    const time = performance.now() * 0.001;

    // 1. Primary Ambient Glow Orb
    const orb1X = this.width * 0.72 + Math.sin(time * 0.35) * 60;
    const orb1Y = this.height * 0.32 + Math.cos(time * 0.28) * 45;
    const orb1Grad = this.ctx.createRadialGradient(orb1X, orb1Y, 15, orb1X, orb1Y, 480);
    orb1Grad.addColorStop(0, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${isDark ? 0.15 : 0.12})`);
    orb1Grad.addColorStop(0.5, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.04)`);
    orb1Grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    this.ctx.fillStyle = orb1Grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Secondary Ambient Glow Orb
    const orb2X = this.width * 0.22 + Math.cos(time * 0.32) * 50;
    const orb2Y = this.height * 0.72 + Math.sin(time * 0.38) * 40;
    const orb2Grad = this.ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 380);
    orb2Grad.addColorStop(0, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${isDark ? 0.12 : 0.08})`);
    orb2Grad.addColorStop(0.5, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.03)`);
    orb2Grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.ctx.fillStyle = orb2Grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 3. Mouse Radiant Spotlight
    if (this.mouse.x > 0 && this.mouse.x < this.width) {
      const mouseGrad = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 5,
        this.mouse.x, this.mouse.y, 200
      );
      mouseGrad.addColorStop(0, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.1)`);
      mouseGrad.addColorStop(0.6, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.02)`);
      mouseGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      this.ctx.fillStyle = mouseGrad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // 4. Subtle Constellation Filament Lines (Restrained opacity so text is never compromised)
    const maxLinkDist = 115;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLinkDist) {
          const alpha = (1 - dist / maxLinkDist) * 0.22 * Math.min(p1.zDepth, p2.zDepth);
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          
          if (p1.isAccent || p2.isAccent) {
            this.ctx.strokeStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha * 0.9})`;
            this.ctx.lineWidth = 0.7;
          } else {
            this.ctx.strokeStyle = isDark 
              ? `rgba(200, 205, 220, ${alpha * 0.45})` 
              : `rgba(45, 40, 32, ${alpha * 0.35})`;
            this.ctx.lineWidth = 0.55;
          }
          this.ctx.stroke();
        }
      }
    }

    // 5. Suspended Zero-G Nodes
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.2;
      const radius = Math.max(0.5, (p.baseRadius + pulse) * p.zDepth);
      const alpha = Math.min(1, Math.max(0.1, (p.baseAlpha + pulse * 0.15) * p.zDepth));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

      if (p.isAccent) {
        this.ctx.fillStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${Math.min(1, alpha * 1.5)})`;
        this.ctx.shadowColor = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.35)`;
        this.ctx.shadowBlur = 6 * p.zDepth;
        this.ctx.fill();

        if (p.hasRing) {
          const ringRadius = radius * 2.2 + Math.sin(time * 2.5 + p.pulseOffset) * 0.6;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha * 0.4})`;
          this.ctx.lineWidth = 0.7;
          this.ctx.stroke();
        }
      } else {
        this.ctx.fillStyle = isDark
          ? `rgba(220, 225, 240, ${alpha * 0.55})`
          : `rgba(38, 34, 28, ${alpha * 0.45})`;
        this.ctx.shadowBlur = 0;
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
