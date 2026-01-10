/**
 * GSAP Animations Manager
 * Handles all complex timeline and scroll-based animations.
 */

const initAnimations = () => {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Animation (Timeline) ---
    const heroTl = gsap.timeline();

    // 1. Navbar Drop (if at top)
    heroTl.from('.top-bar', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: 'power3.out'
    });

    // 2. Profile Image Scale & Fade
    heroTl.from('.profile-image-wrapper', {
        duration: 1.2,
        scale: 0.5,
        opacity: 0,
        rotation: -10,
        ease: 'elastic.out(1, 0.75)'
    }, '-=0.5');

    // 3. Text Scramble / Reveal
    heroTl.from('.hero-title, .hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.8');

    // 4. CTA & Socials
    const ctaLinks = document.querySelectorAll('.cta-wrapper a');
    const socialLinks = document.querySelectorAll('.social-container a');

    if (ctaLinks.length > 0) {
        gsap.from(ctaLinks, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.1
        });
    }

    if (socialLinks.length > 0) {
        gsap.from(socialLinks, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.2
        });
    }


    // --- Generic Image Animations (ScrollTrigger) ---
    // Selects profile images in About/Intro and Project Card images
    const featureImages = document.querySelectorAll('.profile-image, .about-image-wrapper img, .card-image');

    featureImages.forEach(img => {
        // Skip hero profile image as it's handled by timeline
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


    // --- Text Scramble Effect ---
    const scrambleText = (element) => {
        if (!element) return;
        const originalText = element.innerText;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        let iterations = 0;

        const interval = setInterval(() => {
            element.innerText = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);
    };

    // Trigger scramble after hero fade in
    setTimeout(() => {
        const dynamicText = document.querySelector('.dynamic-text');
        if (dynamicText) scrambleText(dynamicText);
    }, 1500); // Delayed to match timeline


    // --- Scroll Triggers ---

    // Sections - General Fade Up
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
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

    // Skill Bars (If present)
    const skillBars = document.querySelectorAll('.skill-bar');
    if (skillBars.length > 0) {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-progress') + '%';
            gsap.fromTo(bar,
                { width: '0%' },
                {
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 90%'
                    },
                    width: width,
                    duration: 1.5,
                    ease: 'power2.out'
                }
            );
        });
    }

    // Project & Expertise Cards (Staggered)
    const cards = document.querySelectorAll('.project-card, .expertise-card, .achievement-card');
    if (cards.length > 0) {
        ScrollTrigger.batch(cards, {
            onEnter: batch => gsap.fromTo(batch,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
            ),
            start: 'top 90%'
        });
    }
};

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', initAnimations);
