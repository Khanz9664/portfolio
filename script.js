document.addEventListener('DOMContentLoaded', () => {
  // Create and append mobile menu toggle
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector('.top-bar').appendChild(menuToggle);

  const navLinks = document.querySelector('.nav-links');

  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.classList.remove('active');
      }
    });
  });

  // Reveal sections on scroll
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

  // Scroll progress bar on top bar
  window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress     = (scrollTop / scrollHeight) * 100;
    document.querySelector('.top-bar').style.background =
      `linear-gradient(90deg, var(--primary-color) ${progress}%, var(--darker-bg) ${progress}%)`;
  });

  // Animate skill progress bars
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.setProperty('--progress', `${progress}%`);
  });

  // Google Sheet contact form handling
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwYYD90tXcX1EmV3HxohFM3fIYhXgMFQJwceLDXt8A7e9j3u1xleqp0vmxdUABN2SNx/exec';
  const form      = document.forms['submit-to-google-sheet'];
  const msg       = document.getElementById('msg');

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

  // Smooth scroll to top
  document.querySelector('.back-to-top')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

