/**
 * project-card.js — Reusable Project Card Component & SVG Graphics
 * Shared by Home Page Carousel and All Projects Archive.
 */

export function getProjectGraphic(p) {
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

/**
 * Render a single project card
 * @param {Object} p Project data object
 * @param {Object} options Rendering options { viewMode: 'grid'|'list', isCarousel: boolean }
 * @returns {string} HTML string
 */
export function renderProjectCard(p, options = {}) {
  const { viewMode = 'grid', isCarousel = false } = options;
  const maxVisibleTech = 5;
  const techList = p.tech || p.tags || [];
  const visibleTech = techList.slice(0, maxVisibleTech);
  const hiddenCount = techList.length - maxVisibleTech;
  const remainingTech = hiddenCount > 0 ? techList.slice(maxVisibleTech).join(', ') : '';

  if (viewMode === 'list') {
    return `
      <article class="project-card-row" tabindex="0" role="article" data-project-id="${p.id}" aria-label="${p.title}">
        <div class="row-main-col">
          <div class="row-eyebrow">
            <span class="row-category" style="color: ${p.accentColor}">${p.category}</span>
            <span class="row-sep">•</span>
            <span class="row-year">${p.year}</span>
            ${p.featured ? '<span class="row-featured-badge">Featured</span>' : ''}
          </div>
          <h3 class="row-title">${p.title}</h3>
          <p class="row-tagline">${p.tagline}</p>
          ${p.impact ? `
            <div class="row-impact">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              <span>${p.impact}</span>
            </div>
          ` : ''}
        </div>

        <div class="row-meta-col">
          <div class="row-tags">
            ${visibleTech.map(t => `<span class="project-tag-item">${t}</span>`).join('')}
            ${hiddenCount > 0 ? `<span class="project-tag-item tag-more" title="${remainingTech}">+${hiddenCount}</span>` : ''}
          </div>
          <div class="row-actions">
            ${p.liveUrl && p.liveUrl !== '#' ? `
              <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-action-btn live-action" onclick="event.stopPropagation();" aria-label="Launch Live App for ${p.title}">
                <span>Live</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              </a>
            ` : ''}
            ${p.githubUrl ? `
              <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-action-btn code-action" onclick="event.stopPropagation();" aria-label="View Source on GitHub for ${p.title}">
                <span>GitHub</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            ` : ''}
            <button type="button" class="card-action-hint" data-action="case-study" data-project-id="${p.id}" aria-label="Read Case Study for ${p.title}">
              <span>Details →</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // Default Grid / Carousel Card View
  return `
    <article class="project-card-3d ${isCarousel ? 'carousel-card' : ''}" data-tilt data-tilt-max="4" data-project-id="${p.id}" tabindex="0" role="article" aria-label="${p.title}">
      <div class="project-card-glare"></div>
      <div class="project-preview-frame">
        <div class="browser-frame-mockup">
          <div class="browser-frame-bar">
            <span class="browser-dot dot-red"></span>
            <span class="browser-dot dot-yellow"></span>
            <span class="browser-dot dot-green"></span>
            <span class="browser-url-pill">${p.id}.vitc.internal</span>
          </div>
          <div class="browser-frame-content">
            ${p.thumbnail ? `
              <img src="${p.thumbnail}" 
                   alt="${p.title} Preview" 
                   class="project-screenshot-img" 
                   loading="lazy" 
                   width="640" 
                   height="400" 
                   onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
            ` : ''}
            <div class="project-dynamic-canvas ${p.thumbnail ? 'has-screenshot-fallback' : ''}" style="${p.thumbnail ? 'display: none;' : ''}">
              ${getProjectGraphic(p)}
            </div>
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

        ${p.impact ? `
          <div class="project-impact-line">
            <svg class="impact-lightning-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            <span class="impact-text">${p.impact}</span>
          </div>
        ` : ''}

        <p class="project-tagline">${p.tagline}</p>

        <div class="project-tags-list">
          ${visibleTech.map(t => `<span class="project-tag-item">${t}</span>`).join('')}
          ${hiddenCount > 0 ? `<span class="project-tag-item tag-more" title="${remainingTech}">+${hiddenCount}</span>` : ''}
        </div>

        <div class="project-card-actions">
          ${p.liveUrl && p.liveUrl !== '#' ? `
            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="card-action-btn live-action" onclick="event.stopPropagation();" aria-label="Launch Live App for ${p.title}">
              <span>Live App</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          ` : ''}
          ${p.githubUrl ? `
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="card-action-btn code-action" onclick="event.stopPropagation();" aria-label="View Source on GitHub for ${p.title}">
              <span>GitHub</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          ` : ''}
          <button type="button" class="card-action-hint" data-action="case-study" data-project-id="${p.id}" aria-label="Read Case Study for ${p.title}">
            <span>Case Study →</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

/**
 * Render the End-of-Row card linking to All Projects archive
 * @param {number} totalProjects Total count of projects
 * @returns {string} HTML string
 */
export function renderEndOfRowCard(totalProjects) {
  return `
    <article class="project-card-3d carousel-card project-card-end-cta" tabindex="0" role="article" aria-label="View all ${totalProjects} projects" onclick="window.location.href='projects.html'">
      <div class="project-card-glare"></div>
      <div class="end-cta-inner">
        <div class="end-cta-icon-ring">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
          </svg>
        </div>
        <span class="end-cta-counter">${totalProjects} Projects in Archive</span>
        <h3 class="end-cta-title">Explore Complete Catalog</h3>
        <p class="end-cta-desc">Full-stack web applications, machine learning engines, Web3 smart contracts, and open-source contributions with multi-criteria filtering.</p>
        <a href="projects.html" class="btn-spatial-primary end-cta-btn" onclick="event.stopPropagation();">
          <span>View All Projects</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </article>
  `;
}
