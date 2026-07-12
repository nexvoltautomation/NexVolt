/* ===================================================
   NexVolt Automation LLP — Hero Image Slider
   Slide 1 (data-type="full")  → shows logo + heading + tagline + buttons
   Slides 2+ (data-type="plant") → shows only plant name label
   ===================================================

   HOW TO ADD MORE SLIDES:

   Full content slide (office/company):
   <div class="hero-slide" data-type="full"
        data-src="assets/slider/yourimage.jpg"
        style="background-image:url('assets/slider/yourimage.jpg')"></div>

   Plant name only slide:
   <div class="hero-slide" data-type="plant" data-label="Your Plant Name"
        data-src="assets/slider/yourimage.jpg"
        style="background-image:url('assets/slider/yourimage.jpg')"></div>
*/

(function () {
  'use strict';

  const AUTO_PLAY_INTERVAL = 5000;
  const TRANSITION_MS      = 800;

  const slider      = document.querySelector('.hero-slider');
  const dotsWrap    = document.querySelector('.hero-slider-dots');
  const prevBtn     = document.querySelector('.hero-slider-prev');
  const nextBtn     = document.querySelector('.hero-slider-next');
  const heroContent = document.getElementById('heroContent');
  const plantLabel  = document.getElementById('heroPlantLabel');
  const plantName   = document.getElementById('heroPlantName');
  const scrollInd   = document.querySelector('.hero-scroll-indicator');

  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero-slide'));
  const total  = slides.length;
  if (total === 0) return;

  let current  = 0;
  let timer    = null;
  let isMoving = false;

  // ── Build dots ────────────────────────────────────
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll('.hero-dot'));

  // ── Update content visibility based on slide type ─
  function updateContent(index) {
    const slide = slides[index];
    const type  = slide.dataset.type || 'full';

    if (type === 'full') {
      // Show logo + heading + tagline + buttons
      heroContent.style.display  = 'block';
      heroContent.style.opacity  = '0';
      plantLabel.style.display   = 'none';
      scrollInd.style.display    = 'block';
      setTimeout(() => { heroContent.style.opacity = '1'; }, 100);
    } else {
      // Show only plant name
      heroContent.style.display  = 'none';
      plantLabel.style.display   = 'block';
      plantLabel.style.opacity   = '0';
      plantName.textContent      = slide.dataset.label || '';
      scrollInd.style.display    = 'none';
      setTimeout(() => { plantLabel.style.opacity = '1'; }, 100);
    }
  }

  // ── Go to slide ───────────────────────────────────
  function goTo(index) {
    if (isMoving || index === current) return;
    isMoving = true;

    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    dots[current].setAttribute('aria-selected', 'false');

    current = (index + total) % total;

    slides[current].classList.add('active');
    dots[current].classList.add('active');
    dots[current].setAttribute('aria-selected', 'true');

    // Re-trigger Ken Burns
    slides[current].style.animation = 'none';
    requestAnimationFrame(() => { slides[current].style.animation = ''; });

    updateContent(current);

    setTimeout(() => { isMoving = false; }, TRANSITION_MS);
  }

  // ── Auto play ─────────────────────────────────────
  function startAuto() {
    stopAuto();
    timer = setInterval(() => goTo(current + 1), AUTO_PLAY_INTERVAL);
  }
  function stopAuto() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // ── Controls ──────────────────────────────────────
  prevBtn.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // ── Pause on hover ────────────────────────────────
  const heroSection = document.getElementById('home');
  heroSection.addEventListener('mouseenter', stopAuto);
  heroSection.addEventListener('mouseleave', startAuto);

  // ── Touch swipe ───────────────────────────────────
  let touchStartX = 0;
  heroSection.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  heroSection.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      startAuto();
    }
  }, { passive: true });

  // ── Keyboard ──────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  // ── Add transition to plant label ─────────────────
  plantLabel.style.transition = 'opacity 0.6s ease';
  heroContent.style.transition = 'opacity 0.6s ease';

  // ── Init ──────────────────────────────────────────
  updateContent(0); // show full content on slide 1
  startAuto();

})();
