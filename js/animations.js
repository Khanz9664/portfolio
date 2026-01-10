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

    // Profile Image Scale & Fade
    heroTl.from('.profile-image-wrapper', {
        duration: 1.2,
        scale: 0.8,
        opacity: 0,
        ease: 'power3.out'
    });

    // Text Scramble / Reveal
    heroTl.from('.hero-title, .hero-description', {
        duration: 1,
        y: 30,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.5');

    // CTA & Socials
    const ctaLinks = document.querySelectorAll('.cta-wrapper a');
    const socialLinks = document.querySelectorAll('.social-container a');

    if (ctaLinks.length > 0) {
        gsap.from(ctaLinks, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.2
        });
    }

    if (socialLinks.length > 0) {
        gsap.from(socialLinks, {
            duration: 0.8,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            delay: 0.4
        });
    }


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
    }, 1000); // Fixed delay since timeline call might depend on strict sequencing


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
