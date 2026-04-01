/**
 * About Page Specific Logic & Animations
 * Focuses on high-impact narrative reveals and stat counters
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initAboutAnimations();
    initCardGlow();
    initStatCounters();
});

/**
 * Interactive Mouse-Follow Glow for Expertise Cards
 */
function initCardGlow() {
    const cards = document.querySelectorAll('.expertise-card');
    
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

/**
 * Cinematic ScrollReveals for About Page Sections
 */
function initAboutAnimations() {
    // 1. Header & Watermark Reveal
    const headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-header',
            start: 'top 85%',
        }
    });

    headerTimeline
        .from('.header-watermark', {
            scale: 0.8,
            opacity: 0,
            duration: 2.5,
            ease: 'expo.out'
        })
        .from('.title-part-1', {
            x: -100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        }, '-=2')
        .from('.title-part-2', {
            x: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out'
        }, '-=1.2')
        .from('.header-separator-line', {
            width: 0,
            duration: 1,
            ease: 'expo.out'
        }, '-=0.8')
        .from('.about-tagline', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6');

    // 2. Narrative Reveal
    gsap.from('.about-intro-full', {
        scrollTrigger: {
            trigger: '.about-hero-narrative',
            start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
    });

    // 3. Expertise Cards Reveal - Trigger each card individually
    gsap.utils.toArray('.expertise-card').forEach((card) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // 4. Timeline Items Reveal
    gsap.utils.toArray('.timeline-block').forEach((block) => {
        gsap.from(block, {
            scrollTrigger: {
                trigger: block,
                start: 'top 85%',
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

/**
 * Dynamic Counter Animation for Professional Stats
 */
function initStatCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(stat, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: isDecimal ? 0.01 : 1 },
                    ease: 'power2.out',
                    onUpdate: function() {
                        // Ensure suffix like '+' or decimal formatting
                        if (!isDecimal) {
                            stat.innerText = Math.ceil(this.targets()[0].innerText) + '+';
                        }
                    }
                });
            },
            once: true
        });
    });
}
