/**
 * Generative Background - Particle Network
 * 
 * Creates a constallation effect that reacts to mouse movement.
 * Optimized for performance: pauses when tab is inactive.
 */

const initGenerativeBackground = () => {
    const container = document.querySelector('.bg-animation');
    if (!container) return;

    // Create Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.innerHTML = ''; // Clear existing DOM particles if any
    container.appendChild(canvas);

    let width, height;
    let particles = [];
    let animationId;

    // Config
    const particleCount = window.innerWidth < 768 ? 40 : 100; // Fewer on mobile
    const connectionDistance = 150;
    const mouseSafetyRadius = 200;

    // Mouse state
    const mouse = { x: null, y: null };

    // Resize Handler
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse Handler
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5; // Velocity X
            this.vy = (Math.random() - 0.5) * 0.5; // Velocity Y
            this.size = Math.random() * 2 + 1;
            this.color = 'rgba(0, 242, 255,'; // Base cyan, opacity varies
        }

        update() {
            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Mouse Interaction (Repel or Attract - lets do faint attraction for "intelligence")
            // Actually, usually "net" effects look better with slight mouse repulsion or just connection
            // Let's do a subtle connection to mouse
            if (mouse.x != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseSafetyRadius) {
                    // Gentle push away if too close
                    if (distance < 50) {
                        this.x -= dx * 0.03;
                        this.y -= dy * 0.03;
                    }
                }
            }

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = `${this.color} 0.5)`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation Loop
    const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Update and Draw Particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw Connections
        connectParticles();

        animationId = requestAnimationFrame(animate);
    };

    const connectParticles = () => {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.strokeStyle = `rgba(0, 242, 255, ${opacity * 0.15})`; // Low opacity cyan
                    ctx.beginPath();
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            // Connect to mouse
            if (mouse.x) {
                const dx = particles[a].x - mouse.x;
                const dy = particles[a].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    ctx.strokeStyle = `rgba(189, 0, 255, ${1 - dist / 150})`; // Violet connection to mouse
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    };

    // Optimization: Pause when hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });

    // Start
    animate();
};

// Initialize on load
document.addEventListener('DOMContentLoaded', initGenerativeBackground);
