/**
 * Skills Page Specific Logic & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    initSkillsAnimations();
    initSkillBars();
    initCardGlow();
});

/**
 * Cinematic Reveals for Skills Page
 */
function initSkillsAnimations() {
    // 1. Header Reveal (Watermark + Title + Subtitle)
    const headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.skills-header',
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
        .from('.section-subtitle', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6')
        .from('.cta-button-premium', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.4');

    // 2. Skill Card Reveal - Individual Triggers
    gsap.utils.toArray('.skill-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // 3. Tools Reveal - Individual Triggers
    gsap.utils.toArray('.tool-item').forEach(tool => {
        gsap.from(tool, {
            scrollTrigger: {
                trigger: tool,
                start: 'top 95%',
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.2)'
        });
    });
}

/**
 * Animated Progress Bars for Technical Skills
 */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar');
    
    bars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        
        gsap.to(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 95%',
            },
            width: `${progress}%`,
            duration: 2,
            ease: 'expo.out'
        });
    });
}

/**
 * Interactive Mouse-Follow Glow for Cards & Tools
 */
function initCardGlow() {
    const interactiveElements = document.querySelectorAll('.skill-card, .tool-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            el.style.setProperty('--mouse-x', `${x}%`);
            el.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}
