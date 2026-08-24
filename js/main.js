/* ===================================================
   NexVolt Automation LLP — Main JavaScript
   ===================================================

   EMAILJS SETUP (one-time, 5 minutes):
   1. Go to https://www.emailjs.com → Sign up FREE
   2. Add a Service: Gmail → connect mursalin@nexvoltautomation.com → copy SERVICE_ID
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

// ── Reference-style cinematic menu + inquiry modal ─────────────
const menuTrigger = document.getElementById('menuTrigger');
const nvMenu = document.getElementById('nvMenu');
const nvMenuClose = document.getElementById('nvMenuClose');
const nvMenuBackdrop = document.getElementById('nvMenuBackdrop');
const navLinks = document.querySelectorAll('.nv-menu-links a');
const inquiryTrigger = document.getElementById('inquiryTrigger');
const contactModal = document.getElementById('contactModal');
const quickContactForm = document.getElementById('quickContactForm');
const quickSendBtn = document.getElementById('quickSendBtn');
const quickSendText = document.getElementById('quickSendText');
const quickSendSpinner = document.getElementById('quickSendSpinner');
const quickFormStatus = document.getElementById('quickFormStatus');

const driveAccessTrigger = document.getElementById('driveAccessTrigger');
const driveAccessModal = document.getElementById('driveAccessModal');
const driveAccessClose = document.getElementById('driveAccessClose');
const driveAccessBackdrop = document.getElementById('driveAccessBackdrop');
const driveLoginForm = document.getElementById('driveLoginForm');
const driveChangeForm = document.getElementById('driveChangeForm');
const driveList = document.getElementById('driveList');
const drivePassword = document.getElementById('drivePassword');
const driveLoginStatus = document.getElementById('driveLoginStatus');
const driveChangeStatus = document.getElementById('driveChangeStatus');
const driveForgotBtn = document.getElementById('driveForgotBtn');
const driveBackLogin = document.getElementById('driveBackLogin');
const driveLockBtn = document.getElementById('driveLockBtn');

// Browser-only access gate. Default password is PowerX.
const DRIVE_PASSWORD_KEY = 'nexvolt_powerx_drive_password';
const DEFAULT_DRIVE_PASSWORD = 'PowerX';
function getDrivePassword(){ return localStorage.getItem(DRIVE_PASSWORD_KEY) || DEFAULT_DRIVE_PASSWORD; }
function setDriveStatus(el, message, type=''){ el.textContent=message; el.className='nv-drive-status' + (type ? ' '+type : ''); }
function resetDriveView(){
  driveLoginForm.hidden=false; driveChangeForm.hidden=true; driveList.hidden=true;
  driveLoginForm.reset(); driveChangeForm.reset();
  setDriveStatus(driveLoginStatus,''); setDriveStatus(driveChangeStatus,'');
}
function openDriveAccess(){
  if (contactModal.classList.contains('is-open')) closeContactModal(false);
  resetDriveView(); driveAccessModal.classList.add('is-open'); driveAccessModal.setAttribute('aria-hidden','false'); lockPage();
  setTimeout(()=>drivePassword.focus(),300);
}
function closeDriveAccess(){ driveAccessModal.classList.remove('is-open'); driveAccessModal.setAttribute('aria-hidden','true'); unlockPage(); }
driveAccessTrigger.addEventListener('click',openDriveAccess);
driveAccessClose.addEventListener('click',closeDriveAccess);
driveAccessBackdrop.addEventListener('click',closeDriveAccess);
driveForgotBtn.addEventListener('click',()=>{ driveLoginForm.hidden=true; driveChangeForm.hidden=false; setDriveStatus(driveChangeStatus,''); document.getElementById('driveOldPassword').focus(); });
driveBackLogin.addEventListener('click',()=>{ resetDriveView(); drivePassword.focus(); });
driveLockBtn.addEventListener('click',()=>{ resetDriveView(); drivePassword.focus(); });
driveLoginForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(drivePassword.value === getDrivePassword()){
    driveLoginForm.hidden=true; driveChangeForm.hidden=true; driveList.hidden=false; setDriveStatus(driveLoginStatus,'');
  } else { setDriveStatus(driveLoginStatus,'Incorrect password. Please try again.','error'); drivePassword.select(); }
});
driveChangeForm.addEventListener('submit',e=>{
  e.preventDefault();
  const oldPass=document.getElementById('driveOldPassword').value;
  const newPass=document.getElementById('driveNewPassword').value;
  const confirmPass=document.getElementById('driveConfirmPassword').value;
  if(oldPass !== getDrivePassword()){ setDriveStatus(driveChangeStatus,'Old password is incorrect.','error'); return; }
  if(newPass !== confirmPass){ setDriveStatus(driveChangeStatus,'New passwords do not match.','error'); return; }
  localStorage.setItem(DRIVE_PASSWORD_KEY,newPass);
  setDriveStatus(driveChangeStatus,'Password changed successfully.','success');
  setTimeout(()=>{ resetDriveView(); drivePassword.focus(); },700);
});

let activeLayer = null;
let lastMenuFocus = null;
let lastModalFocus = null;

function lockPage(){
  document.documentElement.classList.add('nv-scroll-locked');
  document.body.classList.add('nv-locked');
}
function unlockPage(){
  if (!nvMenu.classList.contains('is-open') && !contactModal.classList.contains('is-open') && !driveAccessModal.classList.contains('is-open')) {
    document.documentElement.classList.remove('nv-scroll-locked');
    document.body.classList.remove('nv-locked');
  }
}
function openMenu(){
  if (contactModal.classList.contains('is-open')) closeContactModal();
  lastMenuFocus = document.activeElement;
  activeLayer = 'menu';
  nvMenu.classList.add('is-open');
  menuTrigger.classList.add('is-open');
  menuTrigger.setAttribute('aria-expanded','true');
  nvMenu.setAttribute('aria-hidden','false');
  lockPage();
  requestAnimationFrame(() => nvMenuClose.focus());
}
function closeMenu(restoreFocus = true){
  if (!nvMenu.classList.contains('is-open')) return;
  nvMenu.classList.remove('is-open');
  menuTrigger.classList.remove('is-open');
  menuTrigger.setAttribute('aria-expanded','false');
  nvMenu.setAttribute('aria-hidden','true');
  if (activeLayer === 'menu') activeLayer = null;
  window.setTimeout(() => {
    unlockPage();
    if (restoreFocus && lastMenuFocus && typeof lastMenuFocus.focus === 'function') lastMenuFocus.focus();
  }, 680);
}
menuTrigger.addEventListener('click', () => nvMenu.classList.contains('is-open') ? closeMenu() : openMenu());
nvMenuClose.addEventListener('click', () => closeMenu());
nvMenuBackdrop.addEventListener('click', () => closeMenu());
navLinks.forEach(link => link.addEventListener('click', () => closeMenu(false)));

function openContactModal(){
  if (nvMenu.classList.contains('is-open')) closeMenu(false);
  lastModalFocus = document.activeElement;
  activeLayer = 'modal';
  contactModal.classList.add('is-open');
  contactModal.setAttribute('aria-hidden','false');
  inquiryTrigger.setAttribute('aria-expanded','true');
  lockPage();
  window.setTimeout(() => document.getElementById('quick_name')?.focus(), 420);
}
function closeContactModal(restoreFocus = true){
  if (!contactModal.classList.contains('is-open')) return;
  contactModal.classList.remove('is-open');
  contactModal.setAttribute('aria-hidden','true');
  inquiryTrigger.setAttribute('aria-expanded','false');
  if (activeLayer === 'modal') activeLayer = null;
  window.setTimeout(() => {
    unlockPage();
    if (restoreFocus && lastModalFocus && typeof lastModalFocus.focus === 'function') lastModalFocus.focus();
  }, 480);
}
inquiryTrigger.addEventListener('click', openContactModal);
document.querySelectorAll('.js-contact-open').forEach(link => {
  link.addEventListener('click', e => { e.preventDefault(); openContactModal(); });
});
document.querySelectorAll('[data-contact-close]').forEach(el => el.addEventListener('click', closeContactModal));

// Keep keyboard focus inside whichever overlay is open and allow ESC to close it.
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (contactModal.classList.contains('is-open')) closeContactModal();
    else if (driveAccessModal.classList.contains('is-open')) closeDriveAccess();
    else if (nvMenu.classList.contains('is-open')) closeMenu();
    return;
  }
  if (e.key !== 'Tab' || !activeLayer) return;
  const root = activeLayer === 'modal' ? contactModal : nvMenu;
  const focusables = [...root.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), select:not([disabled])')]
    .filter(el => el.offsetParent !== null);
  if (!focusables.length) return;
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

quickContactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const from_name = document.getElementById('quick_name').value.trim();
  const from_email = document.getElementById('quick_email').value.trim();
  const phone = document.getElementById('quick_phone').value.trim();
  const message = document.getElementById('quick_message').value.trim();
  quickFormStatus.className = 'nv-form-status';
  if(!from_name || !from_email || !phone || !message){ quickFormStatus.textContent='Please complete all required fields.'; quickFormStatus.classList.add('error'); return; }
  if(!isValidEmail(from_email)){ quickFormStatus.textContent='Please enter a valid email address.'; quickFormStatus.classList.add('error'); return; }
  quickSendBtn.disabled=true; quickSendText.hidden=true; quickSendSpinner.hidden=false; quickFormStatus.textContent='';
  try{
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name,name:from_name,from_email,email:from_email,
      phone,subject:'Website Inquiry',message,to_email:'mursalin@nexvoltautomation.com'
    });
    quickFormStatus.textContent='Message sent successfully. Thank you!';
    quickFormStatus.classList.add('success');
    quickContactForm.reset();
  }catch(err){
    console.error('Quick contact EmailJS error:',err);
    quickFormStatus.textContent='Message could not be sent. Please try again or email us directly.';
    quickFormStatus.classList.add('error');
  }finally{
    quickSendBtn.disabled=false; quickSendText.hidden=false; quickSendSpinner.hidden=true;
  }
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
      from_name: from_name,
      name:      from_name,
      from_email: from_email,
      email:     from_email,
      phone:     phone || 'Not provided',
      subject,
      message,
      to_email:  'mursalin@nexvoltautomation.com',
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
