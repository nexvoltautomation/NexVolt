/* ===================================================
   NexVolt Automation LLP — Main JavaScript
   =================================================== */

'use strict';

// ── Hamburger menu ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.querySelector('nav');
const navLinks  = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close nav on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ── Sticky header shadow ────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Active nav link on scroll ───────────────────────
const sections = document.querySelectorAll('section[id]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// ── Scroll-reveal cards ─────────────────────────────
const revealEls = document.querySelectorAll('.card, .why-item, .stat-item, .about-text, .about-visual');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = `opacity .6s ease ${i * 0.07}s, transform .6s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

document.addEventListener('animationend', () => {});

// revealed class applied by observer
const style = document.createElement('style');
style.textContent = '.revealed { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);

// ── Counter animation ───────────────────────────────
const counters = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el      = entry.target;
    const plus    = el.querySelector('.stat-plus');
    const suffix  = plus ? plus.textContent : '';
    const target  = parseInt(el.dataset.target, 10);

    if (isNaN(target)) return;

    let start     = 0;
    const step    = target / 60;
    const timer   = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start) + suffix;
    }, 25);

    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

// Store target values
counters.forEach(counter => {
  const plus   = counter.querySelector('.stat-plus');
  const text   = counter.textContent.replace(/[^0-9]/g, '');
  counter.dataset.target = text;
  if (plus) counter.appendChild(plus); // Re-append stripped plus
  countObserver.observe(counter);
});

// ── Contact form — Formspree submission ─────────────
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !subject || !message) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  submitBtn.textContent = 'Sending…';
  submitBtn.disabled    = true;

  try {
    const response = await fetch(contactForm.action, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(contactForm),
    });

    if (response.ok) {
      showToast(`Thank you, ${name}! We'll be in touch soon.`, 'success');
      contactForm.reset();
      formNote.textContent = '✓ Message sent successfully!';
      formNote.style.color = '#4ade80';
    } else {
      showToast('Submission failed. Please email us directly.', 'error');
    }
  } catch (err) {
    showToast('Network error. Please email us directly.', 'error');
  }

  submitBtn.textContent = 'Send Message';
  submitBtn.disabled    = false;
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Toast notification ──────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '30px',
    right:        '30px',
    background:   type === 'success' ? '#16a34a' : '#dc2626',
    color:        '#fff',
    padding:      '14px 22px',
    borderRadius: '8px',
    fontFamily:   'Montserrat, sans-serif',
    fontWeight:   '600',
    fontSize:     '14px',
    boxShadow:    '0 8px 24px rgba(0,0,0,.2)',
    zIndex:       '9999',
    opacity:      '0',
    transform:    'translateY(12px)',
    transition:   'opacity .3s, transform .3s',
    maxWidth:     '340px',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
