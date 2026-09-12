import { profileData } from '../data/profile.js';
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

    // 1. Initialize Subsystems
    this.canvasEngine = new SpatialCanvasEngine('spatial-canvas');

    // 2. Hydrate Dynamic DOM from Profile Data
    this.hydrateProfile();
    this.renderProjects();
    this.renderCapabilities();
    this.renderTechStack();
    this.renderExperience();
    this.renderPrinciples();
    this.renderPresenceHub();
    this.renderSocialLinks();

    // 3. Initialize Interactive Features
    this.setupWelcomeEntrance();
    this.setupScrollReveal();
    this.setupThemeAccentSwitcher();
    this.setupPhotoDeck();
    this.setupNavigationObserver();
    this.setupEmailCopy();
    this.setupCaseStudyModal();
    this.setupContactForm();

    // 4. Initialize 3D Card Tilts and Magnetic Buttons
    this.tiltEngine = new TiltParallaxEngine();
  }

  hydrateProfile() {
    const { personal } = profileData;

    // Header & Meta
    const brandName = document.getElementById('nav-brand-name');
    if (brandName) brandName.textContent = personal.name;

    const heroStatus = document.getElementById('hero-status-text');
    if (heroStatus) heroStatus.textContent = `${personal.statusBadge} • ${personal.availability}`;

    // Hero title: use two-line serif + display-weight editorial treatment
    const heroName = document.getElementById('hero-personal-name');
    if (heroName && personal.name) {
      const parts = personal.name.split(' ');
      const first = parts[0];
      const rest  = parts.slice(1).join(' ');
      heroName.innerHTML = `<span class="title-editorial">${first}</span><span class="title-accent">${rest}</span>`;
    }

    // Hero tagline — keep the updated static text, only overwrite if profile has a specific tagline
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
      bioContainer.innerHTML = `
        <p class="bio-lead-text">${personal.bioParagraphs[0]}</p>
        ${personal.bioParagraphs.slice(1).map(p => `<p class="bio-body-text">${p}</p>`).join('')}
      `;
    }

    // Hero & About Portraits
    const heroImg1 = document.getElementById('hero-portrait-img-1');
    if (heroImg1 && personal.avatarUrl) {
      heroImg1.src = personal.avatarUrl;
    }

    const heroImg2 = document.getElementById('hero-portrait-img-2');
    if (heroImg2 && personal.secondaryAvatarUrl) {
      heroImg2.src = personal.secondaryAvatarUrl;
    }

    const aboutImg = document.getElementById('about-portrait-img');
    if (aboutImg && personal.secondaryAvatarUrl) {
      aboutImg.src = personal.secondaryAvatarUrl;
    }

    const photoName = document.getElementById('photo-caption-name');
    if (photoName) photoName.textContent = personal.name;

    // Contact Coordinates
    const contactEmail = document.getElementById('contact-email-text');
    if (contactEmail) contactEmail.textContent = personal.email;

    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
  }

  setupPhotoDeck() {
    const stage = document.getElementById('hero-photo-stage');
    const swapBtn = document.getElementById('photo-swap-btn');
    const secondaryCard = document.getElementById('photo-card-secondary');
    if (!stage) return;

    const toggleSwap = (e) => {
      if (e) e.stopPropagation();
      stage.classList.toggle('swapped');
      
      const indexTag = stage.querySelector('.photo-index-tag');
      if (indexTag) {
        indexTag.textContent = stage.classList.contains('swapped') ? '02 / 02' : '01 / 02';
      }

      if (this.tiltEngine) {
        this.tiltEngine.refresh();
      }
    };

    if (swapBtn) {
      swapBtn.addEventListener('click', toggleSwap);
    }

    if (secondaryCard) {
      secondaryCard.addEventListener('click', toggleSwap);
    }
  }

  renderProjects() {
    const grid = document.getElementById('projects-grid');
    const filterContainer = document.getElementById('work-filter-bar');
    if (!grid) return;

    // Extract unique categories
    const categories = ['all', ...new Set(profileData.projects.map(p => p.category))];

    if (filterContainer) {
      filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === this.activeFilter ? 'active' : ''}" data-filter="${cat}">
          ${cat === 'all' ? 'All Works' : cat}
        </button>
      `).join('');

      filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.activeFilter = e.currentTarget.getAttribute('data-filter');
          filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          this.renderProjectsList();
        });
      });
    }

    this.renderProjectsList();
  }

  renderProjectsList() {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered = this.activeFilter === 'all' 
      ? profileData.projects 
      : profileData.projects.filter(p => p.category === this.activeFilter);

    grid.innerHTML = filtered.map(p => `
      <article class="project-card-3d" data-tilt data-tilt-max="9" data-project-id="${p.id}">
        <div class="project-card-glare"></div>
        <div class="project-preview-frame">
          <div class="project-dynamic-canvas">
            <div class="spatial-mesh-wire">
              <div class="mesh-circle mesh-circle-1" style="border-color: ${p.accentColor}"></div>
              <div class="mesh-circle mesh-circle-2"></div>
              <div class="mesh-circle mesh-circle-3" style="border-color: ${p.accentColor}"></div>
            </div>
          </div>
          <span class="project-badge-corner" style="color: ${p.accentColor}">${p.category}</span>
          <span class="project-year-corner">${p.year}</span>
        </div>
        <div class="project-content-body">
          <div class="project-title-row">
            <h3 class="project-card-title">${p.title}</h3>
            <svg class="project-card-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
          <p class="project-tagline">${p.tagline}</p>
          <div class="project-tags-list">
            ${p.tags.map(t => `<span class="project-tag-item">${t}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    // Reattach card event listeners
    grid.querySelectorAll('.project-card-3d').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        this.openCaseStudy(id);
      });
    });

    if (this.tiltEngine) {
      this.tiltEngine.refresh();
    }
  }

  renderCapabilities() {
    const grid = document.getElementById('capabilities-grid');
    if (!grid) return;

    grid.innerHTML = profileData.capabilities.map(cap => `
      <div class="capability-card" data-tilt data-tilt-max="6">
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

  renderPresenceHub() {
    const grid = document.getElementById('presence-grid');
    if (!grid || !profileData.presenceHub) return;

    const { github, linkedin, leetcode, codolio } = profileData.presenceHub;

    // Generate random realistic heatmap cells for GitHub
    const heatmapLevels = ['', 'lvl-1', 'lvl-2', 'lvl-3', '', 'lvl-1', 'lvl-2', '', 'lvl-1'];
    let heatmapHtml = '';
    for (let i = 0; i < 60; i++) {
      const lvl = heatmapLevels[Math.floor(Math.random() * heatmapLevels.length)];
      heatmapHtml += `<div class="heatmap-cell ${lvl}" title="Activity node #${i + 1}"></div>`;
    }

    grid.innerHTML = `
      <!-- 1. GitHub Ecosystem Card -->
      <article class="presence-card" data-tilt data-tilt-max="7">
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
          ${github.stats.map(s => `
            <div class="presence-stat-box">
              <div class="presence-stat-num">${s.value}</div>
              <div class="presence-stat-lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="github-heatmap-wrap">
          <div class="heatmap-label">
            <span>Contribution Heatmap</span>
            <span>Active Repositories</span>
          </div>
          <div class="heatmap-grid">
            ${heatmapHtml}
          </div>
        </div>

        <div class="featured-repos-list">
          ${github.featuredRepos.map(r => `
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

      <!-- 2. LeetCode Problem Solving Card -->
      <article class="presence-card" data-tilt data-tilt-max="7">
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
          ${leetcode.stats.map(s => `
            <div class="presence-stat-box">
              <div class="presence-stat-num" style="${s.label.includes('Streak') ? 'color: #e04b2a; font-size: 1.25rem;' : ''}">${s.value}</div>
              <div class="presence-stat-lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <!-- LeetCode Heatmap Matrix -->
        <div class="leetcode-heatmap-wrap">
          <div class="leetcode-heatmap-label">
            <span>LeetCode Submission Heatmap</span>
            <span style="color: #00b8a3; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;"><span style="width: 6px; height: 6px; border-radius: 50%; background: #00b8a3; display: inline-block;"></span> 63 POTD Streak Active</span>
          </div>
          <div class="leetcode-heatmap-grid">
            ${(() => {
              // Realistic LeetCode submission density based on active daily streak
              const lcLevels = ['lvl-2', 'lvl-3', 'lvl-1', 'lvl-2', 'lvl-3', 'lvl-3', 'lvl-2', 'lvl-3', 'lvl-1', 'lvl-2'];
              let html = '';
              for (let i = 0; i < 60; i++) {
                // Highlight continuous trailing streak
                const isStreakActive = i > 12;
                const lvl = isStreakActive ? lcLevels[i % lcLevels.length] : (i % 3 === 0 ? 'lvl-1' : '');
                html += `<div class="lc-cell ${lvl}" title="Active Day #${i + 1} • POTD Streak"></div>`;
              }
              return html;
            })()}
          </div>
        </div>

        <!-- LeetCode Badges Showcase -->
        <div class="leetcode-badges-wrap">
          <div class="leetcode-badges-title">Earned LeetCode Badges & Milestones</div>
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

        <!-- Difficulty Spectrum Bar -->
        <div class="leetcode-meter-wrap">
          <div class="leetcode-meter-header">
            <span>Problem Difficulty Spectrum</span>
            <span>133 Solved / 145 Subs</span>
          </div>
          <div class="leetcode-bar-track">
            <div class="leetcode-bar-seg easy" style="width: 52%;" title="Easy: 69 Solved"></div>
            <div class="leetcode-bar-seg medium" style="width: 35%;" title="Medium: 47 Solved"></div>
            <div class="leetcode-bar-seg hard" style="width: 13%;" title="Hard: 17 Solved"></div>
          </div>
          <div class="leetcode-diff-chips">
            <div class="leetcode-diff-chip">
              <span class="leetcode-dot easy"></span>
              <span>Easy: <strong>69</strong></span>
            </div>
            <div class="leetcode-diff-chip">
              <span class="leetcode-dot medium"></span>
              <span>Medium: <strong>47</strong></span>
            </div>
            <div class="leetcode-diff-chip">
              <span class="leetcode-dot hard"></span>
              <span>Hard: <strong>17</strong></span>
            </div>
          </div>
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
      <article class="presence-card" data-tilt data-tilt-max="7">
        <div class="presence-header">
          <div class="presence-identity">
            <div class="presence-platform-icon" style="color: #7c3aed;">
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
          <span class="presence-status-badge" style="color: #7c3aed; border-color: rgba(124, 58, 237, 0.25);">
            <span class="skill-bullet" style="background-color: #7c3aed;"></span>
            <span>${codolio.status}</span>
          </span>
        </div>

        <p class="presence-headline">${codolio.headline}</p>

        <div class="presence-stats-row">
          ${codolio.stats.map(s => `
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
            <span style="font-family: var(--font-tech); font-weight: 600; color: #0d9468;">Verified</span>
          </div>
          <div class="codolio-item-pill">
            <span>DSA & Algorithmic Milestones</span>
            <span style="font-family: var(--font-tech); font-weight: 600; color: #7c3aed;">Active Streaks</span>
          </div>
        </div>

        <div style="padding: 1.15rem; background: rgba(0, 0, 0, 0.025); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 1.75rem;">
          <div style="font-family: var(--font-editorial); font-size: 1.05rem; font-style: italic; color: var(--text-offwhite); line-height: 1.45;">
            "Consistently refining algorithmic problem-solving across structured platforms."
          </div>
          <div style="font-family: var(--font-tech); font-size: 0.72rem; color: var(--text-muted); margin-top: 0.4rem;">
            Profile Handle: codolio.com/profile/${codolio.username}
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

      <!-- 4. LinkedIn Network Card -->
      <article class="presence-card" data-tilt data-tilt-max="7">
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
          <span class="presence-status-badge" style="color: #0a66c2; border-color: rgba(10, 102, 194, 0.25);">
            <span class="skill-bullet" style="background-color: #0a66c2;"></span>
            <span>${linkedin.status}</span>
          </span>
        </div>

        <p class="presence-headline">${linkedin.headline}</p>

        <div class="presence-stats-row">
          ${linkedin.stats.map(s => `
            <div class="presence-stat-box">
              <div class="presence-stat-num">${s.value}</div>
              <div class="presence-stat-lbl">${s.label}</div>
            </div>
          `).join('')}
        </div>

        <div class="endorsements-wrap">
          <div class="endorsements-label">Featured Endorsements & Expertise</div>
          <div class="endorsements-pills">
            ${linkedin.endorsements.map(e => `<span class="endorsement-tag">${e}</span>`).join('')}
          </div>
        </div>

        <div style="padding: 1.15rem; background: rgba(0, 0, 0, 0.025); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); margin-bottom: 1.75rem;">
          <div style="font-family: var(--font-editorial); font-size: 1.05rem; font-style: italic; color: var(--text-offwhite); line-height: 1.45;">
            "Engineering interfaces where aesthetics, computational performance, and human psychology operate in complete harmony."
          </div>
          <div style="font-family: var(--font-tech); font-size: 0.72rem; color: var(--text-muted); margin-top: 0.4rem;">
            Saumya Pandya • B.Tech CSE Core @ VIT Chennai
          </div>
        </div>

        <a href="${linkedin.url}" target="_blank" rel="noopener noreferrer" class="presence-cta-btn" data-magnetic data-magnetic-strength="0.2">
          <span>Connect on LinkedIn</span>
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
    if (!container) return;

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
    // Add .reveal to children of section headers and cards for staggered entrance
    const revealTargets = document.querySelectorAll(
      '.section-header, .project-card-3d, .capability-card, .principle-card, ' +
      '.timeline-card, .presence-card, .about-lead-card, .about-editorial-photo-card, ' +
      '.tech-stack-container, .hero-stats-strip'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
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
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">The Challenge</h4>
            <p style="color: var(--text-muted);">${project.caseStudy.challenge}</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">Spatial Architecture & Solution</h4>
            <p style="color: var(--text-muted);">${project.caseStudy.solution}</p>
          </div>
          <div>
            <h4 style="font-family: var(--font-tech); font-size: 0.85rem; color: var(--accent); text-transform: uppercase; margin-bottom: 0.4rem;">Key Impact & Outcome</h4>
            <p style="color: var(--text-muted);">${project.caseStudy.outcome}</p>
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid var(--border-subtle);">
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${project.tags.map(t => `<span class="project-tag-item" style="padding: 0.35rem 0.75rem;">${t}</span>`).join('')}
          </div>
          ${project.githubUrl ? `
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-spatial-primary" style="padding: 0.65rem 1.25rem; font-size: 0.8rem;">
              <span>View on GitHub</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          ` : ''}
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
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Transmission';

      if (submitBtn) {
        submitBtn.innerHTML = '<span>Transmitting...</span>';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        this.showToast('Transmission received! Will respond shortly.');
        form.reset();
        if (submitBtn) {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      }, 900);
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

    let autoEnterTimer = null;
    let isExiting = false;

    const closeEntrance = () => {
      if (isExiting) return;
      isExiting = true;
      clearTimeout(autoEnterTimer);

      // Force window scroll to top on entry
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

    const typeText = (text, element, speed = 45) => {
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
      await typeText('Saumya Pandya welcomes you', line1El, 46);
      if (isExiting) return;
      line1El.innerHTML = 'Saumya Pandya welcomes you';

      await new Promise(r => setTimeout(r, 280));
      if (isExiting) return;

      // Type line 2: "ready to explore him?"
      await typeText('ready to explore him?', line2El, 50);
      if (isExiting) return;

      // Reveal action button
      if (actionEl) {
        actionEl.classList.add('visible');
      }
      // Button stays visible, waiting strictly for user to press Enter or click
    };

    // Run on every reload / page load
    runSequence();

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

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        runSequence();
      });
    }

    // Strict keyboard support: Only the 'Enter' key proceeds to the site
    window.addEventListener('keydown', (e) => {
      if (entrance && !entrance.classList.contains('welcome-hidden') && !entrance.classList.contains('welcome-exiting')) {
        if (e.key === 'Enter' || e.code === 'Enter' || e.code === 'NumpadEnter') {
          closeEntrance();
        }
      }
    });
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  new SpatialPortfolioApp();
});
