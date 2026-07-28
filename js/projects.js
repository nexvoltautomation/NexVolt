/* ===================================================
   NexVolt Automation LLP — Projects & Downloads
   Features: Search, Filter, Lightbox, View PDF, Download
   ===================================================

   HOW TO ADD A NEW PROJECT:
   1. Copy image  → assets/project-images/YourName.jpg
   2. Copy PDF    → assets/projects/YourName.pdf
   3. Add one object to PROJECTS array below
   4. Done — no HTML changes needed
*/

(function () {
  'use strict';

  /* ════════════════════════════════════════════
     PROJECT DATA — ADD YOUR PROJECTS HERE
     ════════════════════════════════════════════ */
  const PROJECTS = [

    // ── PROJECT 1 ──
    {
      name:         'PME Implementation',
      description:  'End-to-end Power Monitoring Expert (PME) implementation with ION meter integration, real-time energy dashboards and SQL Server database configuration.',
      image:        'assets/project-images/PME_Implementation.jpg',
      file:         'assets/projects/PME_Implementation.pdf',
      fileType:     'pdf',
      category:     'PME',
      technologies: ['PME', 'SQL Server', 'ION Meter', 'Modbus TCP'],
      clientType:   'Commercial — Real Estate',
    },

    // ── PROJECT 2 ──
    {
      name:         'EMS Dashboard',
      description:  'Energy Management System deployment with custom dashboards, alarm management, automated daily consumption reports and energy analytics.',
      image:        'assets/project-images/EMS_Dashboard.jpg',
      file:         'assets/projects/EMS_Dashboard.pdf',
      fileType:     'pdf',
      category:     'EMS',
      technologies: ['EMS', 'Modbus TCP', 'BCPM', 'ION9000'],
      clientType:   'Manufacturing — Industrial',
    },

    // ── PROJECT 3 ──
    {
      name:         'EcoStruxure Power Operation',
      description:  'EcoStruxure Power Operation (EPO) deployment for campus power distribution. Real-time single-line diagrams, fault management and load scheduling.',
      image:        'assets/project-images/Power_Operation.jpg',
      file:         'assets/projects/Power_Operation.pdf',
      fileType:     'pdf',
      category:     'Power Monitoring',
      technologies: ['EPO', 'EcoStruxure', 'ION9000', 'PM8000'],
      clientType:   'Commercial — Campus',
    },

    // ── PROJECT 4 ──
    {
      name:         'Data Center Power Monitoring',
      description:  'PM8000 and BCPM-based power monitoring for a data center. Branch circuit monitoring, PUE calculation and automated reporting using Schneider PME.',
      image:        'assets/project-images/Data_Center.jpg',
      file:         'assets/projects/Data_Center.pdf',
      fileType:     'pdf',
      category:     'Power Monitoring',
      technologies: ['PM8000', 'BCPM', 'PME', 'Power Quality'],
      clientType:   'IT — Data Center',
    },

    // ── PROJECT 5 — Excel Report ──
    {
      name:         'EMS Customized Daily Consumption Report',
      description:  'Automated daily energy consumption report with shift-wise consumption, peak demand tracking and trend analysis.',
      image:        'assets/project-images/EMS_Report.jpg',
      file:         'assets/projects/EMS_Daily_Report.xlsx',
      fileType:     'xlsx',
      category:     'EMS',
      technologies: ['EMS', 'Excel Automation', 'Energy Analytics', 'Modbus'],
      clientType:   'Manufacturing — Industrial',
    },

    /*
      ADD FUTURE PROJECTS HERE — copy this template:

      {
        name:         'Your Project Name',
        description:  'Short description.',
        image:        'assets/project-images/YourName.jpg',
        file:         'assets/projects/YourName.pdf',
        fileType:     'pdf',
        category:     'EMS',
        technologies: ['Tech1', 'Tech2'],
        clientType:   'Industry Type',
      },
    */

  ]; // ← end of PROJECTS array


  /* ════════════════════════════════════════════
     DO NOT EDIT BELOW THIS LINE
     ════════════════════════════════════════════ */

  const FILE_META = {
    pdf:  { label: 'PDF',   color: '#c00000', icon: '📄' },
    xlsx: { label: 'Excel', color: '#1e7145', icon: '📈' },
    pptx: { label: 'PPT',   color: '#c55a11', icon: '📊' },
    docx: { label: 'Word',  color: '#2e74b5', icon: '📝' },
  };

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

  // ── Build filter buttons ──
  const categories = ['All', ...new Set(PROJECTS.map(p => p.category))];
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'All' ? ' active' : '');
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

  // ── View URL ──
  function getViewUrl(filePath, fileType) {
    if (fileType === 'pdf') return filePath;
    const fullUrl = window.location.origin + '/' + filePath;
    return 'https://docs.google.com/viewer?url=' + encodeURIComponent(fullUrl) + '&embedded=false';
  }

  // ── Icons ──
  function viewIcon() {
    return `<svg style="width:15px;height:15px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }
  function dlIcon() {
    return `<svg style="width:15px;height:15px;flex-shrink:0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
  }

  // ── Create card ──
  function createCard(p) {
    const meta = FILE_META[p.fileType] || FILE_META.pdf;
    const card = document.createElement('article');
    card.className = 'proj-card';

    card.innerHTML = `
      <div class="proj-img-wrap" role="button" tabindex="0" aria-label="View image: ${p.name}">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.parentElement.style.background='#f4f6f9';this.style.display='none'">
        <div class="proj-img-overlay"><span class="proj-img-zoom">&#128269; Click to Zoom</span></div>
      </div>
      <div class="proj-file-badge" style="background:${meta.color}">${meta.icon} ${meta.label}</div>
      <div class="proj-body">
        <h3 class="proj-name">${p.name}</h3>
        <p class="proj-desc">${p.description}</p>
        <div class="proj-tech">${p.technologies.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
        <div class="proj-meta"><span class="proj-meta-dot"></span><span>${p.clientType}</span></div>
        <div class="proj-actions">
          <a href="${getViewUrl(p.file, p.fileType)}" target="_blank" rel="noopener noreferrer"
             class="proj-btn proj-btn-view" aria-label="View ${meta.label}: ${p.name}">
            ${viewIcon()} View ${meta.label}
          </a>
          <a href="${p.file}" download="${p.file.split('/').pop()}"
             class="proj-btn proj-btn-download" aria-label="Download: ${p.name}">
            ${dlIcon()} Download
          </a>
        </div>
      </div>`;

    const imgWrap = card.querySelector('.proj-img-wrap');
    imgWrap.addEventListener('click', () => openLightbox(p.image, p.name));
    imgWrap.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openLightbox(p.image, p.name);
    });
    return card;
  }

  // ── Render ──
  function render() {
    grid.innerHTML = '';
    const q = searchQuery.toLowerCase();
    const visible = PROJECTS.filter(p => {
      const mf = activeFilter === 'All' || p.category === activeFilter;
      const ms = !q || p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.clientType.toLowerCase().includes(q);
      return mf && ms;
    });

    emptyMsg.style.display = visible.length === 0 ? 'block' : 'none';
    visible.forEach((p, i) => {
      const card = createCard(p);
      card.style.opacity    = '0';
      card.style.transform  = 'translateY(20px)';
      card.style.transition = `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`;
      grid.appendChild(card);
      requestAnimationFrame(() => {
        card.style.opacity   = '1';
        card.style.transform = 'none';
      });
    });
  }

  // ── Search ──
  let searchTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { searchQuery = searchInput.value.trim(); render(); }, 280);
  });

  // ── Lightbox ──
  function openLightbox(src, caption) {
    lbImg.src = src; lbImg.alt = caption;
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

  render();

})();
