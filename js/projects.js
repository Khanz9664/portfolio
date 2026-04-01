/**
 * Projects Page Specific Logic & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initProjectsAnimations();
    initCardGlow();
});

/**
 * Cinematic Reveals for Projects Page
 */
function initProjectsAnimations() {
    // 1. Header Reveal
    const headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 85%',
        }
    });

    headerTimeline
        .from('.header-watermark', {
            scale: 0.9,
            opacity: 0,
            duration: 2,
            ease: 'expo.out'
        })
        .from('.title-part-1', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=1.5')
        .from('.title-part-2', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=0.8')
        .from('.header-separator-line', {
            width: 0,
            duration: 1,
            ease: 'expo.out'
        }, '-=0.6')
        .from('.section-subtitle', {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.4');

    // 2. Project Card Individual Reveals
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });
    });
}

/**
 * Interactive Mouse-Follow Glow (Optimized for Desktop)
 */
function initCardGlow() {
    // Only run on devices that support hover (prevents lag on mobile touch)
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}
