/**
 * TrustLens Showcase Animations
 * Uses GSAP for high-end motion effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Ensure GSAP is loaded
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Header Animations
    const headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.trustlens-header',
            start: 'top 80%',
        }
    });

    headerTimeline
        .from('.trustlens-title', { y: 50, opacity: 0, duration: 1, ease: 'power4.out' })
        .from('.trustlens-subtitle', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.trustlens-tagline', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

    // 2. Hero Card Animations
    gsap.from('.trustlens-hero-card', {
        scrollTrigger: {
            trigger: '.trustlens-hero-card',
            start: 'top 75%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out'
    });

    // Animate Trust Score Bar
    gsap.to('.score-bar-fill', {
        scrollTrigger: {
            trigger: '.trust-score-visual',
            start: 'top 85%',
        },
        width: '88%',
        duration: 2,
        ease: 'power4.out'
    });


    // 4. Code Terminal Typing Animation
    const codeLines = document.querySelectorAll('.code-line');
    const terminalTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.terminal-window',
            start: 'top 70%',
        }
    });

    codeLines.forEach((line, index) => {
        terminalTimeline.to(line, {
            opacity: 1,
            duration: 0.1,
            delay: index === 0 ? 0.5 : 0.2
        });
    });

    terminalTimeline.from('.terminal-output', {
        opacity: 0,
        y: 10,
        duration: 0.5
    }, '+=0.5');
});
