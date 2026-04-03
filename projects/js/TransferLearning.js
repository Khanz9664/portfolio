// ==========================
// Scroll Progress Bar
// ==========================
window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = (scrollTop / height) * 100;

  document.getElementById("prog").style.width = progress + "%";
});


// ==========================
// Reveal on Scroll
// ==========================
const reveals = document.querySelectorAll(".rv");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("vis");
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));


// ==========================
// Counter Animation
// ==========================
const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suf || "";

      let count = 0;
      const increment = target / 60;

      const update = () => {
        count += increment;
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


// Pixel deletion chart animation
const chartObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      // Animate line draw
      ['vggLine','vitLine'].forEach(id => {
        const el = document.getElementById(id);
        if(el) {
          const len = el.getTotalLength ? el.getTotalLength() : 700;
          el.style.strokeDasharray = len;
          el.style.strokeDashoffset = len;
          el.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(0.22, 0.61, 0.36, 1) 0.2s';
          el.style.strokeDashoffset = '0';
        }
      });
      // Fade area fills
      setTimeout(() => {
        const vggA = document.getElementById('vggArea');
        const vitA = document.getElementById('vitArea');
        if (vggA) {
          vggA.style.transition = 'opacity 0.8s ease';
          vggA.style.opacity = '0.06';
        }
        if (vitA) {
          vitA.style.transition = 'opacity 0.8s ease';
          vitA.style.opacity = '0.06';
        }
      }, 1800);
      // Fade dots
      setTimeout(() => {
        document.querySelectorAll('.vgg-dot,.vit-dot').forEach((d, i) => {
          setTimeout(() => {
            d.style.transition = 'opacity 0.3s';
            d.style.opacity = '1';
          }, i * 150);
        });
      }, 1600);
      chartObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const pdel = document.querySelector('.pdel-wrap');
if(pdel) chartObs.observe(pdel);

// ==========================
// Class Bar Animation
// ==========================
const bars = document.querySelectorAll(".cb-fill, .sdim-fill");

const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.w + "%";
    }
  });
}, { threshold: 0.1 });

bars.forEach(el => barObserver.observe(el));


// (Smooth Scroll handled by global common.js or browser default)
