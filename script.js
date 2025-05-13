document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  const topBar = document.querySelector('.top-bar');

  // --- Toggle mobile menu ---
  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });

  // --- Close menu on outside click ---
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('open');
    }
  });

  // --- Smooth scroll for internal anchors only ---
  navItems.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          navLinks.classList.remove('active');
          menuToggle.classList.remove('open');
        }
      });
    }
  });

  // --- Highlight active page in nav (multi-page support) ---
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navItems.forEach(link => {
    const hrefPage = link.getAttribute('href').split('/').pop();
    if (hrefPage === currentPage) {
      link.classList.add('active');
    }
  });

  // --- Scroll Spy (for single-page views only) ---
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          link.classList.remove('active');
          if (href === `#${current}`) {
            link.classList.add('active');
          }
        }
      });
    });
  }

  // --- Reveal sections on scroll ---
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
      section.classList.add('section-hidden');
      observer.observe(section);
    });
  }

  // --- Scroll Progress Bar ---
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    topBar.style.background =
  `linear-gradient(90deg, #2e2e2e ${progress}%, rgba(63,77,99,0.85) ${progress}%)`;
  });

  // --- Animate skill bars ---
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress', `${progress}%`);
  });

  // --- Google Sheet contact form ---
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwYYD90tXcX1EmV3HxohFM3fIYhXgMFQJwceLDXt8A7e9j3u1xleqp0vmxdUABN2SNx/exec';
  const form = document.forms['submit-to-google-sheet'];
  const msg = document.getElementById('msg');

  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.innerText = "Sending...";
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(() => {
          msg.innerText = "Message Sent!";
          setTimeout(() => msg.innerText = "", 4000);
          form.reset();
        })
        .catch(error => {
          msg.innerText = "Error! Please try again.";
          console.error('Error!', error.message);
        });
    });
  }

  // --- Back to top button ---
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

