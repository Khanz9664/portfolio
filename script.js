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

    // --- Smooth scroll for nav links ---
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

    // --- Highlight active nav link based on page ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navItems.forEach(link => {
        const hrefPage = link.getAttribute('href').split('/').pop();
        if (hrefPage === currentPage) {
            link.classList.add('active');
        }
    });

    // --- Scroll Spy (single-page) ---
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

    // --- Section reveal on scroll (with IntersectionObserver) ---
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
    const skillBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                });
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });

    // Observe skill cards for animations
    document.querySelectorAll('.skill-card').forEach(card => {
        skillBarObserver.observe(card);
    });

    // Add hover effects for skill tags
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Trigger initial animation for visible elements
    setTimeout(() => {
        document.querySelectorAll('.skill-bar').forEach(bar => {
            const rect = bar.getBoundingClientRect();
            const isVisible = rect.top >= 0 && rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth);

            if (isVisible) {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            }
        });
    }, 1000);

    // --- Contact form to Google Sheet ---
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

    // --- Back to top ---
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // === NEW: Animated background particles ===
    function createParticles() {
        const bgAnimation = document.querySelector('.bg-animation');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 15 + 5;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            bgAnimation?.appendChild(particle);
        }
    }

    // === NEW: Scroll-triggered animations for intro & cards ===
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.overview-card, .intro-content');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    // === NEW: Enhanced card hover effects ===
    function initCardEffects() {
        const cards = document.querySelectorAll('.overview-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) scale(1.02)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // === NEW: Smooth scrolling for other # links ===
    function initSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // === Initialize new features ===
    createParticles();
    handleScrollAnimations();
    initCardEffects();
    initSmoothScrolling();

    // === Parallax hero scroll effect ===
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.modern-hero');
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // --- Intersection Observer for animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add hover effect to cards
    document.querySelectorAll('.expertise-card, .achievement-card, .education-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

