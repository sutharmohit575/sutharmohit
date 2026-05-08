// ─── CURSOR DOT ───────────────────────────────────────────────────────────
const dot = document.getElementById('cursorDot');
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
});

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ─── ACTIVE NAV ───────────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? '#ff3b3b' : '';
  });
});

// ─── CONTACT FORM (Formspree) ─────────────────────────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.form-submit');

  btn.textContent   = 'SENDING...';
  btn.disabled      = true;
  btn.style.opacity = '0.7';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      setBtn(btn, 'MESSAGE SENT ✓', '#00c97a');
      form.reset();
    } else {
      const data = await res.json();
      const msg = data?.errors?.[0]?.message || 'SOMETHING WENT WRONG';
      setBtn(btn, msg.toUpperCase(), '#ff3b3b');
    }
  } catch {
    setBtn(btn, 'NO CONNECTION', '#ff3b3b');
  }
}

function setBtn(btn, text, color) {
  btn.textContent   = text;
  btn.disabled      = false;
  btn.style.opacity = '1';
  btn.style.background  = '#0a0a0a';
  btn.style.border      = `2px solid ${color}`;
  btn.style.color       = color;
  btn.style.boxShadow   = `3px 3px 0 ${color}`;
  setTimeout(() => {
    btn.textContent      = 'SEND MESSAGE →';
    btn.style.background = '';
    btn.style.border     = '';
    btn.style.color      = '';
    btn.style.boxShadow  = '';
  }, 4000);
}
