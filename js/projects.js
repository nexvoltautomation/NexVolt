/* ===================================================
   NexVolt Automation LLP — Projects & Downloads
   Features: Search, Filter, Lightbox, View, Download
   ===================================================

   ╔═══════════════════════════════════════════════════╗
   ║  HOW TO ADD A NEW PROJECT (Admin Friendly)       ║
   ║  ──────────────────────────────────────────────  ║
   ║  1. Copy project thumbnail →                     ║
   ║        assets/project-images/projectN.jpg        ║
   ║                                                   ║
   ║  2. Copy PPT/PDF/Excel →                         ║
   ║        assets/projects/YourFile.pptx             ║
   ║                                                   ║
   ║  3. Add ONE object to the PROJECTS array below.  ║
   ║     Copy any existing entry and fill in          ║
   ║     your details.                                ║
   ║                                                   ║
   ║  4. That's it! No HTML or CSS changes needed.    ║
   ╚═══════════════════════════════════════════════════╝
*/

(function () {
  'use strict';

  /* ════════════════════════════════════════════════════
     PROJECT DATA — ADD YOUR PROJECTS HERE
     ════════════════════════════════════════════════════
     fileType options: 'pptx' | 'pdf' | 'xlsx' | 'docx'
     category options: 'PME' | 'EMS' | 'SCADA' | 'Power Monitoring' | 'PLC' | 'Networking' | 'AMC'
     ════════════════════════════════════════════════════ */
  const PROJECTS = [

    // ── PROJECT 1 ──────────────────────────────────────
    {
      name:         'PME Implementation',
      description:  'End-to-end Power Monitoring Expert (PME) implementation with ION meter integration, real-time energy dashboards and SQL Server database configuration.',
      image:        'assets/project-images/project1.jpg',
      file:         'assets/projects/PME_Implementation.pptx',
      fileType:     'pptx',
      category:     'PME',
      technologies: ['PME', 'SQL Server', 'ION Meter', 'Modbus TCP'],
      clientType:   'Commercial — Real Estate',
    },

    // ── PROJECT 2 ──────────────────────────────────────
    {
      name:         'EMS Dashboard',
      description:  'Energy Management System deployment for a multi-floor facility. Custom dashboards, alarm management, automated daily consumption reports and energy analytics.',
      image:        'assets/project-images/project2.jpg',
      file:         'assets/projects/EMS_Dashboard.pptx',
      fileType:     'pptx',
      category:     'EMS',
      technologies: ['EMS', 'Modbus TCP', 'BCPM', 'ION9000'],
      clientType:   'Manufacturing — Industrial',
    },

    // ── PROJECT 3 ──────────────────────────────────────
    {
      name:         'SCADA Integration',
      description:  'Complete SCADA system integration for a process plant. PLC programming, HMI design and remote monitoring via Modbus RTU/TCP protocol.',
      image:        'assets/project-images/project3.jpg',
      file:         'assets/projects/SCADA_Integration.pptx',
      fileType:     'pptx',
      category:     'SCADA',
      technologies: ['SCADA', 'PLC', 'HMI', 'Modbus RTU'],
      clientType:   'Process Industry',
    },

    // ── PROJECT 4 ──────────────────────────────────────
    {
      name:         'EcoStruxure Power Operation',
      description:  'EcoStruxure Power Operation (EPO) deployment for campus power distribution. Real-time single-line diagrams, fault management and load scheduling.',
      image:        'assets/project-images/project4.jpg',
      file:         'assets/projects/Power_Operation.pptx',
      fileType:     'pptx',
      category:     'Power Monitoring',
      technologies: ['EPO', 'EcoStruxure', 'ION9000', 'PM8000'],
      clientType:   'Commercial — Campus',
    },

    // ── PROJECT 5 ──────────────────────────────────────
    {
      name:         'Data Center Power Monitoring',
      description:  'PM8000 and BCPM-based power monitoring for a data center. Branch circuit monitoring, PUE calculation and automated reporting using Schneider PME.',
      image:        'assets/project-images/project5.jpg',
      file:         'assets/projects/Data_Center.pptx',
      fileType:     'pptx',
      category:     'Power Monitoring',
      technologies: ['PM8000', 'BCPM', 'PME', 'Power Quality'],
      clientType:   'IT — Data Center',
    },

    // ── PROJECT 6 — EMS Daily Report (Excel) ──────────
    {
      name:         'EMS Customized Daily Consumption Report',
      description:  'Automated daily energy consumption report for an industrial facility. Custom Excel-based report with shift-wise consumption, peak demand tracking and trend analysis.',
      image:        'assets/project-images/project2.jpg',
      file:         'assets/projects/EMS_Daily_Report.xlsx',
      fileType:     'xlsx',
      category:     'EMS',
      technologies: ['EMS', 'Excel Automation', 'Energy Analytics', 'Modbus'],
      clientType:   'Manufacturing — Industrial',
    },

    /* ══════════════════════════════════════════════════
       ADD FUTURE PROJECTS HERE — copy this template:

    {
      name:         'Your Project Name',
      description:  'Short description (1-2 sentences).',
      image:        'assets/project-images/projectN.jpg',
      file:         'assets/projects/YourFile.pptx',
      fileType:     'pptx',    // pptx | pdf | xlsx | docx
      category:     'SCADA',
      technologies: ['Tech1', 'Tech2', 'Tech3'],
      clientType:   'Industry Type',
    },

       ══════════════════════════════════════════════════ */

  ]; // ← end of PROJECTS array


  /* ════════════════════════════════════════════════════
     YOU DO NOT NEED TO EDIT ANYTHING BELOW THIS LINE
     ════════════════════════════════════════════════════ */

  // ── File type labels & icons ─────────────────────────
  const FILE_META = {
    pptx: { label: 'PPT',   color: '#c55a11', icon: '📊' },
    pdf:  { label: 'PDF',   color: '#c00000', icon: '📄' },
    xlsx: { label: 'Excel', color: '#1e7145', icon: '📈' },
    docx: { label: 'Word',  color: '#2e74b5', icon: '📝' },
  };

  // ── DOM references ───────────────────────────────────
  const grid        = document.getElementById('projectsGrid');
  const emptyMsg    = document.getElementById('projectsEmpty');
  const searchInput = document.getElementById('projectSearch');
  const filtersWrap = document.querySelector('.projects-filters');
  const lightbox    = document.getElementById('projLightbox');
  const lbImg       = document.getElementById('projLightboxImg');
  const lbCaption   = document.getElementById('projLightboxCaption');
  const lbClose     = document.getElementById('projLightboxClose');

  if (!grid) return;

  let activeFilter = 'All';
  let searchQuery  = '';

  // ── Build filter buttons ─────────────────────────────
  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className   = 'filter-btn' + (cat === 'All' ? ' active' : '');
    btn.textContent = cat;
    btn.setAttribute('aria-pressed', cat === 'All' ? 'true' : 'false');
    btn.addEventListener('click', () => {
      activeFilter = cat;
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      render();
    });
    filtersWrap.appendChild(btn);
  });

  // ── Download icon SVG ─────────────────────────────────
  function dlIcon() {
    return `<svg style="width:15px;height:15px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  }

  // ── View icon SVG ─────────────────────────────────────
  function viewIcon() {
    return `<svg style="width:15px;height:15px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }

  // ── Get Google Docs Viewer URL for online preview ────
  // Works for: pptx, xlsx, docx, pdf
  // Requires the file to be publicly accessible on the live website
  function getViewUrl(filePath, fileType) {
    if (fileType === 'pdf') {
      // PDF: open directly in browser new tab
      return filePath;
    }
    // PPTX / XLSX / DOCX: use Google Docs Viewer
    // Google needs the FULL public URL of the file
    const fullUrl = window.location.origin + '/' + filePath;
    return 'https://docs.google.com/viewer?url=' + encodeURIComponent(fullUrl) + '&embedded=false';
  }

  // ── Create one project card ───────────────────────────
  function createCard(project) {
    const meta  = FILE_META[project.fileType] || FILE_META.pdf;
    const imgSrc = project.image || '';
    const card   = document.createElement('article');
    card.className = 'proj-card';

    card.innerHTML = `
      <!-- Project image — click to enlarge (lightbox) -->
      <div class="proj-img-wrap" role="button" tabindex="0"
           aria-label="View full image: ${project.name}">
        <img
          src="${imgSrc}"
          alt="${project.name}"
          loading="lazy"
          onerror="this.parentElement.style.background='#f4f6f9';this.style.display='none'"
        >
        <div class="proj-img-overlay">
          <span class="proj-img-zoom">&#128269; Click to Zoom</span>
        </div>
      </div>

      <!-- File type badge -->
      <div class="proj-file-badge" style="background:${meta.color}">
        ${meta.icon} ${meta.label}
      </div>

      <div class="proj-body">
        <h3 class="proj-name">${project.name}</h3>
        <p class="proj-desc">${project.description}</p>

        <div class="proj-tech">
          ${project.technologies.map(t => `<span class="proj-tag">${t}</span>`).join('')}
        </div>

        <div class="proj-meta">
          <span class="proj-meta-dot"></span>
          <span>${project.clientType}</span>
        </div>

        <div class="proj-actions">
          <a href="${getViewUrl(project.file, project.fileType)}"
             target="_blank"
             rel="noopener noreferrer"
             class="proj-btn proj-btn-view"
             aria-label="View ${meta.label}: ${project.name}">
            ${viewIcon()} View ${meta.label}
          </a>
          <a href="${project.file}"
             download="${project.file.split('/').pop()}"
             class="proj-btn proj-btn-download"
             aria-label="Download ${meta.label}: ${project.name}">
            ${dlIcon()} Download
          </a>
        </div>
      </div>
    `;

    // Lightbox on image click
    const imgWrap = card.querySelector('.proj-img-wrap');
    imgWrap.addEventListener('click', () => openLightbox(imgSrc, project.name));
    imgWrap.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(imgSrc, project.name);
    });

    return card;
  }

  // ── Render / filter ───────────────────────────────────
  function render() {
    grid.innerHTML = '';
    const q = searchQuery.toLowerCase();

    const visible = PROJECTS.filter(p => {
      const matchFilter = activeFilter === 'All' || p.category === activeFilter;
      const matchSearch = !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.clientType.toLowerCase().includes(q);
      return matchFilter && matchSearch;
    });

    emptyMsg.style.display = visible.length === 0 ? 'block' : 'none';

    visible.forEach((p, i) => {
      const card = createCard(p);
      card.style.opacity   = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`;
      grid.appendChild(card);
      requestAnimationFrame(() => {
        card.style.opacity   = '1';
        card.style.transform = 'none';
      });
    });
  }

  // ── Search — debounced ────────────────────────────────
  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      searchQuery = searchInput.value.trim();
      render();
    }, 280);
  });

  // ── Lightbox ──────────────────────────────────────────
  function openLightbox(src, caption) {
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // ── Initial render ────────────────────────────────────
  render();

})();
