/**
 * command-palette.js — Keyboard-First Command Palette (Ctrl+K / Cmd+K)
 * Provides fast navigation, quick actions, theme toggle, and external links.
 */

export class CommandPalette {
  constructor(options = {}) {
    this.options = options;
    this.isOpen = false;
    this.selectedIndex = 0;
    this.commands = this.getCommands();
    this.filteredCommands = [...this.commands];

    this.init();
  }

  getCommands() {
    const isArchive = window.location.pathname.includes('projects.html');
    const homePrefix = isArchive ? 'index.html' : '';

    return [
      {
        id: 'nav-work',
        category: 'Navigation',
        title: 'Go to Featured Projects Showcase',
        hint: 'Home page horizontal carousel',
        icon: '🚀',
        action: () => {
          if (isArchive) window.location.href = 'index.html#work';
          else this.smoothScrollTo('#work');
        }
      },
      {
        id: 'nav-archive',
        category: 'Navigation',
        title: 'Open All Projects Archive',
        hint: 'Complete projects catalog with multi-filters',
        icon: '📂',
        action: () => {
          window.location.href = 'projects.html';
        }
      },
      {
        id: 'nav-capabilities',
        category: 'Navigation',
        title: 'Go to Capabilities & System Matrix',
        hint: 'Full-stack, AI/ML & Web3 core competencies',
        icon: '⚡',
        action: () => {
          if (isArchive) window.location.href = 'index.html#capabilities';
          else this.smoothScrollTo('#capabilities');
        }
      },
      {
        id: 'nav-about',
        category: 'Navigation',
        title: 'Go to About & Trajectory',
        hint: 'Bio, philosophy & engineering principles',
        icon: '📖',
        action: () => {
          if (isArchive) window.location.href = 'index.html#about';
          else this.smoothScrollTo('#about');
        }
      },
      {
        id: 'nav-ecosystem',
        category: 'Navigation',
        title: 'Go to Ecosystem & Coding Matrix',
        hint: 'GitHub, LeetCode 200+, Codolio',
        icon: '🌐',
        action: () => {
          if (isArchive) window.location.href = 'index.html#presence';
          else this.smoothScrollTo('#presence');
        }
      },
      {
        id: 'nav-honors',
        category: 'Navigation',
        title: 'Go to Honors & Education',
        hint: 'GSSoC, MIC, Hackathons & VIT Chennai',
        icon: '🎓',
        action: () => {
          if (isArchive) window.location.href = 'index.html#credentials';
          else this.smoothScrollTo('#credentials');
        }
      },
      {
        id: 'nav-contact',
        category: 'Navigation',
        title: 'Go to Contact & Messages',
        hint: 'Direct outreach for internships & collaborations',
        icon: '📬',
        action: () => {
          if (isArchive) window.location.href = 'index.html#contact';
          else this.smoothScrollTo('#contact');
        }
      },
      {
        id: 'action-resume',
        category: 'Actions',
        title: 'View Curriculum Vitae (Resume PDF)',
        hint: 'Open official resume sheet modal',
        icon: '📄',
        action: () => {
          const btn = document.getElementById('nav-resume-btn') || document.getElementById('hero-resume-btn');
          if (btn) btn.click();
        }
      },
      {
        id: 'action-email',
        category: 'Actions',
        title: 'Copy Email Address',
        hint: 'saumyapandyaartist@gmail.com',
        icon: '📋',
        action: () => {
          navigator.clipboard.writeText('saumyapandyaartist@gmail.com').then(() => {
            this.showToast('Copied saumyapandyaartist@gmail.com to clipboard!');
          }).catch(() => {
            window.location.href = 'mailto:saumyapandyaartist@gmail.com';
          });
        }
      },
      {
        id: 'action-theme',
        category: 'Actions',
        title: 'Toggle Dark / Light Theme',
        hint: 'Switch between warm alabaster and deep space theme',
        icon: '🌓',
        action: () => {
          const btn = document.getElementById('theme-toggle-btn');
          if (btn) btn.click();
        }
      },
      {
        id: 'ext-github',
        category: 'External Links',
        title: 'Open GitHub Profile',
        hint: 'github.com/SAMJOD07-devz',
        icon: '🐙',
        action: () => {
          window.open('https://github.com/SAMJOD07-devz', '_blank', 'noopener');
        }
      },
      {
        id: 'ext-linkedin',
        category: 'External Links',
        title: 'Open LinkedIn Profile',
        hint: 'linkedin.com/in/saumya-pandya-5a0376369',
        icon: '💼',
        action: () => {
          window.open('https://www.linkedin.com/in/saumya-pandya-5a0376369/', '_blank', 'noopener');
        }
      },
      {
        id: 'ext-leetcode',
        category: 'External Links',
        title: 'Open LeetCode Profile',
        hint: 'leetcode.com/u/SAMJOD07/ (200+ Solved)',
        icon: '⚡',
        action: () => {
          window.open('https://leetcode.com/u/SAMJOD07/', '_blank', 'noopener');
        }
      }
    ];
  }

  init() {
    this.createDom();
    this.bindEvents();
  }

  isMac() {
    return /Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent);
  }

  createDom() {
    if (document.getElementById('cmd-palette-modal')) return;

    const isMac = this.isMac();
    const modifierKey = isMac ? '⌘' : 'Ctrl';

    // Update nav button badge to match user OS
    const triggerBadge = document.querySelector('.cmd-kbd-badge');
    if (triggerBadge) {
      triggerBadge.textContent = isMac ? '⌘K' : 'Ctrl K';
    }

    const modal = document.createElement('div');
    modal.id = 'cmd-palette-modal';
    modal.className = 'modal-backdrop cmd-palette-backdrop';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Command Palette');

    modal.innerHTML = `
      <div class="cmd-palette-box">
        <div class="cmd-input-bar">
          <svg class="cmd-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" id="cmd-palette-input" class="cmd-search-input" placeholder="Type a command or jump to section..." autocomplete="off" spellcheck="false" aria-label="Command query" />
          <span class="cmd-esc-tag">ESC</span>
        </div>
        <div id="cmd-results-list" class="cmd-results-list" role="listbox"></div>
        <div class="cmd-footer-bar">
          <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>${modifierKey}</kbd> + <kbd>K</kbd> toggle</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  bindEvents() {
    const isMac = this.isMac();

    // Keyboard shortcuts (Cmd+K on macOS, Ctrl+K on Windows/Linux)
    window.addEventListener('keydown', (e) => {
      const isCmdOrCtrlK = (isMac ? e.metaKey : e.ctrlKey) && (e.key === 'k' || e.key === 'K');
      if (isCmdOrCtrlK || (e.ctrlKey && (e.key === 'k' || e.key === 'K'))) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    const modal = document.getElementById('cmd-palette-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.close();
      });
    }

    // Nav trigger button
    const triggerBtn = document.getElementById('cmd-palette-btn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => this.toggle());
    }

    // Input search
    const input = document.getElementById('cmd-palette-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.filterCommands(e.target.value.trim());
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % Math.max(1, this.filteredCommands.length);
          this.renderList();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + this.filteredCommands.length) % Math.max(1, this.filteredCommands.length);
          this.renderList();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          this.executeSelected();
        }
      });
    }
  }

  toggle() {
    if (this.isOpen) this.close();
    else this.open();
  }

  open() {
    this.isOpen = true;
    const modal = document.getElementById('cmd-palette-modal');
    const input = document.getElementById('cmd-palette-input');
    if (modal) modal.classList.add('open');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 60);
    }
    this.filteredCommands = [...this.commands];
    this.selectedIndex = 0;
    this.renderList();
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    const modal = document.getElementById('cmd-palette-modal');
    if (modal) modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  filterCommands(query) {
    if (!query) {
      this.filteredCommands = [...this.commands];
    } else {
      const q = query.toLowerCase();
      this.filteredCommands = this.commands.filter(c => 
        c.title.toLowerCase().includes(q) || 
        c.hint.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q)
      );
    }
    this.selectedIndex = 0;
    this.renderList();
  }

  renderList() {
    const list = document.getElementById('cmd-results-list');
    if (!list) return;

    if (this.filteredCommands.length === 0) {
      list.innerHTML = `
        <div class="cmd-empty-state">
          <span>No matching commands or destinations found</span>
        </div>
      `;
      return;
    }

    list.innerHTML = this.filteredCommands.map((c, i) => `
      <div class="cmd-item ${i === this.selectedIndex ? 'selected' : ''}" 
           data-cmd-id="${c.id}" 
           role="option" 
           aria-selected="${i === this.selectedIndex}">
        <span class="cmd-item-icon">${c.icon}</span>
        <div class="cmd-item-text">
          <span class="cmd-item-title">${c.title}</span>
          <span class="cmd-item-hint">${c.hint}</span>
        </div>
        <span class="cmd-item-cat">${c.category}</span>
      </div>
    `).join('');

    list.querySelectorAll('.cmd-item').forEach((item, idx) => {
      item.addEventListener('mouseenter', () => {
        this.selectedIndex = idx;
        list.querySelectorAll('.cmd-item').forEach((el, j) => {
          el.classList.toggle('selected', j === idx);
        });
      });

      item.addEventListener('click', () => {
        this.selectedIndex = idx;
        this.executeSelected();
      });
    });

    const activeEl = list.children[this.selectedIndex];
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }

  executeSelected() {
    const selected = this.filteredCommands[this.selectedIndex];
    if (selected) {
      this.close();
      setTimeout(() => {
        selected.action();
      }, 100);
    }
  }

  smoothScrollTo(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    const navHeight = 72;
    const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: prefersReduced ? 'auto' : 'smooth' });
  }

  showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
}
