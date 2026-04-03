// ==========================
// Progress Bar
// ==========================
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / height) * 100;

  document.getElementById("progress-bar").style.width = progress + "%";
});


// ==========================
// Reveal on Scroll
// ==========================
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));


// ==========================
// Counter Animation
// ==========================
const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";

      let count = 0;
      const step = target / 60;

      const update = () => {
        count += step;
        if (count < target) {
          el.innerText = count.toFixed(2) + suffix;
          requestAnimationFrame(update);
        } else {
          el.innerText = target + suffix;
        }
      };

      update();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));


// ==========================
// SHAP Bar Animation
// ==========================
const shapBars = document.querySelectorAll(".shap-bar");

const shapObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.width + "%";
    }
  });
}, { threshold: 0.4 });

shapBars.forEach(el => shapObserver.observe(el));
