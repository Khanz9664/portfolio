/**
 * Resume Page Specific Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Staggered reveal for certification cards
    const certCards = document.querySelectorAll('.cert-card');
    if (certCards.length > 0) {
        ScrollTrigger.batch(certCards, {
            onEnter: batch => gsap.fromTo(batch,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power2.out' }
            ),
            start: 'top 90%'
        });
    }

    // Staggered reveal for skill category cards
    const skillCats = document.querySelectorAll('.skill-category-card');
    if (skillCats.length > 0) {
        ScrollTrigger.batch(skillCats, {
            onEnter: batch => gsap.fromTo(batch,
                { x: -20, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' }
            ),
            start: 'top 90%'
        });
    }
});
