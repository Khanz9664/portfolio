/**
 * Common JavaScript
 * Handles shared UI interactions (Navigation, Scroll Effects, Global Animations)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation & Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const topBar = document.querySelector('.top-bar');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });
    }

    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (navLinks && menuToggle && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }
    });

    // --- Active Link Highlighting ---
    const highlightActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href === './')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    highlightActiveLink();

    // --- Navbar Scroll Effect ---
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            topBar?.classList.add('scrolled');
        } else {
            topBar?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    // --- Back to Top ---
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Global GSAP Animations ---
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Sections - General Fade Up
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section.id === 'contact') return;
            gsap.fromTo(section,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out'
                }
            );
        });

        // Generic Image Animations
        const featureImages = document.querySelectorAll('.profile-image, .about-image-wrapper img, .card-image');
        featureImages.forEach(img => {
            if (img.closest('.hero-content')) return;

            gsap.fromTo(img,
                { scale: 0.8, opacity: 0, filter: 'blur(10px)' },
                {
                    scrollTrigger: {
                        trigger: img,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 1.2,
                    scale: 1,
                    opacity: 1,
                    filter: 'blur(0px)',
                    ease: 'power2.out'
                }
            );
        });

        // Magnetic Button Interaction
        const magneticBtns = document.querySelectorAll('.cinema-btn, .cta-button, .explore-btn');
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                
                const span = btn.querySelector('span');
                if (span) {
                    gsap.to(span, {
                        x: x * 0.15,
                        y: y * 0.15,
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.3)'
                });
                const span = btn.querySelector('span');
                if (span) {
                    gsap.to(span, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.3)'
                    });
                }
            });
        });
    }
});
