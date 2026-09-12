/**
 * SPATIAL ZERO-GRAVITY CANVAS ENGINE (EDITORIAL WHITE THEME)
 * --------------------------------------------------------------------------
 * Renders suspended multi-depth spatial particles, subtle constellation lines,
 * and ambient zero-G inertia over warm alabaster canvas.
 */

export class SpatialCanvasEngine {
  constructor(canvasId = 'spatial-canvas') {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.particles = [];
    this.numParticles = window.innerWidth < 768 ? 45 : 90;
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180 };
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
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        zDepth: 0.2 + Math.random() * 0.9, // 3D depth layer
        baseRadius: 0.8 + Math.random() * 2.2,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        baseAlpha: 0.15 + Math.random() * 0.35,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
        isAccent: Math.random() > 0.7
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
      p.y += (p.vy - this.scroll.velocity * 0.3) * p.zDepth;

      // Mouse repulsion / gravitation bubble
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius && dist > 0) {
        const force = (1 - dist / this.mouse.radius) * 1.8 * p.zDepth;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force;
        p.y -= Math.sin(angle) * force;
      }

      // Torus wrap-around bounds
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const time = performance.now() * 0.001;

    // 1. Ambient Dynamic Spatial Glow Orb in Background
    const orbX = this.width * 0.75 + Math.sin(time * 0.4) * 50;
    const orbY = this.height * 0.35 + Math.cos(time * 0.3) * 40;
    const orbGrad = this.ctx.createRadialGradient(orbX, orbY, 10, orbX, orbY, 400);
    orbGrad.addColorStop(0, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.07)`);
    orbGrad.addColorStop(0.6, `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.015)`);
    orbGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    this.ctx.fillStyle = orbGrad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Spatial Constellation Filament Lines (Between close nodes)
    const maxLinkDist = 110;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLinkDist) {
          const alpha = (1 - dist / maxLinkDist) * 0.12 * Math.min(p1.zDepth, p2.zDepth);
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(30, 28, 24, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    // 3. Render Suspended Zero-G Nodes
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.2;
      const radius = Math.max(0.4, (p.baseRadius + pulse) * p.zDepth);
      const alpha = Math.min(1, Math.max(0.05, (p.baseAlpha + pulse * 0.15) * p.zDepth));

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

      if (p.isAccent) {
        this.ctx.fillStyle = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, ${alpha * 1.5})`;
        this.ctx.shadowColor = `rgba(${this.accentColor.r}, ${this.accentColor.g}, ${this.accentColor.b}, 0.3)`;
        this.ctx.shadowBlur = 6 * p.zDepth;
      } else {
        this.ctx.fillStyle = `rgba(25, 25, 30, ${alpha * 0.85})`;
        this.ctx.shadowBlur = 0;
      }

      this.ctx.fill();
    }
  }

  animate() {
    this.updatePhysics();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}
