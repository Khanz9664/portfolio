document.addEventListener('DOMContentLoaded', () => {
    // 0. Register GSAP ScrollTrigger & Initialize Header Animations
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initArticlesAnimations();
    }

    // 1. Math Background Canvas Animation
    const canvas = document.createElement('canvas');
    canvas.id = 'math-canvas';
    // Insert behind main background
    const bgContainer = document.querySelector('.bg-animation');
    if(bgContainer) {
        bgContainer.appendChild(canvas);
    } else {
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const mathSymbols = ['∫', 'Σ', '∇', '∂', '∞', '∆', 'θ', 'λ', 'β', 'σ', 'π', 'μ', '≈'];
    const particles = [];

    // Create particles
    for(let i=0; i<30; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
            size: Math.random() * 20 + 10,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.3 + 0.1,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.01
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotSpeed;

            // Wrap around
            if (p.x > width + 50) p.x = -50;
            if (p.x < -50) p.x = width + 50;
            if (p.y > height + 50) p.y = -50;
            if (p.y < -50) p.y = height + 50;

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.fillStyle = `rgba(0, 200, 255, ${p.opacity})`;
            ctx.font = `italic ${p.size}px "Times New Roman", serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.symbol, 0, 0);
            ctx.restore();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // 2. Scroll Reveal Animation for Cards
    const cards = document.querySelectorAll('.article-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => cardObserver.observe(card));

    // 3. Search and Filter Functionality
    const searchInput = document.getElementById('article-search');
    const filterPills = document.querySelectorAll('.pill');

    function filterArticles() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activePill = document.querySelector('.pill.active');
        const activeFilter = activePill ? activePill.dataset.filter : 'all';

        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || category === activeFilter;

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                // Small delay to allow display flex to apply before opacity transition
                setTimeout(() => card.classList.add('visible'), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterArticles);
    }

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterArticles();
        });
    });
});

/**
 * Cinematic Reveal Animation for Articles Header
 */
function initArticlesAnimations() {
    const headerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.hub-header',
            start: 'top 85%',
        }
    });

    headerTimeline
        .from('.header-watermark', {
            scale: 0.8,
            opacity: 0,
            duration: 2,
            ease: 'expo.out'
        })
        .from('.title-part-1', {
            x: -50,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=1.5')
        .from('.title-part-2', {
            x: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power4.out'
        }, '-=1.0')
        .from('.header-separator-line', {
            width: 0,
            duration: 1,
            ease: 'expo.out'
        }, '-=0.8')
        .from('.hub-tagline', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.6');
}
