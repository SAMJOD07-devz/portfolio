/**
 * projects-page.js — Orchestrator for the Dedicated All Projects Archive Page
 * Handles search, category filtering, multi-select tech tags, sorting, view mode,
 * URL query synchronization, 3D tilt, and case study modals.
 */

import { projectsData } from '../data/projects.js';
import { profileData } from '../data/profile.js';
import { renderProjectCard } from './project-card.js';
import { TiltParallaxEngine } from './tilt-parallax.js';
import { SpatialCanvasEngine } from './spatial-canvas.js';
import { CommandPalette } from './command-palette.js';

class ProjectsPageController {
  constructor() {
    this.projects = projectsData;
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.selectedTechs = new Set();
    this.sortMode = 'featured';
    this.viewMode = localStorage.getItem('portfolio_view_mode') || 'grid';
    this.tiltEngine = null;

    this.init();
  }

  init() {
    // 1. Initialize Canvas Background
    this.canvasEngine = new SpatialCanvasEngine('spatial-canvas');

    // 2. Read URL Parameters
    this.parseUrlParams();

    // 3. Setup Theme & Accents
    this.setupTheme();
    this.setupAccents();

    // 4. Render Filter Bars
    this.renderCategoryChips();
    this.renderTechChips();

    // 5. Setup Toolbar Listeners
    this.setupToolbarListeners();

    // 6. Setup Modals & Utilities
    this.setupCaseStudyModal();
    this.setupResumeModal();
    this.setupBackToTop();
    this.setupScrollProgressBar();
    this.setupCardGlowEffect();
    this.commandPalette = new CommandPalette();

    // 7. Initial Filter & Render
    this.applyViewMode(this.viewMode, false);
    this.applyFiltersAndRender(false);

    // 8. Initialize 3D Card Tilt Engine
    this.tiltEngine = new TiltParallaxEngine();
  }

  parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('q')) {
      this.searchQuery = params.get('q').trim();
      const input = document.getElementById('archive-search-input');
      if (input) input.value = this.searchQuery;
    }
    if (params.has('category')) {
      this.activeCategory = params.get('category').trim();
    }
    if (params.has('tech')) {
      const techs = params.get('tech').split(',').map(t => t.trim()).filter(Boolean);
      techs.forEach(t => this.selectedTechs.add(t));
    }
    if (params.has('sort')) {
      this.sortMode = params.get('sort').trim();
      const select = document.getElementById('archive-sort-select');
      if (select) select.value = this.sortMode;
    }
    if (params.has('view')) {
      const v = params.get('view').trim();
      if (v === 'grid' || v === 'list') {
        this.viewMode = v;
      }
    }
  }

  syncUrlParams() {
    const params = new URLSearchParams();
    if (this.searchQuery) params.set('q', this.searchQuery);
    if (this.activeCategory && this.activeCategory !== 'all') params.set('category', this.activeCategory);
    if (this.selectedTechs.size > 0) params.set('tech', Array.from(this.selectedTechs).join(','));
    if (this.sortMode && this.sortMode !== 'featured') params.set('sort', this.sortMode);
    if (this.viewMode && this.viewMode !== 'grid') params.set('view', this.viewMode);

    const queryStr = params.toString();
    const newUrl = queryStr ? `${window.location.pathname}?${queryStr}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }

  renderCategoryChips() {
    const bar = document.getElementById('archive-categories-bar');
    if (!bar) return;

    const categories = ['all', ...new Set(this.projects.map(p => p.category))];
    bar.innerHTML = categories.map(cat => `
      <button class="filter-btn ${cat === this.activeCategory ? 'active' : ''}" 
              data-category="${cat}"
              role="tab"
              aria-selected="${cat === this.activeCategory}">
        ${cat === 'all' ? 'All Works' : cat}
      </button>
    `).join('');

    bar.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        bar.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        e.currentTarget.classList.add('active');
        e.currentTarget.setAttribute('aria-selected', 'true');
        this.activeCategory = e.currentTarget.getAttribute('data-category');
        this.applyFiltersAndRender(true);
      });
    });
  }

  renderTechChips() {
    const container = document.getElementById('tech-filter-chips');
    if (!container) return;

    // Aggregate top technologies
    const techCounts = {};
    this.projects.forEach(p => {
      (p.tech || p.tags || []).forEach(t => {
        techCounts[t] = (techCounts[t] || 0) + 1;
      });
    });

    // Sort by frequency, take top 10 popular tags
    const popularTechs = Object.keys(techCounts)
      .sort((a, b) => techCounts[b] - techCounts[a])
      .slice(0, 10);

    container.innerHTML = popularTechs.map(tech => `
      <button class="tech-chip-toggle ${this.selectedTechs.has(tech) ? 'selected' : ''}" 
              data-tech="${tech}" 
              aria-pressed="${this.selectedTechs.has(tech)}">
        <span>${tech}</span>
        <span class="tech-count">${techCounts[tech]}</span>
      </button>
    `).join('');

    container.querySelectorAll('.tech-chip-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tech = e.currentTarget.getAttribute('data-tech');
        if (this.selectedTechs.has(tech)) {
          this.selectedTechs.delete(tech);
          e.currentTarget.classList.remove('selected');
          e.currentTarget.setAttribute('aria-pressed', 'false');
        } else {
          this.selectedTechs.add(tech);
          e.currentTarget.classList.add('selected');
          e.currentTarget.setAttribute('aria-pressed', 'true');
        }
        this.applyFiltersAndRender(true);
      });
    });
  }

  setupToolbarListeners() {
    // Search input
    const searchInput = document.getElementById('archive-search-input');
    const searchClear = document.getElementById('search-clear-btn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim();
        if (searchClear) searchClear.style.display = this.searchQuery ? 'block' : 'none';
        this.applyFiltersAndRender(true);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        searchClear.style.display = 'none';
        this.applyFiltersAndRender(true);
      });
    }

    // Sort select
    const sortSelect = document.getElementById('archive-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortMode = e.target.value;
        this.applyFiltersAndRender(true);
      });
    }

    // View mode toggle
    const gridBtn = document.getElementById('view-mode-grid');
    const listBtn = document.getElementById('view-mode-list');
    if (gridBtn && listBtn) {
      gridBtn.addEventListener('click', () => this.applyViewMode('grid', true));
      listBtn.addEventListener('click', () => this.applyViewMode('list', true));
    }

    // Clear all filters
    const clearAllBtn = document.getElementById('clear-all-filters-btn');
    const emptyResetBtn = document.getElementById('empty-reset-btn');
    const resetAction = () => {
      this.searchQuery = '';
      this.activeCategory = 'all';
      this.selectedTechs.clear();
      this.sortMode = 'featured';

      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      if (sortSelect) sortSelect.value = 'featured';

      const catBar = document.getElementById('archive-categories-bar');
      if (catBar) {
        catBar.querySelectorAll('.filter-btn').forEach(b => {
          const isAll = b.getAttribute('data-category') === 'all';
          b.classList.toggle('active', isAll);
          b.setAttribute('aria-selected', isAll ? 'true' : 'false');
        });
      }

      const techContainer = document.getElementById('tech-filter-chips');
      if (techContainer) {
        techContainer.querySelectorAll('.tech-chip-toggle').forEach(b => {
          b.classList.remove('selected');
          b.setAttribute('aria-pressed', 'false');
        });
      }

      this.applyFiltersAndRender(true);
    };

    if (clearAllBtn) clearAllBtn.addEventListener('click', resetAction);
    if (emptyResetBtn) emptyResetBtn.addEventListener('click', resetAction);
  }

  applyViewMode(mode, sync = true) {
    this.viewMode = mode;
    localStorage.setItem('portfolio_view_mode', mode);

    const container = document.getElementById('archive-projects-container');
    const gridBtn = document.getElementById('view-mode-grid');
    const listBtn = document.getElementById('view-mode-list');

    if (container) {
      container.className = mode === 'list' 
        ? 'archive-projects-list view-mode-list' 
        : 'archive-projects-grid view-mode-grid';
    }

    if (gridBtn && listBtn) {
      gridBtn.classList.toggle('active', mode === 'grid');
      gridBtn.setAttribute('aria-pressed', mode === 'grid' ? 'true' : 'false');
      listBtn.classList.toggle('active', mode === 'list');
      listBtn.setAttribute('aria-pressed', mode === 'list' ? 'true' : 'false');
    }

    if (sync) {
      this.syncUrlParams();
      this.applyFiltersAndRender(false);
    }
  }

  applyFiltersAndRender(sync = true) {
    if (sync) this.syncUrlParams();

    let filtered = [...this.projects];

    // 1. Category Filter
    if (this.activeCategory && this.activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.activeCategory);
    }

    // 2. Search Query Filter
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(q);
        const taglineMatch = (p.tagline || '').toLowerCase().includes(q);
        const descMatch = (p.description || '').toLowerCase().includes(q);
        const techMatch = (p.tech || p.tags || []).some(t => t.toLowerCase().includes(q));
        const impactMatch = (p.impact || '').toLowerCase().includes(q);
        return titleMatch || taglineMatch || descMatch || techMatch || impactMatch;
      });
    }

    // 3. Multi-Select Tech Filter
    if (this.selectedTechs.size > 0) {
      filtered = filtered.filter(p => {
        const projectTechs = p.tech || p.tags || [];
        // Match if project contains any of the selected tech tags
        return Array.from(this.selectedTechs).some(selected => projectTechs.includes(selected));
      });
    }

    // 4. Sorting
    if (this.sortMode === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (this.sortMode === 'newest') {
      filtered.sort((a, b) => parseInt(b.year, 10) - parseInt(a.year, 10));
    } else if (this.sortMode === 'alpha') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // 5. Update Results Counter & Clear Action
    const counter = document.getElementById('archive-results-count');
    if (counter) {
      counter.textContent = `Showing ${filtered.length} of ${this.projects.length} projects`;
    }

    const clearAllBtn = document.getElementById('clear-all-filters-btn');
    const isFiltered = this.searchQuery !== '' || this.activeCategory !== 'all' || this.selectedTechs.size > 0 || this.sortMode !== 'featured';
    if (clearAllBtn) {
      clearAllBtn.style.display = isFiltered ? 'inline-block' : 'none';
    }

    // 6. Render Container or Empty State
    const container = document.getElementById('archive-projects-container');
    const emptyState = document.getElementById('archive-empty-state');

    if (!container) return;

    if (filtered.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    container.innerHTML = filtered.map(p => 
      renderProjectCard(p, { viewMode: this.viewMode, isCarousel: false })
    ).join('');

    // Attach click listeners for case study modal
    container.querySelectorAll('[data-project-id]').forEach(card => {
      card.addEventListener('click', (e) => {
        // If clicking an explicit anchor link or button, don't trigger modal
        if (e.target.closest('a') && !e.target.closest('[data-action="case-study"]')) {
          return;
        }
        const id = card.getAttribute('data-project-id');
        this.openCaseStudy(id);
      });

      // Handle keyboard Enter / Space on card
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
  }

  openCaseStudy(projectId) {
    const project = this.projects.find(p => p.id === projectId);
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

        ${project.impact ? `
          <div style="padding: 0.85rem 1.25rem; background: var(--bg-card); border: 1px solid var(--accent); border-radius: var(--r-md); display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 1.2rem;">⚡</span>
            <span style="font-family: var(--font-mono); font-size: 0.9rem; font-weight: 600; color: var(--text-white);">${project.impact}</span>
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; padding: 1.5rem; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--r-md);">
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">The Problem &amp; Context</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${project.caseStudy.challenge}</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">Architecture &amp; Implementation</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${project.caseStudy.solution}</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">Key Impact &amp; Learnings</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${project.caseStudy.outcome}</p>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${(project.tech || project.tags || []).map(t => `<span class="project-tag-item" style="padding: 0.35rem 0.75rem;">${t}</span>`).join('')}
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
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-spatial-secondary" style="padding: 0.65rem 1.25rem; font-size: 0.8rem; border-radius: var(--r-full); display: inline-flex; align-items: center; gap: 0.45rem; text-decoration: none;">
                <span>View Source Code</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
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
    document.body.style.overflow = 'hidden';
  }

  setupCaseStudyModal() {
    const backdrop = document.getElementById('case-study-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (!backdrop || !closeBtn) return;

    const closeModal = () => {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        closeModal();
      }
    });
  }

  setupResumeModal() {
    const resumeBtn = document.getElementById('nav-resume-btn');
    const backdrop = document.getElementById('resume-modal');
    const closeBtn = document.getElementById('resume-close-btn');
    const modalBody = document.getElementById('resume-modal-body');
    if (!backdrop || !closeBtn) return;

    const openResume = () => {
      if (modalBody && profileData.personal) {
        const { personal } = profileData;
        modalBody.innerHTML = `
          <div class="resume-sheet-inner">
            <header class="resume-header-block">
              <h2 class="resume-name-title">${personal.name}</h2>
              <div class="resume-headline">${personal.title}</div>
              <div class="resume-contact-row">
                <span>${personal.location}</span>
                <span>•</span>
                <a href="mailto:${personal.email}">${personal.email}</a>
                <span>•</span>
                <span>${personal.phone}</span>
                <span>•</span>
                <a href="https://github.com/SAMJOD07-devz" target="_blank" rel="noopener">GitHub</a>
                <span>•</span>
                <a href="https://www.linkedin.com/in/saumya-pandya-5a0376369/" target="_blank" rel="noopener">LinkedIn</a>
              </div>
            </header>

            <section class="resume-section-item">
              <h4 class="resume-section-title">Academic Education</h4>
              <div class="resume-entry">
                <div class="resume-entry-top">
                  <strong>B.Tech in Computer Science and Engineering</strong>
                  <span>2025 – 2029 (Expected)</span>
                </div>
                <div class="resume-institution">Vellore Institute of Technology, Chennai • CGPA: 8.53 / 10.0</div>
              </div>
            </section>

            <section class="resume-section-item">
              <h4 class="resume-section-title">Professional Experience &amp; Open Source</h4>
              ${profileData.experience.map(e => `
                <div class="resume-entry" style="margin-bottom: 0.75rem;">
                  <div class="resume-entry-top">
                    <strong>${e.role} — ${e.company}</strong>
                    <span>${e.period}</span>
                  </div>
                  <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">${e.description}</p>
                </div>
              `).join('')}
            </section>

            <section class="resume-section-item">
              <h4 class="resume-section-title">Selected Production Systems</h4>
              ${this.projects.slice(0, 4).map(p => `
                <div class="resume-entry" style="margin-bottom: 0.65rem;">
                  <div class="resume-entry-top">
                    <strong>${p.title}</strong>
                    <span>${p.year}</span>
                  </div>
                  <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.15rem;">${p.description}</p>
                  <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent); margin-top: 0.2rem;">
                    Tech: ${(p.tech || p.tags || []).join(', ')}
                  </div>
                </div>
              `).join('')}
            </section>
          </div>
        `;
      }
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeResume = () => {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (resumeBtn) resumeBtn.addEventListener('click', openResume);
    closeBtn.addEventListener('click', closeResume);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeResume();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('open')) closeResume();
    });
  }

  setupTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    const savedTheme = localStorage.getItem('portfolio_theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const setTheme = (theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
      } else {
        document.documentElement.classList.remove('dark');
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
      }
      localStorage.setItem('portfolio_theme', theme);
    };

    setTheme(savedTheme);

    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
      });
    }
  }

  setupAccents() {
    const savedAccent = localStorage.getItem('portfolio_accent') || 'amber';
    document.documentElement.setAttribute('data-accent', savedAccent);

    const picker = document.getElementById('accent-palette-picker');
    if (!picker) return;

    const accents = profileData.themeAccents || [
      { id: "amber", name: "Solar Amber", color: "#d97706" },
      { id: "coral", name: "Radiant Coral", color: "#e04b2a" },
      { id: "sage", name: "Hyper Sage", color: "#0d9468" },
      { id: "aurora", name: "Astral Violet", color: "#7c3aed" }
    ];

    picker.innerHTML = accents.map(acc => `
      <button class="accent-dot ${acc.id === savedAccent ? 'active' : ''}" 
              data-accent-id="${acc.id}" 
              style="background-color: ${acc.color};" 
              title="${acc.name}" 
              aria-label="Set accent to ${acc.name}">
      </button>
    `).join('');

    picker.querySelectorAll('.accent-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        const id = dot.getAttribute('data-accent-id');
        document.documentElement.setAttribute('data-accent', id);
        localStorage.setItem('portfolio_accent', id);
        picker.querySelectorAll('.accent-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
  }

  setupBackToTop() {
    const btn = document.getElementById('back-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
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
    const attachGlow = () => {
      const cards = document.querySelectorAll('.project-card-3d, .project-card-row');
      cards.forEach(card => {
        card.addEventListener('pointermove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    };
    attachGlow();
  }
}

// Instantiate on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new ProjectsPageController();
});
