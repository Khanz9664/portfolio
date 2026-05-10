/* ═══════════════════════════════════════════════════════════════════
   TRUSTLENS CASE STUDY — PREMIUM GSAP ANIMATIONS
   ═══════════════════════════════════════════════════════════════════ */

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollAnimations();
    initInteractiveElements();
    initProgressTracking();
});

/* ── Progress Bar ── */
function initProgressTracking() {
    gsap.to('#tl-progress', {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.1
        }
    });
}

/* ── Hero Section Animations ── */
function initHeroAnimations() {
    const tl = gsap.timeline();

    // Reset initial states
    gsap.set(['.tl-eyebrow', '.tl-hero h1', '.tl-hero-deck', '.tl-hero-cta', '.tl-hero-meta'], { 
        opacity: 0, 
        y: 60,
        filter: 'blur(10px)'
    });

    tl.to('.tl-eyebrow', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' })
      .to('.tl-hero h1', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out' }, '-=0.7')
      .to('.tl-hero-deck', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'expo.out' }, '-=1')
      .to('.tl-hero-cta', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' }, '-=1')
      .to('.tl-hero-meta', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'expo.out' }, '-=0.8');

    // Energy Orbs subtle mouse reaction
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 40;
        const y = (clientY / window.innerHeight - 0.5) * 40;
        
        gsap.to('.tl-orb', {
            x: (i) => x * (i + 1) * 0.5,
            y: (i) => y * (i + 1) * 0.5,
            duration: 2,
            ease: 'power2.out'
        });
    });

    // Floating background number
    gsap.to('.tl-hero-bg-num', {
        y: '+=40',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Parallax for background number on scroll
    gsap.to('.tl-hero-bg-num', {
        y: '20%',
        scrollTrigger: {
            trigger: '.tl-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // Hero Meta Items Stagger
    tl.from('.tl-meta-item', {
        opacity: 0,
        scale: 0.9,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.4');

    // Counter animation for LOC (~10K)
    const locVal = document.querySelector('.tl-meta-val[data-count="10130"]');
    if (locVal) {
        tl.to({}, {
            duration: 2,
            onStart: () => animateValue(locVal, 0, 10130, 2000, '~', 'K')
        }, '-=1');
    }
}

/* ── Scroll Reveal Animations ── */
function initScrollAnimations() {
    // Standard section reveals
    gsap.utils.toArray('.tl-section').forEach(section => {
        const elements = section.querySelectorAll('.tl-label, .tl-title, .tl-lead, .tl-verdict-box, .tl-failure-dive, .tl-crime, .tl-pipe-step, .tl-blocker');
        
        if (elements.length > 0) {
            gsap.from(elements, {
                opacity: 0,
                y: 30,
                filter: 'blur(10px)',
                duration: 1.5,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });

    // CRITICAL FIX: Direct animation for benchmarking and diagnostic cards
    const gridElements = document.querySelectorAll('.tl-comp-card, .tl-mod, .tl-summary-card, .tl-terminal');
    gridElements.forEach(el => {
        // Force visibility before GSAP takes over
        el.style.visibility = 'visible';
        el.style.opacity = '1';

        gsap.from(el, {
            opacity: 0,
            y: 50,
            scale: 0.95,
            filter: 'blur(10px)',
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                toggleActions: 'play none none none'
            }
        });
    });

    // Score Meter Animation
    const scoreMeter = document.querySelector('.tl-score-meter');
    if (scoreMeter) {
        gsap.from(scoreMeter, {
            opacity: 0,
            scale: 0.95,
            duration: 1.5,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: scoreMeter,
                start: 'top 80%',
                onEnter: () => {
                    const scoreNum = document.getElementById('scoreNum');
                    if (scoreNum) animateValue(scoreNum, 0, 88, 2000);
                    
                    // Animate weight bars
                    gsap.to('.tl-wrow-fill', {
                        width: (i, el) => el.dataset.w + '%',
                        duration: 2,
                        stagger: 0.2,
                        ease: 'expo.out'
                    });
                }
            }
        });
    }
}

/* ── Interactive Elements ── */
function initInteractiveElements() {
    // Magnetic effect for cards and buttons
    const magneticElements = document.querySelectorAll('.tl-mod, .tl-comp-card, .tl-btn-primary, .tl-btn-ghost');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            gsap.to(el, {
                rotateY: x * 10,
                rotateX: -y * 10,
                x: x * 15,
                y: y * 15,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                rotateY: 0,
                rotateX: 0,
                x: 0,
                y: 0,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // Custom Cursor "Lens" Effect
    const cursor = document.createElement('div');
    cursor.className = 'tl-cursor-lens';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
}

/* ── Helper: Animate Value ── */
function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(ease * (end - start) + start);
        
        if (prefix === '~' && suffix === 'K') {
            obj.innerHTML = `~${Math.round(current/1000)}K`;
        } else {
            obj.innerHTML = prefix + current + suffix;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else if (obj.id === 'scoreNum') {
            obj.style.textShadow = '0 0 40px rgba(0,232,122,.4)';
        }
    };
    window.requestAnimationFrame(step);
}
