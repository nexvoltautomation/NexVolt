/* ===================================================
   NexVolt Automation LLP — Main JavaScript
   ===================================================

   EMAILJS SETUP (one-time, 5 minutes):
   1. Go to https://www.emailjs.com → Sign up FREE
   2. Add a Service: Gmail → connect nexvoltautomation@gmail.com → copy SERVICE_ID
   3. Create a Template with these variables:
        From:    {{from_name}} <{{from_email}}>
        Subject: {{subject}}
        Body:    Name: {{from_name}}
                 Email: {{from_email}}
                 Phone: {{phone}}
                 Subject: {{subject}}
                 Message: {{message}}
      → copy TEMPLATE_ID
   4. Go to Account → copy PUBLIC_KEY
   5. Replace the three values below with your actual IDs.
*/

const EMAILJS_PUBLIC_KEY  = 'FXm2KZnugjqetUVxM';
const EMAILJS_SERVICE_ID  = 'service_p928siw';
const EMAILJS_TEMPLATE_ID = 'template_8wjkg05';

'use strict';

// ── Init EmailJS ────────────────────────────────────
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

// ── Hamburger menu ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const nav       = document.querySelector('nav');
const navLinks  = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});

// ── Sticky header ───────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Active nav link on scroll ───────────────────────
const sections = document.querySelectorAll('section[id]');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// ── Scroll-reveal ───────────────────────────────────
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
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity .6s ease ${i * 0.07}s, transform .6s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

// ── Counter animation ───────────────────────────────
const counters = document.querySelectorAll('.stat-number');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const plus   = el.querySelector('.stat-plus');
    if (isNaN(target)) return;

    let current = 0;
    const step  = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.childNodes[0].nodeValue = Math.floor(current);
    }, 25);
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ── Contact form — EmailJS ──────────────────────────
const contactForm = document.getElementById('contactForm');
const submitBtn   = document.getElementById('submitBtn');
const btnText     = document.getElementById('btnText');
const btnSpinner  = document.getElementById('btnSpinner');
const formNote    = document.getElementById('formNote');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const from_name  = document.getElementById('from_name').value.trim();
  const from_email = document.getElementById('from_email').value.trim();
  const phone      = document.getElementById('phone').value.trim();
  const subject    = document.getElementById('subject').value.trim();
  const message    = document.getElementById('message').value.trim();

  // Validation
  if (!from_name || !from_email || !subject || !message) {
    showToast('Please fill in all required fields (*).', 'error');
    return;
  }
  if (!isValidEmail(from_email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  // Loading state
  btnText.style.display    = 'none';
  btnSpinner.style.display = 'inline';
  submitBtn.disabled       = true;

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name,
      from_email,
      phone:   phone || 'Not provided',
      subject,
      message,
      to_email: 'nexvoltautomation@gmail.com',
    });

    showToast(`Thank you, ${from_name}! We'll be in touch soon.`, 'success');
    contactForm.reset();
    formNote.textContent = '✓ Message sent successfully!';
    formNote.style.color = '#4ade80';

  } catch (err) {
    console.error('EmailJS error:', err);
    showToast('Could not send message. Please call or email us directly.', 'error');
  }

  btnText.style.display    = 'inline';
  btnSpinner.style.display = 'none';
  submitBtn.disabled       = false;
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Toast notification ──────────────────────────────
function showToast(message, type = 'success') {
  const existing = document.querySelector('.nv-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'nv-toast';
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
    boxShadow:    '0 8px 24px rgba(0,0,0,.25)',
    zIndex:       '9999',
    opacity:      '0',
    transform:    'translateY(12px)',
    transition:   'opacity .3s, transform .3s',
    maxWidth:     '340px',
    lineHeight:   '1.5',
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
  }, 5000);
}
