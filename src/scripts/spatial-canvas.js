/**
 * SPATIAL ZERO-GRAVITY CANVAS ENGINE (EDITORIAL WHITE THEME)
 * --------------------------------------------------------------------------
 * Renders suspended multi-depth spatial particles, subtle constellation lines,
 * and ambient zero-G inertia over warm alabaster canvas.
 * Enhanced opacity, vibrant luminous ambient orbs, and interactive filament links.
 */

export class SpatialCanvasEngine {
  constructor(canvasId = 'spatial-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.numParticles = window.innerWidth < 768 ? 65 : 125;
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 200 };
    this.scroll = { current: 0, last: 0, velocity: 0 };
    this.accentColor = { r: 217, g: 119, b: 6 }; // default amber
    
    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  setAccentColor(r, g, b) {
    this.accentColor = { r, g, b };
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
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
        zDepth: 0.3 + Math.random() * 0.9, // 3D depth layer
        baseRadius: isAccent ? 1.4 + Math.random() * 2.8 : 1.0 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.42,
        baseAlpha: 0.38 + Math.random() * 0.42,
        pulseSpeed: 0.012 + Math.random() * 0.024,
        pulseOffset: Math.random() * Math.PI * 2,
        isAccent,
        hasRing: isAccent && Math.random() > 0.65
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.targetX = e.clientX;
      this.mouse.targetY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.targetX = -1000;
      this.mouse.targetY = -1000;
    });

    window.addEventListener('scroll', () => {
      this.scroll.current = window.scrollY;
    }, { passive: true });
  }

  updatePhysics() {
    // Smooth mouse inertia
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    // Scroll velocity damping
    this.scroll.velocity = (this.scroll.current - this.scroll.last) * 0.05;
    this.scroll.last = this.scroll.current;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Base weightless drift
      p.x += p.vx * p.zDepth;
      p.y += (p.vy - this.scroll.velocity * 0.35) * p.zDepth;

      // Mouse repulsion / gravitation bubble
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius && dist > 0) {
        const force = (1 - dist / this.mouse.radius) * 2.2 * p.zDepth;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force;
        p.y -= Math.sin(angle) * force;
      }

      // Torus wrap-around bounds
      if (p.x < -30) p.x = this.width + 30;
      if (p.x > this.width + 30) p.x = -30;
      if (p.y < -30) p.y = this.height + 30;
      if (p.y > this.height + 30) p.y = -30;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const time = performance.now() * 0.001;

    // 1. Primary Ambient Dynamic Spatial Glow Orb (Higher Opacity & Richness)
    const orb1X = this.width * 0.72 + Math.sin(time * 0.35) * 70;
    const orb1Y = this.height * 0.32 + Math.cos(time * 0.28) * 55;
    const orb1Grad = this.ctx.createRadialGradient(orb1X, orb1Y, 15, orb1X, orb1Y, 520);
    orb1Grad.addColorStop(0, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.22)`);
    orb1Grad.addColorStop(0.4, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.09)`);
    orb1Grad.addColorStop(0.8, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.02)`);
    orb1Grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    this.ctx.fillStyle = orb1Grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Secondary Ambient Dynamic Spatial Glow Orb (Lower left balance)
    const orb2X = this.width * 0.22 + Math.cos(time * 0.32) * 65;
    const orb2Y = this.height * 0.72 + Math.sin(time * 0.38) * 50;
    const orb2Grad = this.ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 440);
    orb2Grad.addColorStop(0, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.16)`);
    orb2Grad.addColorStop(0.5, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.05)`);
    orb2Grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.ctx.fillStyle = orb2Grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 3. Mouse-Interactive Soft Radiant Spotlight Aura
    if (this.mouse.x > 0 && this.mouse.x < this.width) {
      const mouseGrad = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 5,
        this.mouse.x, this.mouse.y, 220
      );
      mouseGrad.addColorStop(0, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.14)`);
      mouseGrad.addColorStop(0.6, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.035)`);
      mouseGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      this.ctx.fillStyle = mouseGrad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // 4. Spatial Constellation Filament Lines (Between close nodes - 3.5x higher visibility)
    const maxLinkDist = 135;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLinkDist) {
          const alpha = (1 - dist / maxLinkDist) * 0.42 * Math.min(p1.zDepth, p2.zDepth);
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          
          if (p1.isAccent || p2.isAccent) {
            this.ctx.strokeStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha * 1.3})`;
            this.ctx.lineWidth = 0.9;
          } else {
            this.ctx.strokeStyle = `rgba(32, 28, 22, ${alpha * 0.9})`;
            this.ctx.lineWidth = 0.75;
          }
          this.ctx.stroke();
        }
      }
    }

    // 5. Interactive Mouse Constellation Threads (Lines connecting mouse to nearby particles)
    if (this.mouse.x > 0 && this.mouse.x < this.width) {
      const mouseLinkDist = 165;
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseLinkDist) {
          const alpha = (1 - dist / mouseLinkDist) * 0.52 * p.zDepth;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha})`;
          this.ctx.lineWidth = 1.0;
          this.ctx.stroke();
        }
      }
    }

    // 6. Render Suspended Zero-G Nodes (Crisp, High Opacity, Halos & Glows)
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const pulse = Math.sin(time * 2.4 + p.pulseOffset) * 0.25;
      const radius = Math.max(0.6, (p.baseRadius + pulse) * p.zDepth);
      const alpha = Math.min(1, Math.max(0.12, (p.baseAlpha + pulse * 0.2) * p.zDepth));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

      if (p.isAccent) {
        this.ctx.fillStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${Math.min(1, alpha * 1.85)})`;
        this.ctx.shadowColor = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.55)`;
        this.ctx.shadowBlur = 10 * p.zDepth;
        this.ctx.fill();

        // Optional concentric radiant halo ring
        if (p.hasRing) {
          const ringRadius = radius * 2.3 + Math.sin(time * 3 + p.pulseOffset) * 0.8;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
          this.ctx.strokeStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha * 0.55})`;
          this.ctx.lineWidth = 0.85;
          this.ctx.stroke();
        }
      } else {
        this.ctx.fillStyle = `rgba(28, 25, 20, ${alpha * 0.95})`;
        this.ctx.shadowBlur = 0;
        this.ctx.fill();
      }
    }
  }

  animate() {
    this.updatePhysics();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

