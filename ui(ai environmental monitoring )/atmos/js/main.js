// ══════════════════════════════════════════════════════════
// ATMOS — SHARED INTERACTION ENGINE
// ══════════════════════════════════════════════════════════

// ── AMBIENT PARTICLES ──
const pCanvas = document.getElementById('particles-canvas');
if (pCanvas) {
  const pCtx = pCanvas.getContext('2d');
  let particles = [];
  function initParticles() {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
    particles = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        r: Math.random() * 1.8 + 0.8,
        vx: (Math.random() - 0.5) * 0.2,
        vy: Math.random() * -0.35 - 0.06,
        alpha: Math.random() * 0.3 + 0.1
      });
    }
  }
  initParticles();
  window.addEventListener('resize', initParticles);
  
  function drawParticles() {
    // Only animate if visible
    if (getComputedStyle(pCanvas).display === 'none') {
      requestAnimationFrame(drawParticles);
      return;
    }

    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) p.y = pCanvas.height + 10;
      if (p.x < -10) p.x = pCanvas.width + 10;
      if (p.x > pCanvas.width + 10) p.x = -10;
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pCtx.fillStyle = `rgba(91,184,245,${p.alpha * 0.5})`;
      pCtx.fill();
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ── PARALLAX ORBS ──
const orbs = ['orb1','orb2','orb3','orb4'].map(id => document.getElementById(id)).filter(Boolean);
if (orbs.length) {
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if(orbs[0]) orbs[0].style.transform = `translate3d(${y*0.04}px, ${y*0.07}px, 0)`;
        if(orbs[1]) orbs[1].style.transform = `translate3d(${-y*0.05}px, ${-y*0.05}px, 0)`;
        if(orbs[2]) orbs[2].style.transform = `translate3d(${y*0.025}px, ${y*0.035}px, 0)`;
        if(orbs[3]) orbs[3].style.transform = `translate3d(${-y*0.03}px, ${y*0.04}px, 0)`;
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  let mouseTicking = false;
  document.addEventListener('mousemove', e => {
    if (!mouseTicking) {
      requestAnimationFrame(() => {
        const xF = (e.clientX / window.innerWidth - 0.5);
        const yF = (e.clientY / window.innerHeight - 0.5);
        if(orbs[0]) orbs[0].style.transform += ` translate3d(${xF*25}px, ${yF*25}px, 0)`;
        if(orbs[2]) orbs[2].style.transform += ` translate3d(${xF*-18}px, ${yF*-18}px, 0)`;
        mouseTicking = false;
      });
      mouseTicking = true;
    }
  }, { passive: true });
}

// ── CARD MOUSE GLOW ──
document.querySelectorAll('.feat-card').forEach(card => {
  let cardTicking = false;
  card.addEventListener('mousemove', e => {
    if (!cardTicking) {
      requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
        cardTicking = false;
      });
      cardTicking = true;
    }
  }, { passive: true });
});

// ── NAV SCROLL ──
const mainNav = document.getElementById('mainNav');
if (mainNav) {
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        mainNav.classList.toggle('scrolled', window.scrollY > 50);
        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('[data-count]').forEach(el => countUp(el));
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal,.reveal-left,.alert-card').forEach(el => observer.observe(el));

// Alerts stagger
const alertObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = parseInt(e.target.dataset.delay) || 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.alert-card').forEach(el => alertObserver.observe(el));

// Hero stats initial count
setTimeout(() => {
  document.querySelectorAll('#hero [data-count]').forEach(el => countUp(el));
}, 600);

function countUp(el) {
  if (el.dataset.counted) return;
  el.dataset.counted = '1';
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const format = el.dataset.format || '';
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = Math.round(ease * target);
    el.textContent = formatNum(val, format) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = formatNum(target, format) + suffix;
  }
  requestAnimationFrame(tick);
}
function formatNum(n, format) {
  if (format === 'abbr') {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
    return n.toLocaleString();
  }
  if (format === 'abbr-m') {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'B';
    return n + 'M';
  }
  return n.toLocaleString();
}

// ── MOBILE NAV ──
let navOpen = false;
function toggleMobileNav() {
  navOpen = !navOpen;
  document.getElementById('mobileNav').classList.toggle('open', navOpen);
  document.body.style.overflow = navOpen ? 'hidden' : '';
  const spans = document.querySelectorAll('#hamburger span');
  if (navOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
}
function closeMobileNav() {
  navOpen = false;
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
  document.querySelectorAll('#hamburger span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
}

// ── MOBILE BOTTOM NAV BAR (auto-injected) ──
(function(){
  const page = location.pathname.split('/').pop() || 'index.html';
  const navItems = [
    { icon:'🏠', label:'Home', href:'index.html' },
    { icon:'⚡', label:'Features', href:'features.html' },
    { icon:'📊', label:'Dashboard', href:'dashboard.html' },
    { icon:'🚨', label:'Alerts', href:'alerts.html' },
    { icon:'🔬', label:'How', href:'how.html' },
  ];
  const nav = document.createElement('div');
  nav.className = 'mobile-bottom-nav';
  nav.innerHTML = '<div class="bottom-nav-items">' + navItems.map(item => {
    const isActive = page === item.href ||
      (item.href === 'features.html' && ['air-quality.html','ocean-health.html','climate-forecast.html','deforestation-alerts.html'].includes(page));
    return `<a class="bottom-nav-item${isActive?' active':''}" href="${item.href}">
      <span class="bottom-nav-icon">${item.icon}</span>
      <span class="bottom-nav-label">${item.label}</span>
    </a>`;
  }).join('') + '</div>';
  document.body.appendChild(nav);
})();

// ── SUMMARY BAR OBSERVER ──
const sumObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.querySelectorAll('[data-count]').forEach(el => countUp(el));
  });
}, { threshold: 0.25 });
document.querySelectorAll('.summary-bar').forEach(el => sumObs.observe(el));

// ── SIMULATED LIVE AQI UPDATE ──
const aqiValues = document.querySelectorAll('.aqi-value');
if (aqiValues.length) {
  setInterval(() => {
    aqiValues.forEach(el => {
      const current = parseInt(el.textContent.replace(/[^0-9]/g, ''));
      const drift = Math.floor(Math.random() * 7) - 3;
      const updated = Math.max(20, current + drift);
      el.textContent = 'AQI ' + updated;
    });
  }, 4000);
}
