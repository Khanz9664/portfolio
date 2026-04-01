/**
 * Index Page Specific Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    // --- Ultra-Premium Hero Animation (Timeline) ---
    const heroTl = gsap.timeline();

    // 1. Initial State Setup
    gsap.set('.hero-portrait', { x: 50, opacity: 0, scale: 1.1 });
    gsap.set('.hero-main-text > *', { y: 30, opacity: 0 });
    gsap.set('.authority-bar', { opacity: 0, y: 50 });

    // 2. Navbar Reveal (Already in common.js, but heroTl needs it for sequencing if desired)
    // Actually, common.js handles the navbar reveal usually, but animations.js had it here.
    // I'll keep it here for exact replication of the existing timeline.
    heroTl.from('.top-bar', {
        duration: 1.2,
        y: -100,
        opacity: 0,
        ease: 'power4.out'
    });

    // 3. Main Elements Reveal
    heroTl.to('.hero-portrait', {
        duration: 1.8,
        x: 0,
        opacity: 1,
        scale: 1,
        ease: 'expo.out'
    }, '-=0.5');

    heroTl.to('.hero-main-text > *', {
        duration: 1,
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: 'power3.out'
    }, '-=1.2');

    heroTl.to('.authority-bar', {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: 'power2.out'
    }, '-=0.8');

    // 4. Stat Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const obj = { value: 0 };
        heroTl.to(obj, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
                stat.innerText = Math.ceil(obj.value).toString().padStart(2, '0');
            }
        }, '-=0.5');
    });

    // --- Personal Narrative Animation ---
    const narrativeWords = document.querySelectorAll('.word-reveal');
    if (narrativeWords.length > 0) {
        gsap.from(narrativeWords, {
            scrollTrigger: {
                trigger: '.personal-intro',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: 'expo.out'
        });

        // Watermark drift
        gsap.fromTo('.intro-watermark', 
            { x: -50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.personal-intro',
                    start: 'top 80%',
                    scrub: 1
                },
                x: 50,
                opacity: 0.3,
                ease: 'none'
            }
        );

        // --- Premium Section Headers Animation ---
        gsap.utils.toArray('.section-header-premium').forEach(header => {
            gsap.fromTo(header.querySelector('h2'), 
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 85%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }
            );

            gsap.fromTo(header.querySelector('p'), 
                { y: 20, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.out'
                }
            );
        });

        // --- Overview Title Animation ---
        gsap.fromTo('.overview-title', 
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: '.overview-title',
                    start: 'top 85%',
                },
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }
        );
    }

    // --- Multi-Layered Parallax Handler ---
    const parallaxItems = document.querySelectorAll('[data-parallax-speed]');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxItems.forEach(item => {
            const speed = item.getAttribute('data-parallax-speed');
            const yPos = -(scrolled * speed);
            gsap.to(item, {
                y: yPos,
                duration: 0.5,
                ease: 'power1.out',
                overwrite: 'auto'
            });
        });
    });
});
