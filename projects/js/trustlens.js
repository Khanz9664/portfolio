/* ═══════════════════════════════════════════════════════════════════
   TRUSTLENS CASE STUDY — JAVASCRIPT
   ═══════════════════════════════════════════════════════════════════ */

/* ── Progress Bar ── */
window.addEventListener('scroll', function() {
  var d = document.documentElement;
  var pct = (d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100;
  document.getElementById('tl-progress').style.width = pct + '%';
});

/* ── Scroll Reveal ── */
var revealObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('vis'); revealObs.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.rv').forEach(function(el) { revealObs.observe(el); });

/* ── Counter Animation ── */
function animateCount(el) {
  var target = parseFloat(el.dataset.count);
  var suffix = el.dataset.suf || '';
  var isFloat = String(target).includes('.');
  var dur = 1200;
  var start = performance.now();
  function step(now) {
    var p = Math.min((now - start) / dur, 1);
    var ease = 1 - Math.pow(1 - p, 3);
    var val = target * ease;
    el.textContent = (isFloat ? val.toFixed(2) : Math.round(val)) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
var countObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting && e.target.dataset.count) {
      animateCount(e.target); countObs.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach(function(el) { countObs.observe(el); });

/* ── Score Meter Animation ── */
var scoreEl = document.getElementById('scoreNum');
var scoreObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      var target = 88;
      var dur = 1800;
      var start = performance.now();
      function step(now) {
        var p = Math.min((now - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 4);
        scoreEl.textContent = Math.round(target * ease);
        if (p < 1) requestAnimationFrame(step);
        else scoreEl.style.textShadow = '0 0 40px rgba(0,232,122,.4)';
      }
      requestAnimationFrame(step);
      scoreObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
if (scoreEl) scoreObs.observe(scoreEl.closest('.tl-score-meter') || scoreEl);

/* ── Weight Bars Animation ── */
var weightObs = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.tl-wrow-fill').forEach(function(bar) {
        bar.style.width = bar.dataset.w + '%';
      });
      weightObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.tl-weights-panel').forEach(function(el) { weightObs.observe(el); });

/* ── Subtle hero background number parallax ── */
var heroBgNum = document.querySelector('.tl-hero-bg-num');
if (heroBgNum) {
  window.addEventListener('scroll', function() {
    var scrolled = window.pageYOffset;
    var rate = scrolled * 0.15;
    heroBgNum.style.transform = 'translateY(calc(-50% + ' + rate + 'px))';
  }, { passive: true });
}

/* ── Keyboard navigation hint ── */
document.addEventListener('keydown', function(e) {
  if (e.key === 'ArrowDown') {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
  }
});
/* ═══════════════════════════════════════════════════════════════════
   END JAVASCRIPT
   ═══════════════════════════════════════════════════════════════════ */
