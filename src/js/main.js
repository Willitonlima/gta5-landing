// ==========================================
// GTA 5 Landing Page — Main JS
// ==========================================

// ── Nav scroll behavior ─────────────────────────

const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Carousel ────────────────────────────────────

(function initCarousel() {
  const track   = document.querySelector('.carousel__track');
  const slides  = document.querySelectorAll('.carousel__slide');
  const prevBtn = document.querySelector('.carousel__btn--prev');
  const nextBtn = document.querySelector('.carousel__btn--next');
  const dotsWrap = document.querySelector('.carousel__dots');

  if (!track || !slides.length) return;

  let current = 0;
  const visible = () => window.innerWidth >= 768 ? 3 : 1;
  const maxIndex = () => slides.length - visible();

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = () => document.querySelectorAll('.carousel__dot');

  function getSlideWidth() {
    return slides[0].offsetWidth + 24; // gap
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${current * getSlideWidth()}px)`;
    dots().forEach((d, i) => d.classList.toggle('active', i === current));
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIndex();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));
  window.addEventListener('resize', () => goTo(current));

  // Touch/swipe
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
  }, { passive: true });

  goTo(0);

  // Auto-play
  let autoPlay = setInterval(() => goTo(current + 1 > maxIndex() ? 0 : current + 1), 4500);
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goTo(current + 1 > maxIndex() ? 0 : current + 1), 4500);
  });
})();

// ── Scroll reveal ───────────────────────────────

(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ── Parallax header ─────────────────────────────

(function initParallax() {
  const hero = document.querySelector('.header__image-wrap');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
})();

// ── Cursor glow ─────────────────────────────────

(function initCursor() {
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(247,201,72,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);

  window.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
})();

console.log('%c GTA V Landing Page ', 'background:#f7c948;color:#0a0a0a;font-weight:bold;font-size:14px;padding:4px 8px;');
