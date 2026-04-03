// Canvas math particle animation
      const canvas = document.getElementById('bg-canvas');
      if (canvas) {
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

        for (let i = 0; i < 40; i++) {
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)],
            size: Math.random() * 24 + 12,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.25 + 0.05,
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.01
          });
        }

        function animate() {
          ctx.clearRect(0, 0, width, height);
          particles.forEach(p => {
            p.x += p.speedX; p.y += p.speedY; p.rotation += p.rotSpeed;
            if (p.x > width + 50) p.x = -50; if (p.x < -50) p.x = width + 50;
            if (p.y > height + 50) p.y = -50; if (p.y < -50) p.y = height + 50;

            ctx.save();
            ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
            ctx.fillStyle = `rgba(0, 200, 255, ${p.opacity})`;
            ctx.font = `italic ${p.size}px "Times New Roman", serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(p.symbol, 0, 0);
            ctx.restore();
          });
          requestAnimationFrame(animate);
        }
        animate();
      }

      // Scroll Animations using Intersection Observer
      document.addEventListener('DOMContentLoaded', () => {
        const sections = document.querySelectorAll('.section');
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

        sections.forEach(sec => observer.observe(sec));
      });