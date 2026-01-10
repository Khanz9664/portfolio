/**
 * Enhanced Coder Animation - Canvas
 * Drop-in replacement for existing coder animation
 * No external dependencies
 */

class CoderAnimation {
    constructor() {
        this.canvas = document.getElementById('coderCanvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        this.time = 0;
        this.particles = [];
        this.codeScroll = 0;

        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight || 420;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    /* ---------- Environment ---------- */

    drawChair(x, y, s) {
        const c = this.ctx;
        c.fillStyle = '#1e293b';

        c.fillRect(x - 42 * s, y + 50 * s, 84 * s, 10 * s); // seat
        c.fillRect(x - 48 * s, y - 30 * s, 10 * s, 90 * s); // back
        c.fillRect(x - 10 * s, y + 60 * s, 10 * s, 55 * s); // leg
        c.fillRect(x - 35 * s, y + 115 * s, 60 * s, 6 * s); // base
    }

    drawTable(x, y, s) {
        const c = this.ctx;

        // shadow
        c.fillStyle = 'rgba(0,0,0,0.2)';
        c.fillRect(x + 20 * s, y + 28 * s, 130 * s, 6 * s);

        // top
        c.fillStyle = '#475569';
        c.fillRect(x + 20 * s, y + 20 * s, 130 * s, 10 * s);

        // leg
        c.fillRect(x + 135 * s, y + 30 * s, 10 * s, 90 * s);
    }

    drawLaptop(x, y, s) {
        const c = this.ctx;

        // base
        c.fillStyle = '#94a3b8';
        c.fillRect(x + 55 * s, y + 15 * s, 45 * s, 6 * s);

        // screen shell
        c.fillStyle = '#334155';
        c.fillRect(x + 55 * s, y - 32 * s, 45 * s, 47 * s);

        // glow
        const pulse = Math.sin(this.time * 2) * 0.15 + 0.85;
        const g = c.createLinearGradient(0, y - 32 * s, 0, y + 15 * s);
        g.addColorStop(0, `rgba(0,242,255,${pulse})`);
        g.addColorStop(1, 'rgba(0,120,160,0.6)');
        c.fillStyle = g;
        c.fillRect(x + 58 * s, y - 29 * s, 39 * s, 41 * s);

        // code lines
        c.fillStyle = 'rgba(255,255,255,0.9)';
        for (let i = 0; i < 6; i++) {
            const offset = (this.codeScroll + i * 8) % 40;
            c.fillRect(
                x + 60 * s,
                y - 25 * s + offset,
                (18 + Math.sin(i) * 10) * s,
                2 * s
            );
        }
        this.codeScroll += 0.3;
    }

    /* ---------- Person ---------- */

    drawPerson(x, y, s) {
        const c = this.ctx;
        const breath = Math.sin(this.time) * 2;
        const blink = Math.sin(this.time * 1.2) > 0.95 ? 2 : 6;

        // head
        c.fillStyle = '#f1f5f9';
        c.beginPath();
        c.arc(x, y - 58 * s + breath, 15 * s, 0, Math.PI * 2);
        c.fill();

        // eyes
        c.fillStyle = '#020617';
        c.fillRect(x - 5 * s, y - 60 * s + breath, 3 * s, blink * s);
        c.fillRect(x + 2 * s, y - 60 * s + breath, 3 * s, blink * s);

        // neck
        c.fillRect(x - 4 * s, y - 43 * s + breath, 8 * s, 8 * s);

        // torso
        c.fillStyle = '#0ea5e9';
        c.beginPath();
        c.moveTo(x - 22 * s, y - 35 * s + breath);
        c.lineTo(x + 22 * s, y - 35 * s + breath);
        c.lineTo(x + 30 * s, y + 50 * s);
        c.lineTo(x - 30 * s, y + 50 * s);
        c.closePath();
        c.fill();

        // arms (typing)
        const type = Math.sin(this.time * 8) * 3;
        c.strokeStyle = '#f1f5f9';
        c.lineWidth = 6 * s;
        c.lineCap = 'round';

        // left arm
        c.beginPath();
        c.moveTo(x - 15 * s, y - 25 * s + breath);
        c.lineTo(x + 15 * s, y + 5 * s);
        c.lineTo(x + 45 * s, y + 15 * s + type);
        c.stroke();

        // right arm
        c.beginPath();
        c.moveTo(x + 15 * s, y - 25 * s + breath);
        c.lineTo(x + 25 * s, y + 5 * s);
        c.lineTo(x + 55 * s, y + 15 * s - type);
        c.stroke();

        // legs
        c.strokeStyle = '#1e293b';
        c.lineWidth = 8 * s;
        c.beginPath();
        c.moveTo(x - 10 * s, y + 50 * s);
        c.lineTo(x + 30 * s, y + 55 * s);
        c.lineTo(x + 30 * s, y + 95 * s);
        c.stroke();
    }

    /* ---------- Particles ---------- */

    createParticle() {
        if (Math.random() > 0.96) {
            const s = Math.min(this.width, this.height) / 400;
            this.particles.push({
                x: this.width / 2 + 80 * s,
                y: this.height / 2,
                vx: (Math.random() - 0.5) * 0.6,
                vy: -Math.random() * 1.5,
                life: 1,
                char: ['{', '}', ';', '0', '1', '<', '>'][Math.floor(Math.random() * 7)]
            });
        }
    }

    drawParticles() {
        const c = this.ctx;
        c.font = '12px monospace';
        c.fillStyle = '#00f2ff';

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            c.globalAlpha = p.life;
            c.fillText(p.char, p.x, p.y);
            c.globalAlpha = 1;

            if (p.life <= 0) this.particles.splice(i, 1);
        }
    }

    animate() {
        this.time += 0.05;
        this.ctx.clearRect(0, 0, this.width, this.height);

        const s = Math.min(this.width, this.height) / 320;
        const x = this.width / 2 - 50 * s;
        const y = this.height / 2;

        this.drawChair(x, y, s);
        this.drawPerson(x, y, s);
        this.drawTable(x, y, s);
        this.drawLaptop(x, y, s);

        this.createParticle();
        this.drawParticles();

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('coderCanvas')) {
        new CoderAnimation();
    }
});
