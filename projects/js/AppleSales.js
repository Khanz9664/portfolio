document.addEventListener("DOMContentLoaded", () => {
  // Reveal Animations
  const reveals = document.querySelectorAll(".rv");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("vis");
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserver.observe(el));

  // ==========================
  // Tabs System
  // ==========================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");

      const pane = document.getElementById(target);
      if (pane) pane.classList.add("active");
    });
  });

  // ==========================
  // Revenue Bar Animation (FIXED)
  // ==========================
  const bars = document.querySelectorAll(".rb-fill");

  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // fallback safety
        const width = el.dataset.w || 60;

        setTimeout(() => {
          el.style.width = width + "%";
        }, 200);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => barObserver.observe(bar));

});
