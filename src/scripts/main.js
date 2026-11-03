import { CommandPalette } from './command-palette.js';
import { profileData } from '../data/profile.js';
import { projectsData } from '../data/projects.js';
import { renderProjectCard, renderEndOfRowCard } from './project-card.js';
import { SpatialCanvasEngine } from './spatial-canvas.js';
import { TiltParallaxEngine } from './tilt-parallax.js';

class SpatialPortfolioApp {
  constructor() {
    this.canvasEngine = null;
    this.tiltEngine = null;
    this.activeFilter = 'all';

    this.init();
  }

  init() {
    // Prevent browser from restoring scroll position to bottom on reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname);
    }

    const safe = (fn, name) => {
      try {
        fn();
      } catch (err) {
        console.warn('[SpatialPortfolio] Non-fatal warning in ' + name + ':', err);
      }
    };

    // 1. Initialize Subsystems
    safe(() => { this.canvasEngine = new SpatialCanvasEngine('spatial-canvas'); }, 'canvasEngine');

    // 2. Hydrate Dynamic DOM from Profile Data
    safe(() => this.hydrateProfile(), 'hydrateProfile');
    safe(() => this.renderProjects(), 'renderProjects');
    safe(() => this.renderCapabilities(), 'renderCapabilities');
    safe(() => this.renderTechStack(), 'renderTechStack');
    safe(() => this.renderExperience(), 'renderExperience');
    safe(() => this.renderPrinciples(), 'renderPrinciples');
    safe(() => this.renderPresenceHub(), 'renderPresenceHub');
    safe(() => this.renderCredentials(), 'renderCredentials');
    safe(() => this.renderSocialLinks(), 'renderSocialLinks');

    // 3b. Polish & Wow Subsystems
    safe(() => { this.commandPalette = new CommandPalette(); }, 'commandPalette');
    safe(() => this.setupScrollProgressBar(), 'setupScrollProgressBar');
    safe(() => this.setupCardGlowEffect(), 'setupCardGlowEffect');
    safe(() => this.setupStatCounterAnimation(), 'setupStatCounterAnimation');

    // 3. Initialize Interactive Features
    safe(() => this.setupWelcomeEntrance(), 'setupWelcomeEntrance');
    safe(() => this.setupScrollReveal(), 'setupScrollReveal');
    safe(() => this.setupThemeToggle(), 'setupThemeToggle');
    safe(() => this.setupThemeAccentSwitcher(), 'setupThemeAccentSwitcher');
    safe(() => this.setupNavigationObserver(), 'setupNavigationObserver');
    safe(() => this.setupEmailCopy(), 'setupEmailCopy');
    safe(() => this.setupCaseStudyModal(), 'setupCaseStudyModal');
    safe(() => this.setupResumeModal(), 'setupResumeModal');
    safe(() => this.setupContactForm(), 'setupContactForm');
    safe(() => this.setupAboutLiveTelemetry(), 'setupAboutLiveTelemetry');
    safe(() => this.setupPrincipleCardEffects(), 'setupPrincipleCardEffects');

    // 4. Initialize 3D Card Tilts and Magnetic Buttons
    safe(() => { this.tiltEngine = new TiltParallaxEngine(); }, 'tiltEngine');
  }

  hydrateProfile() {
    const { personal } = profileData;

    // Header & Meta
    const brandName = document.getElementById('nav-brand-name');
    if (brandName) brandName.textContent = personal.name;

    const heroStatus = document.getElementById('hero-status-text');
    if (heroStatus) {
      heroStatus.textContent = "CSE @ VIT Chennai '29 • Open for SDE internships & research";
    }

    // Hero title: use two-line serif + display-weight editorial treatment
    const heroName = document.getElementById('hero-personal-name');
    if (heroName && personal.name) {
      const parts = personal.name.split(' ');
      const first = parts[0];
      const rest  = parts.slice(1).join(' ');
      heroName.innerHTML = `<span class="title-editorial">${first}</span><span class="title-accent">${rest}</span>`;
    }

    // Hero tagline
    const heroTagline = document.getElementById('hero-tagline');
    if (heroTagline && personal.tagline) {
      heroTagline.textContent = personal.tagline;
    }

    // Hero Stats
    const statsContainer = document.getElementById('hero-stats-container');
    if (statsContainer && personal.heroMetrics) {
      statsContainer.innerHTML = personal.heroMetrics.map(stat => `
        <div class="stat-item">
          <div class="stat-value">${stat.value}</div>
          <div class="stat-label">${stat.label}</div>
        </div>
      `).join('');
    }

    // Bio Paragraphs
    const bioContainer = document.getElementById('about-bio-text');
    if (bioContainer && personal.bioParagraphs) {
      const formattedLead = personal.bioParagraphs[0]
        .replace('Computer Science student', '<span class="text-shimmer-gold">Computer Science student</span>')
        .replace('VIT Chennai', '<span class="text-shimmer-gold">VIT Chennai</span>')
        .replace('8.53 CGPA', '<span class="text-shimmer-gold">8.53 CGPA</span>');

      bioContainer.innerHTML = `
        <p class="bio-lead-text">${formattedLead}</p>
        ${personal.bioParagraphs.slice(1).map(p => `<p class="bio-body-text">${p}</p>`).join('')}
      `;
    }

    // Portraits
    const heroImg = document.querySelector('.editorial-portrait-img');
    if (heroImg && personal.avatarUrl) {
      heroImg.src = personal.avatarUrl;
    }

    const aboutImg = document.getElementById('about-portrait-img');
    if (aboutImg && personal.secondaryAvatarUrl) {
      aboutImg.src = personal.secondaryAvatarUrl;
    }

    // Contact Coordinates
    const contactEmail = document.getElementById('contact-email-text');
    if (contactEmail) contactEmail.textContent = personal.email;

    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  }

  renderProjects() {
    const carousel = document.getElementById('projects-carousel');
    const filterContainer = document.getElementById('work-filter-bar');
    if (!carousel) return;

    // Extract unique categories
    const categories = ['all', ...new Set(projectsData.map(p => p.category))];

    if (filterContainer) {
      filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === this.activeFilter ? 'active' : ''}" 
                data-filter="${cat}"
                role="tab"
                aria-selected="${cat === this.activeFilter}">
          ${cat === 'all' ? 'All Works' : cat}
        </button>
      `).join('');

      filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.activeFilter = e.currentTarget.getAttribute('data-filter');
          filterContainer.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
          });
          e.currentTarget.classList.add('active');
          e.currentTarget.setAttribute('aria-selected', 'true');
          this.renderCarouselCards();
          // Reset carousel scroll to start on filter change
          carousel.scrollTo({ left: 0, behavior: this.isReducedMotion() ? 'auto' : 'smooth' });
        });
      });
    }

    this.setupCarouselControls();
    this.renderCarouselCards();
  }

  renderCarouselCards() {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel) return;

    // Filter projects: when 'all', show featured projects
    let displayProjects = projectsData.filter(p => {
      if (this.activeFilter === 'all') {
        return p.featured === true;
      }
      return p.category === this.activeFilter;
    });

    if (displayProjects.length === 0 && this.activeFilter !== 'all') {
      displayProjects = projectsData.filter(p => p.category === this.activeFilter);
    }

    const cardsHtml = displayProjects.map(p => 
      renderProjectCard(p, { isCarousel: true, viewMode: 'grid' })
    ).join('');

    const endOfRowCard = renderEndOfRowCard(projectsData.length);

    carousel.innerHTML = cardsHtml + endOfRowCard;

    // Attach click listeners for case study modal
    carousel.querySelectorAll('[data-project-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') && !e.target.closest('[data-action="case-study"]')) {
          return;
        }
        if (this.isCarouselDragging) {
          return;
        }
        const id = card.getAttribute('data-project-id');
        this.openCaseStudy(id);
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('a')) {
            e.preventDefault();
            const id = card.getAttribute('data-project-id');
            this.openCaseStudy(id);
          }
        }
      });
    });

    if (this.tiltEngine) {
      this.tiltEngine.refresh();
    }

    this.updateCarouselState();
  }

  setupCarouselControls() {
    const carousel = document.getElementById('projects-carousel');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    if (!carousel || this.carouselInitialized) return;
    this.carouselInitialized = true;

    const scrollOneCard = (direction) => {
      const card = carousel.querySelector('.carousel-card');
      const cardWidth = card ? card.offsetWidth : 380;
      const gap = 24;
      const scrollAmount = (cardWidth + gap) * direction;
      const behavior = this.isReducedMotion() ? 'auto' : 'smooth';
      carousel.scrollBy({ left: scrollAmount, behavior });
    };

    if (prevBtn) prevBtn.addEventListener('click', () => scrollOneCard(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollOneCard(1));

    // Scroll listener for progress bar, disabled arrow state, and edge fade masks
    carousel.addEventListener('scroll', () => {
      this.updateCarouselState();
    }, { passive: true });

    // Keyboard navigation (ArrowLeft / ArrowRight)
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollOneCard(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollOneCard(-1);
      }
    });

    // Mouse wheel: horizontal ONLY when cursor is over carousel AND user holds Shift
    carousel.addEventListener('wheel', (e) => {
      if (e.shiftKey) {
        e.preventDefault();
        carousel.scrollLeft += (e.deltaY || e.deltaX);
      }
      // If NOT shiftKey, DO NOT preventDefault! Allow normal page vertical scroll!
    }, { passive: false });

    // Click and drag with grab/grabbing cursor and small threshold (> 6px)
    let isDown = false;
    let startX = 0;
    let initialScrollLeft = 0;
    this.isCarouselDragging = false;

    carousel.addEventListener('mousedown', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      isDown = true;
      this.isCarouselDragging = false;
      carousel.classList.add('is-dragging');
      startX = e.pageX - carousel.offsetLeft;
      initialScrollLeft = carousel.scrollLeft;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX);
      if (Math.abs(walk) > 6) {
        this.isCarouselDragging = true;
      }
      carousel.scrollLeft = initialScrollLeft - walk;
    });

    window.addEventListener('mouseup', () => {
      if (isDown) {
        isDown = false;
        carousel.classList.remove('is-dragging');
        setTimeout(() => {
          this.isCarouselDragging = false;
        }, 60);
      }
    });

    window.addEventListener('resize', () => this.updateCarouselState(), { passive: true });
  }

  updateCarouselState() {
    const carousel = document.getElementById('projects-carousel');
    const prevBtn = document.getElementById('carousel-prev-btn');
    const nextBtn = document.getElementById('carousel-next-btn');
    const progressBar = document.getElementById('carousel-progress-thumb');
    const leftFade = document.getElementById('carousel-edge-left');
    const rightFade = document.getElementById('carousel-edge-right');

    if (!carousel) return;

    const scrollLeft = carousel.scrollLeft;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    // Disabled state on prev/next arrows
    if (prevBtn) {
      const atStart = scrollLeft <= 4;
      prevBtn.disabled = atStart;
      prevBtn.setAttribute('aria-disabled', atStart ? 'true' : 'false');
    }
    if (nextBtn) {
      const atEnd = scrollLeft >= maxScroll - 4 || maxScroll <= 0;
      nextBtn.disabled = atEnd;
      nextBtn.setAttribute('aria-disabled', atEnd ? 'true' : 'false');
    }

    // Edge fade masks
    if (leftFade) {
      leftFade.style.opacity = scrollLeft > 10 ? '1' : '0';
    }
    if (rightFade) {
      rightFade.style.opacity = (maxScroll > 10 && scrollLeft < maxScroll - 10) ? '1' : '0';
    }

    // Progress bar thumb
    if (progressBar) {
      const ratio = maxScroll > 0 ? Math.min(Math.max(scrollLeft / maxScroll, 0), 1) : 1;
      const trackWidth = progressBar.parentElement ? progressBar.parentElement.clientWidth : 140;
      const thumbWidth = Math.max(trackWidth * (carousel.clientWidth / carousel.scrollWidth), 28);
      progressBar.style.width = `${thumbWidth}px`;
      progressBar.style.transform = `translateX(${ratio * (trackWidth - thumbWidth)}px)`;
    }
  }

  isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  getProjectGraphic(p) {
    if (p.id === 'aims') {
      // AIMS: 3D Isometric Warehouse Grid & Automated SQL Trigger Alert
      return `
        <div class="project-visual-terminal visual-aims">
          <div class="terminal-grid-bg"></div>
          <div class="aims-warehouse-stage">
            <svg class="aims-svg" viewBox="0 0 240 130" fill="none">
              <!-- Isometric Ground Grid -->
              <polygon points="120,25 200,65 120,105 40,65" stroke="rgba(217, 119, 6, 0.3)" stroke-width="1.2" fill="rgba(217, 119, 6, 0.04)" />
              <line x1="80" y1="45" x2="160" y2="85" stroke="rgba(217, 119, 6, 0.2)" stroke-width="1" />
              <line x1="160" y1="45" x2="80" y2="85" stroke="rgba(217, 119, 6, 0.2)" stroke-width="1" />
              
              <!-- Warehouse Rack Column 1 -->
              <g transform="translate(70, 48)">
                <polygon points="0,0 20,-10 20,22 0,32" fill="rgba(217, 119, 6, 0.2)" stroke="#d97706" stroke-width="1.2" />
                <polygon points="20,-10 40,0 40,32 20,22" fill="rgba(217, 119, 6, 0.12)" stroke="#d97706" stroke-width="1.2" />
                <polygon points="0,0 20,-10 40,0 20,10" fill="rgba(217, 119, 6, 0.32)" stroke="#d97706" stroke-width="1.2" />
                <circle cx="20" cy="8" r="2.5" fill="#d97706" />
              </g>

              <!-- Warehouse Rack Column 2 (Active Reorder Node) -->
              <g transform="translate(130, 48)">
                <polygon points="0,0 20,-10 20,22 0,32" fill="rgba(224, 75, 42, 0.25)" stroke="#e04b2a" stroke-width="1.2" />
                <polygon points="20,-10 40,0 40,32 20,22" fill="rgba(224, 75, 42, 0.15)" stroke="#e04b2a" stroke-width="1.2" />
                <polygon points="0,0 20,-10 40,0 20,10" fill="rgba(224, 75, 42, 0.4)" stroke="#e04b2a" stroke-width="1.2" />
                <circle cx="20" cy="8" r="3" fill="#e04b2a">
                  <animate attributeName="r" values="2;4;2" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </g>

              <!-- Radar Alert Arc -->
              <path d="M 110 32 A 35 35 0 0 1 170 32" stroke="#d97706" stroke-width="1.2" stroke-dasharray="3 3" opacity="0.8" />
            </svg>
          </div>
          <div class="terminal-hud-pill hud-pill-status">
            <span class="hud-status-dot pulse-amber"></span>
            <span>STOCK // AUDITED</span>
          </div>
          <div class="terminal-hud-pill hud-pill-metrics">
            <span>3NF LEDGER</span>
            <span class="hud-divider">/</span>
            <span>913k SALES</span>
          </div>
        </div>
      `;
    }

    if (p.id === 'soundchain') {
      // SoundChain: 3D Vinyl Record & Instant BPS Smart Contract Settlement
      return `
        <div class="project-visual-terminal visual-soundchain">
          <div class="terminal-grid-bg"></div>
          <div class="soundchain-vinyl-stage">
            <svg class="vinyl-svg" viewBox="0 0 240 130" fill="none">
              <!-- Outer Rotating Vinyl Record -->
              <g class="rotating-vinyl" transform="translate(120, 65)">
                <circle r="48" fill="#14151a" stroke="rgba(245, 158, 11, 0.5)" stroke-width="2" />
                <circle r="42" stroke="rgba(245, 158, 11, 0.25)" stroke-width="0.8" stroke-dasharray="8 4" />
                <circle r="36" stroke="rgba(245, 158, 11, 0.2)" stroke-width="0.8" />
                <circle r="30" stroke="rgba(245, 158, 11, 0.25)" stroke-width="0.8" stroke-dasharray="6 3" />
                <circle r="24" stroke="rgba(245, 158, 11, 0.3)" stroke-width="0.8" />
                <circle r="16" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />
                <circle r="4" fill="#14151a" />
              </g>

              <!-- Equalizer Audio Wavebars -->
              <g transform="translate(42, 50)">
                <rect x="0" y="8" width="3" height="14" rx="1.5" fill="#f59e0b" opacity="0.6">
                  <animate attributeName="height" values="8;24;12;20;8" dur="1.2s" repeatCount="indefinite" />
                </rect>
                <rect x="7" y="2" width="3" height="20" rx="1.5" fill="#f59e0b" opacity="0.85">
                  <animate attributeName="height" values="18;10;26;14;18" dur="1.1s" repeatCount="indefinite" />
                </rect>
                <rect x="14" y="5" width="3" height="17" rx="1.5" fill="#f59e0b" opacity="0.7">
                  <animate attributeName="height" values="12;28;15;22;12" dur="1.3s" repeatCount="indefinite" />
                </rect>
              </g>

              <g transform="translate(182, 50)">
                <rect x="0" y="5" width="3" height="17" rx="1.5" fill="#f59e0b" opacity="0.7">
                  <animate attributeName="height" values="14;26;10;22;14" dur="1.25s" repeatCount="indefinite" />
                </rect>
                <rect x="7" y="2" width="3" height="20" rx="1.5" fill="#f59e0b" opacity="0.85">
                  <animate attributeName="height" values="20;12;26;16;20" dur="1.05s" repeatCount="indefinite" />
                </rect>
                <rect x="14" y="8" width="3" height="14" rx="1.5" fill="#f59e0b" opacity="0.6">
                  <animate attributeName="height" values="10;22;12;26;10" dur="1.35s" repeatCount="indefinite" />
                </rect>
              </g>
            </svg>
          </div>
          <div class="terminal-hud-pill hud-pill-status">
            <span class="hud-status-dot pulse-amber"></span>
            <span>SOLIDITY 0.8.20</span>
          </div>
          <div class="terminal-hud-pill hud-pill-metrics">
            <span>10,000 BPS</span>
            <span class="hud-divider">/</span>
            <span>ETH &amp; USDC</span>
          </div>
        </div>
      `;
    }

    if (p.id === 'inhv') {
      // iNHV: Aadhaar Medical Vault & Google Gemma 4 Function Calling
      return `
        <div class="project-visual-terminal visual-inhv">
          <div class="terminal-grid-bg"></div>
          <div class="inhv-gemma-stage">
            <svg class="vault-svg" viewBox="0 0 240 130" fill="none">
              <polygon points="120,14 165,40 165,92 120,118 75,92 75,40" stroke="rgba(13, 148, 104, 0.35)" stroke-width="1.5" fill="rgba(13, 148, 104, 0.08)" stroke-dasharray="4 2"/>
              <polygon points="120,26 154,46 154,86 120,106 86,86 86,46" stroke="#0d9468" stroke-width="1.8" fill="rgba(13, 148, 104, 0.12)"/>
              
              <!-- Clinical ECG Waveform with Gemma 4 Pulse -->
              <path d="M 65 66 L 95 66 L 104 48 L 114 84 L 124 52 L 130 74 L 136 66 L 175 66" stroke="#0d9468" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              
              <!-- Gemma 4 Neural Function Calling Nodes -->
              <circle cx="120" cy="26" r="3.5" fill="#0d9468" />
              <circle cx="154" cy="46" r="3" fill="#0d9468" />
              <circle cx="86" cy="46" r="3" fill="#0d9468" />
            </svg>
          </div>
          <div class="terminal-hud-pill hud-pill-status">
            <span class="hud-status-dot pulse-sage"></span>
            <span>GEMMA 4 // RAG ACTIVE</span>
          </div>
          <div class="terminal-hud-pill hud-pill-metrics">
            <span>FUNCTION CALLING</span>
            <span class="hud-divider">/</span>
            <span>AES-256</span>
          </div>
        </div>
      `;
    }

    if (p.id === 'orbitcheck') {
      // OrbitCheck: Live QR Scanner & Gate Pass Terminal
      return `
        <div class="project-visual-terminal visual-orbitcheck">
          <div class="terminal-grid-bg"></div>
          <div class="qr-scanner-stage">
            <div class="qr-code-mockup">
              <div class="qr-corner top-left"></div>
              <div class="qr-corner top-right"></div>
              <div class="qr-corner bottom-left"></div>
              <div class="qr-matrix-pattern">
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
                <span class="qr-cell"></span>
              </div>
              <div class="qr-laser-scanner"></div>
            </div>
          </div>
          <div class="terminal-hud-pill hud-pill-status">
            <span class="hud-status-dot pulse-coral"></span>
            <span>GATE PASS // VERIFIED</span>
          </div>
          <div class="terminal-hud-pill hud-pill-metrics">
            <span>MIC SUMMIT</span>
            <span class="hud-divider">/</span>
            <span>&lt; 2.0s SCAN</span>
          </div>
        </div>
      `;
    }

    if (p.id === 'portfolio') {
      // Personal Portfolio: Physics Canvas Particle Constellation
      return `
        <div class="project-visual-terminal visual-portfolio">
          <div class="terminal-grid-bg"></div>
          <div class="portfolio-particles-stage">
            <svg class="portfolio-svg" viewBox="0 0 240 130" fill="none">
              <circle cx="120" cy="65" r="42" stroke="rgba(124, 58, 237, 0.25)" stroke-width="1.2" stroke-dasharray="4 3" />
              <circle cx="120" cy="65" r="24" stroke="rgba(124, 58, 237, 0.4)" stroke-width="1.4" />
              <circle cx="120" cy="65" r="8" fill="#7c3aed" />
              
              <!-- Orbital Particle Nodes -->
              <circle cx="90" cy="50" r="3" fill="#7c3aed" opacity="0.8" />
              <circle cx="150" cy="80" r="3.5" fill="#7c3aed" opacity="0.8" />
              <circle cx="145" cy="45" r="2.5" fill="#7c3aed" opacity="0.6" />
              <circle cx="95" cy="85" r="2.5" fill="#7c3aed" opacity="0.6" />

              <line x1="90" y1="50" x2="120" y2="65" stroke="rgba(124, 58, 237, 0.3)" stroke-width="1" />
              <line x1="150" y1="80" x2="120" y2="65" stroke="rgba(124, 58, 237, 0.3)" stroke-width="1" />
              <line x1="145" y1="45" x2="120" y2="65" stroke="rgba(124, 58, 237, 0.3)" stroke-width="1" />
            </svg>
          </div>
          <div class="terminal-hud-pill hud-pill-status">
            <span class="hud-status-dot pulse-violet"></span>
            <span>VANILLA JS // 60 FPS</span>
          </div>
          <div class="terminal-hud-pill hud-pill-metrics">
            <span>ZERO BLOAT</span>
            <span class="hud-divider">/</span>
            <span>CSS TOKENS</span>
          </div>
        </div>
      `;
    }

    // Default / Multi-Agent: Neural Swarm Topology
    return `
      <div class="project-visual-terminal visual-multiagent">
        <div class="terminal-grid-bg"></div>
        <div class="agent-network-stage">
          <svg class="agent-graph-svg" viewBox="0 0 240 130" fill="none">
            <path d="M 50 65 L 120 25 L 190 65 L 120 105 Z" stroke="rgba(217, 119, 6, 0.45)" stroke-width="1.5" stroke-dasharray="3 3" />
            <path d="M 50 65 L 190 65" stroke="rgba(217, 119, 6, 0.25)" stroke-width="1.2" />
            <line x1="120" y1="25" x2="120" y2="105" stroke="rgba(217, 119, 6, 0.25)" stroke-width="1.2" />
            <circle r="3.5" fill="#d97706">
              <animateMotion path="M 50 65 L 120 25 L 190 65 L 120 105 Z" dur="3s" repeatCount="indefinite" />
            </circle>
            <g transform="translate(50, 65)">
              <circle r="14" fill="rgba(217, 119, 6, 0.14)" stroke="#d97706" stroke-width="1.5"/>
              <text y="3" text-anchor="middle" font-size="7" fill="#d97706" font-family="monospace" font-weight="700">SEC</text>
            </g>
            <g transform="translate(120, 25)">
              <circle r="16" fill="rgba(217, 119, 6, 0.2)" stroke="#d97706" stroke-width="2"/>
              <text y="3.5" text-anchor="middle" font-size="7.5" fill="#d97706" font-family="monospace" font-weight="700">SWARM</text>
            </g>
            <g transform="translate(190, 65)">
              <circle r="14" fill="rgba(217, 119, 6, 0.14)" stroke="#d97706" stroke-width="1.5"/>
              <text y="3" text-anchor="middle" font-size="7" fill="#d97706" font-family="monospace" font-weight="700">MKT</text>
            </g>
            <g transform="translate(120, 105)">
              <circle r="14" fill="rgba(217, 119, 6, 0.14)" stroke="#d97706" stroke-width="1.5"/>
              <text y="3" text-anchor="middle" font-size="7" fill="#d97706" font-family="monospace" font-weight="700">RISK</text>
            </g>
          </svg>
        </div>
        <div class="terminal-hud-pill hud-pill-status">
          <span class="hud-status-dot pulse-amber"></span>
          <span>AI SWARM // ACTIVE</span>
        </div>
        <div class="terminal-hud-pill hud-pill-metrics">
          <span>&lt; 60s LATENCY</span>
          <span class="hud-divider">/</span>
          <span>100% SOURCED</span>
        </div>
      </div>
    `;
  }

  renderCapabilities() {
    const grid = document.getElementById('capabilities-grid');
    if (!grid) return;

    grid.innerHTML = profileData.capabilities.map(cap => `
      <div class="capability-card" data-tilt data-tilt-max="4">
        <div class="capability-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
        </div>
        <h3 class="capability-title">${cap.category}</h3>
        <p class="capability-desc">${cap.description}</p>
        <ul class="capability-skills-list">
          ${cap.skills.map(s => `
            <li class="capability-skill-item">
              <span class="skill-bullet"></span>
              <span>${s}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('');
  }

  renderTechStack() {
    const grid = document.getElementById('tech-stack-grid');
    if (!grid) return;

    grid.innerHTML = profileData.techStack.map(item => `
      <div class="tech-pill">
        <span class="tech-pill-name">${item.name}</span>
        <span class="tech-pill-cat">${item.category}</span>
      </div>
    `).join('');
  }

  renderExperience() {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;

    timeline.innerHTML = profileData.experience.map(exp => `
      <div class="timeline-node">
        <div class="timeline-card">
          <div class="timeline-period">${exp.period}</div>
          <h4 class="timeline-role">${exp.role}</h4>
          <div class="timeline-company">${exp.company} • ${exp.location}</div>
          <p class="timeline-desc">${exp.description}</p>
        </div>
      </div>
    `).join('');
  }

  renderPrinciples() {
    const grid = document.getElementById('principles-grid');
    if (!grid) return;

    grid.innerHTML = profileData.principles.map(p => `
      <div class="principle-card">
        <div class="principle-number">${p.number}</div>
        <h4 class="principle-title">${p.title}</h4>
        <p class="principle-desc">${p.description}</p>
      </div>
    `).join('');
  }

  renderCredentials() {
    const credGrid = document.getElementById('credentials-grid');
    if (credGrid && profileData.certifications) {
      credGrid.innerHTML = profileData.certifications.map(c => `
        <article class="credential-card" data-tilt data-tilt-max="4">
          <div class="credential-reticle reticle-tl"></div>
          <div class="credential-reticle reticle-br"></div>
          <div class="credential-top">
            <span class="credential-badge-chip">${c.badgeText}</span>
            <span class="credential-year">${c.year}</span>
          </div>
          <h4 class="credential-title">${c.title}</h4>
          <div class="credential-issuer">${c.issuer} • <span class="credential-track">${c.track}</span></div>
          <p class="credential-desc">${c.description}</p>
        </article>
      `).join('');
    }

    const eduGrid = document.getElementById('education-cards-grid');
    if (eduGrid && profileData.education) {
      eduGrid.innerHTML = profileData.education.map(e => `
        <div class="education-card">
          <div class="education-period">${e.period}</div>
          <h4 class="education-inst">${e.institution}</h4>
          <div class="education-deg">${e.degree} — <strong class="education-grade">${e.grade}</strong></div>
          <p class="education-highlights">${e.highlights}</p>
        </div>
      `).join('');
    }
  }

  renderPresenceHub() {
    const grid = document.getElementById('presence-grid');
    if (!grid || !profileData.presenceHub) return;

    const { github, linkedin, leetcode, codolio } = profileData.presenceHub;

    grid.innerHTML = `
      <!-- 1. GitHub Ecosystem Card -->
      <article class="presence-card" data-tilt data-tilt-max="4">
        <div class="presence-header">
          <div class="presence-identity">
            <div class="presence-platform-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </div>
            <div class="presence-title-wrap">
              <h3 class="presence-platform-name">GitHub</h3>
              <span class="presence-handle">${github.handle}</span>
            </div>
          </div>
          <span class="presence-status-badge">
            <span class="skill-bullet"></span>
            <span>${github.status}</span>
          </span>
        </div>

        <p class="presence-headline">${github.headline}</p>

        <div class="presence-stats-row">
          ${(github.stats || []).map(s => `
            <div class="presence-stat-box">
              <div class="presence-stat-num">${s.value}</div>
              <div class="presence-stat-lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Authentic GitHub Activity & Language Distribution (No fake cells) -->
        <div class="github-activity-strip">
          <div class="activity-strip-header">
            <span>Verified Activity &amp; Stack Distribution</span>
            <span class="activity-tag">GSSoC '26 &amp; MIC</span>
          </div>
          <div class="activity-sparkline-row">
            <div class="activity-metric-pill">
              <span class="metric-val">12</span>
              <span class="metric-lbl">Public Repos</span>
            </div>
            <div class="activity-metric-pill">
              <span class="metric-val">85d</span>
              <span class="metric-lbl">Daily Streak</span>
            </div>
            <div class="activity-metric-pill">
              <span class="metric-val">100%</span>
              <span class="metric-lbl">Open Source</span>
            </div>
          </div>
          <div class="activity-language-bar">
            <span class="lang-slice lang-py" style="width: 42%;" title="Python (42%)"></span>
            <span class="lang-slice lang-js" style="width: 33%;" title="JavaScript / React (33%)"></span>
            <span class="lang-slice lang-sol" style="width: 15%;" title="Solidity (15%)"></span>
            <span class="lang-slice lang-other" style="width: 10%;" title="C / C++ (10%)"></span>
          </div>
          <div class="activity-language-legend">
            <span><span class="legend-dot py"></span>Python (42%)</span>
            <span><span class="legend-dot js"></span>JavaScript (33%)</span>
            <span><span class="legend-dot sol"></span>Solidity (15%)</span>
            <span><span class="legend-dot other"></span>C/C++ (10%)</span>
          </div>
        </div>

        <div class="featured-repos-list">
          ${(github.featuredRepos || []).map(r => `
            <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="repo-pill">
              <div class="repo-info-left">
                <span class="repo-name">${r.name}</span>
                <span class="repo-desc">${r.desc}</span>
              </div>
              <div class="repo-meta-right">
                <span style="color: var(--text-muted); font-size: 0.72rem;">${r.language}</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </a>
          `).join('')}
        </div>

        <a href="${github.url}" target="_blank" rel="noopener noreferrer" class="presence-cta-btn" data-magnetic data-magnetic-strength="0.2">
          <span>View GitHub Profile (${github.username})</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </article>

      <!-- 2. LeetCode Problem Solving Card (200+ Solved, 85-Day Streak, 1440 Rating) -->
      <article class="presence-card" data-tilt data-tilt-max="4">
        <div class="presence-header">
          <div class="presence-identity">
            <div class="presence-platform-icon" style="color: #ffa116;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 18l6-6-6-6"></path>
                <path d="M8 6l-6 6 6 6"></path>
                <line x1="10" y1="18" x2="14" y2="6"></line>
              </svg>
            </div>
            <div class="presence-title-wrap">
              <h3 class="presence-platform-name">LeetCode</h3>
              <span class="presence-handle">${leetcode.handle}</span>
            </div>
          </div>
          <span class="presence-status-badge" style="color: #00b8a3; border-color: rgba(0, 184, 163, 0.3); font-weight: 600;">
            <span class="skill-bullet" style="background-color: #00b8a3;"></span>
            <span>${leetcode.status}</span>
          </span>
        </div>

        <p class="presence-headline">${leetcode.headline}</p>

        <div class="presence-stats-row">
          ${(leetcode.stats || []).map(s => `
            <div class="presence-stat-box">
              <div class="presence-stat-num" style="${s.label.includes('Streak') ? 'color: #e04b2a; font-size: 1.25rem;' : ''}">${s.value}</div>
              <div class="presence-stat-lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- Authentic LeetCode Problem Solving Breakdown (91E / 80M / 29H) -->
        <div class="leetcode-activity-strip">
          <div class="activity-strip-header">
            <span>Problem Difficulty Distribution (200+ Solved)</span>
            <span style="color: #00b8a3; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;">
              <span style="width: 6px; height: 6px; border-radius: 50%; background: #00b8a3; display: inline-block;"></span>
              85-Day Streak Active
            </span>
          </div>
          <div class="lc-difficulty-breakdown">
            <div class="diff-bar-card diff-easy">
              <div class="diff-header"><span>Easy</span><strong>91</strong></div>
              <div class="diff-progress-track"><div class="diff-progress-fill" style="width: 45%;"></div></div>
            </div>
            <div class="diff-bar-card diff-med">
              <div class="diff-header"><span>Medium</span><strong>80</strong></div>
              <div class="diff-progress-track"><div class="diff-progress-fill" style="width: 40%;"></div></div>
            </div>
            <div class="diff-bar-card diff-hard">
              <div class="diff-header"><span>Hard</span><strong>29</strong></div>
              <div class="diff-progress-track"><div class="diff-progress-fill" style="width: 15%;"></div></div>
            </div>
          </div>
          <div class="lc-contest-metrics">
            <div class="lc-contest-box">
              <span class="lc-contest-label">Contest Rating</span>
              <span class="lc-contest-val">1,440</span>
              <span class="lc-contest-sub">4 Contests Attended</span>
            </div>
            <div class="lc-contest-box">
              <span class="lc-contest-label">Total Submissions</span>
              <span class="lc-contest-val">303</span>
              <span class="lc-contest-sub">Daily Streak Consistency</span>
            </div>
          </div>
        </div>

        <!-- LeetCode Badges Showcase -->
        <div class="leetcode-badges-wrap">
          <div class="leetcode-badges-title">Earned LeetCode Badges &amp; Milestones (5 Badges)</div>
          <div class="leetcode-badges-grid">
            ${leetcode.badges ? leetcode.badges.map(b => `
              <div class="leetcode-badge-card" title="${b.name}">
                <div class="leetcode-badge-icon-wrap">
                  <img src="${b.icon}" alt="${b.name}" class="leetcode-badge-img" onerror="this.style.display='none'" />
                </div>
                <div class="leetcode-badge-info">
                  <span class="leetcode-badge-name">${b.name}</span>
                  <span class="leetcode-badge-cat">${b.category}</span>
                </div>
              </div>
            `).join('') : ''}
          </div>
        </div>

        <!-- Public Goals Progress Matrix -->
        <div class="leetcode-goals-wrap">
          <div class="leetcode-goals-header">
            <span>Public Progress Toward Milestones</span>
            <span class="goals-quote">"Trying to show up everyday."</span>
          </div>
          ${leetcode.goals ? leetcode.goals.map(g => `
            <div class="leetcode-goal-item">
              <div class="goal-info-row">
                <span class="goal-name">${g.title}</span>
                <span class="goal-count"><strong>${g.current}</strong> / ${g.target} (${g.percent}%)</span>
              </div>
              <div class="goal-bar-track">
                <div class="goal-bar-fill" style="width: ${g.percent}%;"></div>
              </div>
            </div>
          `).join('') : ''}
        </div>

        <a href="${leetcode.url}" target="_blank" rel="noopener noreferrer" class="presence-cta-btn" data-magnetic data-magnetic-strength="0.2">
          <span>Explore LeetCode Profile (${leetcode.username})</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </article>

      <!-- 3. Codolio Unified Platform Card -->
      <article class="presence-card" data-tilt data-tilt-max="4">
        <div class="presence-header">
          <div class="presence-identity">
            <div class="presence-platform-icon" style="color: var(--accent);">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div class="presence-title-wrap">
              <h3 class="presence-platform-name">Codolio</h3>
              <span class="presence-handle">${codolio.handle}</span>
            </div>
          </div>
          <span class="presence-status-badge" style="color: var(--accent); border-color: var(--accent-border);">
            <span class="skill-bullet" style="background-color: var(--accent);"></span>
            <span>${codolio.status}</span>
          </span>
        </div>

        <p class="presence-headline">${codolio.headline}</p>

        <div class="presence-stats-row">
          ${(codolio.stats || []).map(s => `
            <div class="presence-stat-box">
              <div class="presence-stat-num">${s.value}</div>
              <div class="presence-stat-lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="codolio-highlights">
          <div class="codolio-item-pill">
            <span>Competitive Programming Tracker</span>
            <span style="font-family: var(--font-tech); font-weight: 600; color: var(--accent);">Synchronized</span>
          </div>
          <div class="codolio-item-pill">
            <span>Multi-Platform Problem Index</span>
            <span style="font-family: var(--font-tech); font-weight: 600; color: var(--accent);">Aggregated</span>
          </div>
          <div class="codolio-item-pill">
            <span>Daily Streak Verifier</span>
            <span style="font-family: var(--font-tech); font-weight: 600; color: var(--accent);">Active</span>
          </div>
        </div>

        <a href="${codolio.url}" target="_blank" rel="noopener noreferrer" class="presence-cta-btn" data-magnetic data-magnetic-strength="0.2">
          <span>View Codolio Profile (${codolio.username})</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </article>

      <!-- 4. LinkedIn Professional Network Card -->
      <article class="presence-card" data-tilt data-tilt-max="4">
        <div class="presence-header">
          <div class="presence-identity">
            <div class="presence-platform-icon" style="color: #0a66c2;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </div>
            <div class="presence-title-wrap">
              <h3 class="presence-platform-name">LinkedIn</h3>
              <span class="presence-handle">${linkedin.handle}</span>
            </div>
          </div>
          <span class="presence-status-badge" style="color: #0a66c2; border-color: rgba(10, 102, 194, 0.3);">
            <span class="skill-bullet" style="background-color: #0a66c2;"></span>
            <span>${linkedin.status}</span>
          </span>
        </div>

        <p class="presence-headline">${linkedin.headline}</p>

        <div class="presence-stats-row">
          ${(linkedin.stats || []).map(s => `
            <div class="presence-stat-box">
              <div class="presence-stat-num">${s.value}</div>
              <div class="presence-stat-lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="linkedin-posts-list">
          ${(linkedin.recentPosts || []).map(p => `
            <div class="linkedin-post-item">
              <div class="post-date-tag">${p.date}</div>
              <div class="post-title-text">${p.title}</div>
              <div class="post-meta-sub">${p.engagement}</div>
            </div>
          `).join('')}
        </div>

        <a href="${linkedin.url}" target="_blank" rel="noopener noreferrer" class="presence-cta-btn" data-magnetic data-magnetic-strength="0.2">
          <span>Connect on LinkedIn (${(linkedin.connections || "463+")})</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      </article>
    `;
  }

  
  renderSocialLinks() {
    const container = document.getElementById('social-links-row');
    if (!container || !profileData.socialLinks) return;

    container.innerHTML = profileData.socialLinks.map(s => `
      <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-pill" data-magnetic data-magnetic-strength="0.2">
        <span>${s.platform}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="7" y1="17" x2="17" y2="7"></line>
          <polyline points="7 7 17 7 17 17"></polyline>
        </svg>
      </a>
    `).join('');
  }

  setupScrollProgressBar() {
    const bar = document.getElementById('global-scroll-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = Math.min(Math.max(window.scrollY / totalScroll, 0), 1);
      bar.style.width = `${progress * 100}%`;
    }, { passive: true });
  }

  setupCardGlowEffect() {
    const cards = document.querySelectorAll('.project-card-3d, .presence-card, .capability-card, .timeline-card, .editorial-portrait-card');
    cards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  setupStatCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-value, .hero-stat-num');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          const el = entry.target;
          const text = el.textContent.trim();
          const match = text.match(/^([0-9.,]+)(.*)$/);
          if (match) {
            const rawNum = parseFloat(match[1].replace(/,/g, ''));
            const suffix = match[2];
            const isDecimal = match[1].includes('.');
            const hasComma = match[1].includes(',');
            const duration = 1200;
            const start = performance.now();

            const update = (now) => {
              const elapsed = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - elapsed, 3);
              const current = rawNum * ease;
              const formatted = isDecimal 
                ? current.toFixed(2)
                : hasComma 
                  ? Math.round(current).toLocaleString()
                  : Math.round(current);
              el.textContent = `${formatted}${suffix}`;
              if (elapsed < 1) {
                requestAnimationFrame(update);
              } else {
                el.textContent = text;
              }
            };
            requestAnimationFrame(update);
          }
        }
      });
    }, { threshold: 0.2 });

    statNumbers.forEach(el => observer.observe(el));
  }

  setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (!toggleBtn) return;

    // Load persisted theme preference
    const savedTheme = localStorage.getItem('saumya_theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    }

    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';

      if (newTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        this.showToast('Theme: Dark & Gold (SoundChain Mode)');
      } else {
        document.documentElement.removeAttribute('data-theme');
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        this.showToast('Theme: Warm Alabaster (Editorial Mode)');
      }

      localStorage.setItem('saumya_theme', newTheme);
    });
  }

  setupThemeAccentSwitcher() {
    const picker = document.getElementById('accent-palette-picker');
    if (!picker) return;

    picker.innerHTML = profileData.themeAccents.map(accent => `
      <button class="accent-swatch" style="background-color: ${accent.color}" data-accent-id="${accent.id}" title="${accent.name}"></button>
    `).join('');

    picker.querySelectorAll('.accent-swatch').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const accentId = e.currentTarget.getAttribute('data-accent-id');
        document.documentElement.setAttribute('data-accent', accentId);
        
        // Update spatial canvas particle accent
        const currentAccent = profileData.themeAccents.find(a => a.id === accentId);
        if (currentAccent && this.canvasEngine) {
          const hex = currentAccent.color.replace('#', '');
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          this.canvasEngine.setAccentColor(r, g, b);
        }
        
        this.showToast(`Accent switched to ${currentAccent ? currentAccent.name : accentId}`);
      });
    });
  }

  setupNavigationObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link-item a');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
  }

  setupScrollReveal() {
    const revealTargets = document.querySelectorAll(
      '.section-header, .project-card-3d, .capability-card, .principle-card, ' +
      '.timeline-card, .presence-card, .credential-card, .education-card, .about-lead-card, .about-editorial-photo-card, ' +
      '.tech-stack-container, .hero-stats-strip'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const siblings = entry.target.parentElement
            ? Array.from(entry.target.parentElement.children).filter(c => c.classList.contains('reveal'))
            : [];
          const index = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, Math.min(index * 80, 300));
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  setupEmailCopy() {
    const copyBox = document.getElementById('copy-email-box');
    if (!copyBox) return;

    copyBox.addEventListener('click', () => {
      const email = profileData.personal.email;
      navigator.clipboard.writeText(email).then(() => {
        this.showToast(`Copied ${email} to clipboard!`);
      }).catch(() => {
        this.showToast(`Email: ${email}`);
      });
    });
  }

  setupAboutLiveTelemetry() {
    const clockEl = document.getElementById('about-live-clock');
    if (!clockEl) return;

    const updateClock = () => {
      try {
        const now = new Date();
        const istTime = now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        clockEl.textContent = `IST ${istTime}`;
      } catch (err) {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const secs = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `LOCAL ${hours}:${mins}:${secs}`;
      }
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  setupPrincipleCardEffects() {
    const cards = document.querySelectorAll('.principle-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
      card.addEventListener('mouseleave', () => {
        card.style.removeProperty('--mouse-x');
        card.style.removeProperty('--mouse-y');
      });
    });
  }

  setupCaseStudyModal() {
    const backdrop = document.getElementById('case-study-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (!backdrop || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
      backdrop.classList.remove('open');
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        backdrop.classList.remove('open');
      }
    });
  }

  setupResumeModal() {
    const modal = document.getElementById('resume-modal');
    const navBtn = document.getElementById('nav-resume-btn');
    const heroBtn = document.getElementById('hero-resume-btn');
    const closeBtn = document.getElementById('resume-close-btn');
    const printBtn = document.getElementById('resume-print-btn');
    const bodyEl = document.getElementById('resume-modal-body');
    if (!modal) return;

    // Immediately pre-hydrate on page load so content is always present
    if (bodyEl) {
      bodyEl.innerHTML = this.getResumeHTML();
    }

    const openResume = (e) => {
      if (e) e.preventDefault();
      if (bodyEl) {
        bodyEl.innerHTML = this.getResumeHTML();
      }
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeResume = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (navBtn) navBtn.addEventListener('click', openResume);
    if (heroBtn) heroBtn.addEventListener('click', openResume);
    if (closeBtn) closeBtn.addEventListener('click', closeResume);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeResume();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeResume();
      }
    });

    if (printBtn) {
      printBtn.addEventListener('click', () => {
        this.showToast('Downloading Saumya_Pandya_Resume.pdf...');
      });
    }
  }

  getResumeHTML() {
    return `
      <div class="resume-paper cv-authentic-layout">
        <header class="cv-header">
          <div class="cv-header-left">
            <h1 class="cv-name">Saumya Pandya</h1>
            <div class="cv-sub">CSE @ VIT Chennai '29 | Full-Stack Developer | Applied AI &amp; Blockchain Enthusiast</div>
          </div>
          <div class="cv-header-right">
            <div><a href="mailto:saumyapandyaartist@gmail.com" class="cv-contact-link">saumyapandyaartist@gmail.com</a></div>
            <div><a href="tel:+917984641399" class="cv-contact-link">+91-7984641399</a></div>
            <div><a href="https://www.linkedin.com/in/saumya-pandya-5a0376369" target="_blank" rel="noopener noreferrer" class="cv-contact-link">LinkedIn</a></div>
            <div><a href="https://github.com/SAMJOD07-devz" target="_blank" rel="noopener noreferrer" class="cv-contact-link">GitHub</a></div>
            <div><a href="https://leetcode.com/u/SAUMYA_PANDYA2207/" target="_blank" rel="noopener noreferrer" class="cv-contact-link">LeetCode (200+)</a></div>
            <div><a href="https://samjod07-devz.github.io/portfolio/" target="_blank" rel="noopener noreferrer" class="cv-contact-link">Portfolio Website</a></div>
          </div>
        </header>

        <div class="cv-divider"></div>

        <!-- Education -->
        <section class="cv-section">
          <div class="cv-section-title"><span class="cv-bullet-rect"></span>Education</div>
          <div class="cv-row">
            <div class="cv-col-date">Jun 2025 – Jul 2029</div>
            <div class="cv-col-content">
              <div class="cv-item-title"><strong>B.Tech, Computer Science &amp; Engineering (CSE Core)</strong>, Vellore Institute of Technology (VIT Chennai), <strong>CGPA: 8.53</strong></div>
              <div class="cv-item-desc">2nd Year Core; School of Computer Science. Coursework: Advanced Data Structures, Database Systems (SQL), Operating Systems, Object-Oriented Software Design.</div>
            </div>
          </div>
          <div class="cv-row">
            <div class="cv-col-date">Jun 2022 – May 2023</div>
            <div class="cv-col-content">
              <div class="cv-item-title"><strong>Higher Secondary Certificate (Class 12)</strong>, Shree P.V. Modi School, <strong>Grade A (93%)</strong></div>
              <div class="cv-item-desc">Science Stream; Mathematics, Physics &amp; Computer Science fundamentals.</div>
            </div>
          </div>
        </section>

        <!-- Roles & Cohorts -->
        <section class="cv-section">
          <div class="cv-section-title"><span class="cv-bullet-rect"></span>Roles &amp; Involvements</div>
          <div class="cv-row">
            <div class="cv-col-date">Sep 2026 – Present</div>
            <div class="cv-col-content">
              <div class="cv-item-title"><strong>Development Member</strong>, <em>Microsoft Innovations Club (MIC) @ VIT Chennai</em></div>
              <div class="cv-item-desc">Engineered campus event platforms, including OrbitCheck QR pass scanner &amp; live database syncing adopted for campus summits.</div>
            </div>
          </div>
          <div class="cv-row">
            <div class="cv-col-date">May 2026 – Aug 2026</div>
            <div class="cv-col-content">
              <div class="cv-item-title"><strong>Open Source Contributor</strong>, <em>GirlScript Summer of Code (GSSoC 2026)</em></div>
              <div class="cv-item-desc">Selected among 35,000+ applicants (official GSSoC 2026 Contributor badge). Contributed across community open-source repositories.</div>
            </div>
          </div>
        </section>

        <!-- Projects -->
        <section class="cv-section">
          <div class="cv-section-title"><span class="cv-bullet-rect"></span>Key Projects</div>

          <!-- AIMS -->
          <div class="cv-row cv-project-row">
            <div class="cv-col-date">Jul – Nov 2026</div>
            <div class="cv-col-content">
              <div class="cv-item-title">
                <strong>AIMS — Autonomous Inventory &amp; Demand Intelligence Platform</strong>, <span class="cv-badge-cat">Full-Stack &amp; Applied ML</span>
                <span class="cv-links-group">
                  <a href="https://github.com/SAMJOD07-devz" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </span>
              </div>
              <div class="cv-item-summary">Full-stack inventory management system combining a 3NF normalized relational database with machine learning for demand forecasting and automated replenishment.</div>
              <ul class="cv-bullet-list">
                <li>Designed a 3NF schema with 11 entities, foreign keys, cascade rules, and CHECK constraints with double-entry ledger semantics.</li>
                <li>Built SQL views for aggregations and a trigger (<code>trg_stock_level_alert</code>) automatically dispatching reorder alerts.</li>
                <li>Queried 913,000 real sales records (Kaggle dataset); integrated scikit-learn regression for forecasting and K-Means ABC clustering.</li>
              </ul>
              <div class="cv-stack-line"><strong>Stack:</strong> SQL, 3NF Database Design, Scikit-Learn, K-Means, React, PostgreSQL, Docker</div>
            </div>
          </div>

          <!-- SoundChain -->
          <div class="cv-row cv-project-row">
            <div class="cv-col-date">Jul – Oct 2026</div>
            <div class="cv-col-content">
              <div class="cv-item-title">
                <strong>SoundChain — Blockchain Music Royalty Platform</strong>, <span class="cv-badge-cat">Blockchain &amp; Web3</span>
                <span class="cv-links-group">
                  <a href="https://github.com/SAMJOD07-devz/SoundChain-Blockchain" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </span>
              </div>
              <div class="cv-item-summary">Ethereum-based music royalty settlement platform automating splits via Solidity smart contracts and 10,000 BPS revenue distribution.</div>
              <ul class="cv-bullet-list">
                <li>Authored Solidity 0.8.20 smart contracts supporting instant dual payouts in ETH and USDC stablecoin.</li>
                <li>Built a Listen-to-Earn ERC-20 utility token ($LSTN) with ECDSA signature verification, anti-bot replay protection, and capped supply.</li>
                <li>Integrated 3D vinyl visualizer in Three.js/React Three Fiber with Web Audio API, IndexedDB storage, and 18 passing Hardhat tests.</li>
              </ul>
              <div class="cv-stack-line"><strong>Stack:</strong> Solidity 0.8.20, Ethereum, Hardhat, React 18, Ethers.js v6, Three.js / R3F, Web Audio API, IndexedDB</div>
            </div>
          </div>

          <!-- iNHV -->
          <div class="cv-row cv-project-row">
            <div class="cv-col-date">2026</div>
            <div class="cv-col-content">
              <div class="cv-item-title">
                <strong>iNHV — Indian National Health Vault</strong>, <span class="cv-badge-cat">Applied AI &amp; Healthcare</span>
                <span class="cv-links-group">
                  <a href="https://national-health-vault-mu.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
                  <a href="https://github.com/SAMJOD07-devz/National-Health-Vault" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </span>
              </div>
              <div class="cv-item-summary">Aadhaar-verified medical records architecture developed for Google Gemma Hackathon ('Intelligence with Purpose' track; Google Participation Certificate).</div>
              <ul class="cv-bullet-list">
                <li>Integrated Google Gemma 4 function calling to extract diagnosis, medication, and dosage from unstructured doctor notes.</li>
                <li>Built AI-driven safety cross-checks against patient allergy histories and drug interactions before record commit.</li>
                <li>Deployed RAG chatbot allowing patients to query verified history in plain language with strict clinical decision-support boundaries.</li>
              </ul>
              <div class="cv-stack-line"><strong>Stack:</strong> Google Gemma 4, Function Calling, Clinical RAG, Healthcare AI, TypeScript, SQL, AES-256</div>
            </div>
          </div>

          <!-- OrbitCheck -->
          <div class="cv-row cv-project-row">
            <div class="cv-col-date">2026</div>
            <div class="cv-col-content">
              <div class="cv-item-title">
                <strong>Event Management — OrbitCheck</strong>, <span class="cv-badge-cat">Full-Stack &amp; Event OS</span>
                <span class="cv-links-group">
                  <a href="https://mic-project-vtcs-2.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
                  <a href="https://github.com/SAMJOD07-devz/MIC-PROJECT" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </span>
              </div>
              <div class="cv-item-summary">Real-time campus event operating system and automated gate check-in platform engineered for Microsoft Innovations Club (MIC) @ VIT Chennai.</div>
              <ul class="cv-bullet-list">
                <li>Engineered an automated webcam frame scanner using client-side canvas decoding with real-time database state synchronization.</li>
                <li>Achieved sub-2-second check-in speed, 3-second live metrics sync, and cryptographically signed 2D QR passes.</li>
              </ul>
              <div class="cv-stack-line"><strong>Stack:</strong> TypeScript, React/Next.js, Webcam QR Scanner, SQL, Real-Time Sync</div>
            </div>
          </div>
        </section>

        <!-- Competitive Programming & Stats -->
        <section class="cv-section">
          <div class="cv-section-title"><span class="cv-bullet-rect"></span>Competitive Programming &amp; Coding Consistency</div>
          <div class="cv-row">
            <div class="cv-col-date">LeetCode Track</div>
            <div class="cv-col-content">
              <div class="cv-item-desc"><strong>200+ Problems Solved</strong> (91 Easy, 80 Medium, 29 Hard) • <strong>1,440 Contest Rating</strong> (4 Contests) • <strong>85-Day Max Continuous Streak</strong> • 129 Active Days • 303 Submissions in Past Year • <strong>5 Badges</strong> (including 100 Days Badge 2026 &amp; DCC August 2026 Badge).</div>
            </div>
          </div>
        </section>

        <!-- Technical Skills -->
        <section class="cv-section">
          <div class="cv-section-title"><span class="cv-bullet-rect"></span>Technical Skills</div>
          <div class="cv-row cv-skills-row">
            <div class="cv-col-date cv-skill-label">Languages</div>
            <div class="cv-col-content cv-skill-val">Python, C, C++, JavaScript (ES6+ / Vanilla), SQL, Solidity 0.8.20, Java (OOPs)</div>
          </div>
          <div class="cv-row cv-skills-row">
            <div class="cv-col-date cv-skill-label">Frontend</div>
            <div class="cv-col-content cv-skill-val">React.js (React 18), Vite, Tailwind CSS, Three.js, React Three Fiber (R3F), HTML5 Canvas, CSS Design Tokens</div>
          </div>
          <div class="cv-row cv-skills-row">
            <div class="cv-col-date cv-skill-label">Backend &amp; DB</div>
            <div class="cv-col-content cv-skill-val">SQL (3NF Schema Design, Triggers, Views), PostgreSQL (Supabase), Node.js, Express, REST APIs, JWT, bcrypt, RBAC</div>
          </div>
          <div class="cv-row cv-skills-row">
            <div class="cv-col-date cv-skill-label">AI &amp; Web3</div>
            <div class="cv-col-content cv-skill-val">Google Gemma 4 Function Calling, Clinical RAG, scikit-learn, K-Means Clustering, Hardhat, Ethers.js v6, MetaMask, Web Audio API, Docker</div>
          </div>
        </section>
      </div>
    `;
  }

  openCaseStudy(projectId) {
    const project = profileData.projects.find(p => p.id === projectId);
    if (!project) return;

    const modalBody = document.getElementById('modal-dynamic-content');
    const backdrop = document.getElementById('case-study-modal');
    if (!modalBody || !backdrop) return;

    modalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div>
          <span style="font-family: var(--font-tech); font-size: 0.78rem; color: ${project.accentColor}; text-transform: uppercase; letter-spacing: 0.1em;">${project.category} • ${project.year}</span>
          <h2 style="font-family: var(--font-display); font-size: 2.2rem; font-weight: 800; color: var(--text-white); margin-top: 0.35rem; line-height: 1.1;">${project.title}</h2>
          <p style="font-size: 1.1rem; color: var(--text-muted); margin-top: 0.75rem; line-height: 1.5;">${project.tagline}</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 1.5rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-glass); border-radius: var(--radius-md);">
          ${project.stats ? project.stats.map(s => `
            <div>
              <div style="font-family: var(--font-display); font-size: 1.5rem; font-weight: 700; color: var(--text-white);">${s.value}</div>
              <div style="font-family: var(--font-tech); font-size: 0.75rem; color: var(--text-muted);">${s.label}</div>
            </div>
          `).join('') : ''}
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem; font-size: 0.98rem; line-height: 1.7; color: var(--text-offwhite);">
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">The Problem &amp; Context</h4>
            <p style="color: var(--text-muted);">${project.caseStudy.challenge}</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">Architecture &amp; Implementation</h4>
            <p style="color: var(--text-muted);">${project.caseStudy.solution}</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">Key Impact &amp; Learnings</h4>
            <p style="color: var(--text-muted);">${project.caseStudy.outcome}</p>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${project.tags.map(t => `<span class="project-tag-item" style="padding: 0.35rem 0.75rem;">${t}</span>`).join('')}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;">
            ${project.liveUrl && project.liveUrl !== '#' ? `
              <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-spatial-primary" style="padding: 0.65rem 1.25rem; font-size: 0.8rem; background: var(--accent); color: #fff; border: 1px solid var(--accent); border-radius: var(--r-full); display: inline-flex; align-items: center; gap: 0.45rem; text-decoration: none; font-weight: 600;">
                <span>Launch Live App</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            ` : ''}
            ${project.githubUrl ? `
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-spatial-ghost" style="padding: 0.65rem 1.2rem; font-size: 0.8rem; border: 1px solid var(--border-glass); border-radius: var(--r-full); display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-primary); text-decoration: none;">
                <span>Source Code</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    backdrop.classList.add('open');
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('sender-name');
      const emailInput = document.getElementById('sender-email');
      const messageInput = document.getElementById('sender-message');

      const name = nameInput ? nameInput.value.trim() : '';
      const senderEmail = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Opening Mail...</span>';
        submitBtn.disabled = true;
      }

      const targetEmail = profileData.personal?.email || 'saumyapandyaartist@gmail.com';
      const subject = encodeURIComponent(`Portfolio Message from ${name || 'Collaborator'}`);
      const body = encodeURIComponent(
        `Hi Saumya,\n\n` +
        `Name: ${name}\n` +
        `Email: ${senderEmail}\n\n` +
        `Message:\n${message}\n\n` +
        `---\nSent via Saumya Pandya Spatial Portfolio`
      );

      const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        const mailLink = document.createElement('a');
        mailLink.href = mailtoUrl;
        mailLink.target = '_blank';
        mailLink.rel = 'noopener noreferrer';
        document.body.appendChild(mailLink);
        mailLink.click();
        document.body.removeChild(mailLink);

        this.showToast('Opening your email app with pre-filled message!');
        form.reset();

        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 400);
    });
  }

  showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }


  setupWelcomeEntrance() {
    const entrance = document.getElementById('welcome-entrance');
    const line1El = document.getElementById('typewriter-line-1');
    const line2El = document.getElementById('typewriter-line-2');
    const actionEl = document.getElementById('welcome-action');
    const enterBtn = document.getElementById('welcome-enter-btn');
    const skipBtn = document.getElementById('welcome-skip-btn');
    const replayBtn = document.getElementById('replay-intro-btn');

    if (!entrance || !line1El || !line2El) return;

    // Show entrance only once per session to reduce friction
    const hasSeenWelcome = sessionStorage.getItem('portfolio_welcome_seen');
    if (hasSeenWelcome) {
      entrance.classList.add('welcome-hidden');
      document.body.style.overflow = '';
      return;
    }

    let autoEnterTimer = null;
    let isExiting = false;

    const closeEntrance = () => {
      if (isExiting) return;
      isExiting = true;
      clearTimeout(autoEnterTimer);
      sessionStorage.setItem('portfolio_welcome_seen', 'true');

      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      entrance.classList.add('welcome-exiting');
      document.body.style.overflow = '';

      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        entrance.classList.add('welcome-hidden');
        entrance.classList.remove('welcome-exiting');
        if (this.tiltEngine) {
          this.tiltEngine.init();
        }
      }, 750);
    };

    const typeText = (text, element, speed = 42) => {
      return new Promise((resolve) => {
        let index = 0;
        element.innerHTML = '<span class="cursor-caret">|</span>';

        const interval = setInterval(() => {
          if (index < text.length) {
            const current = text.substring(0, index + 1);
            element.innerHTML = `${current}<span class="cursor-caret">|</span>`;
            index++;
          } else {
            clearInterval(interval);
            resolve();
          }
        }, speed);
      });
    };

    const runSequence = async () => {
      isExiting = false;
      clearTimeout(autoEnterTimer);
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      entrance.classList.remove('welcome-hidden', 'welcome-exiting');
      document.body.style.overflow = 'hidden';
      line1El.innerHTML = '';
      line2El.innerHTML = '';
      if (actionEl) actionEl.classList.remove('visible');

      // Brief pause before typing
      await new Promise(r => setTimeout(r, 400));
      if (isExiting) return;

      // Type line 1: "Saumya Pandya welcomes you"
      await typeText('Saumya Pandya welcomes you', line1El, 42);
      if (isExiting) return;
      line1El.innerHTML = 'Saumya Pandya welcomes you';

      await new Promise(r => setTimeout(r, 280));
      if (isExiting) return;

      // Type line 2: "I code, therefore I am."
      await typeText('I code, therefore I am.', line2El, 46);
      if (isExiting) return;

      // Reveal action button
      if (actionEl) {
        actionEl.classList.add('visible');
      }
      autoEnterTimer = setTimeout(() => {
        closeEntrance();
      }, 3500);
    };

    if (enterBtn) {
      enterBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeEntrance();
      });
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeEntrance();
      });
    }

    entrance.addEventListener('click', () => {
      closeEntrance();
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.scrollTo({ top: 0, behavior: 'instant' });
        runSequence();
      });
    }

    window.addEventListener('keydown', (e) => {
      if (entrance && !entrance.classList.contains('welcome-hidden') && !entrance.classList.contains('welcome-exiting')) {
        if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter' || e.key === 'Escape' || e.code === 'Space') {
          closeEntrance();
        }
      }
    });

    runSequence();
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new SpatialPortfolioApp();
});
