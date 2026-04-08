/**
 * Contact Page Specific Logic
 */

// Register ScrollTrigger explicitly
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
    // --- Service Chip Interactivity ---
    const chips = document.querySelectorAll('.chip');
    const serviceInput = document.getElementById('service-input');

    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            if (serviceInput) {
                serviceInput.value = chip.getAttribute('data-value');
            }
        });
    });

    // --- Form Submission (Keep existing Google Sheets logic) ---
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');

    if (form) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwYYD90tXcX1EmV3HxohFM3fIYhXgMFQJwceLDXt8A7e9j3u1xleqp0vmxdUABN2SNx/exec';

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (msg) {
                msg.innerText = "Sending...";
                msg.style.color = '#fff';
            }

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    if (msg) {
                        msg.innerText = "Message Sent Successfully!";
                        msg.style.color = '#fff';
                        setTimeout(() => msg.innerText = "", 5000);
                    }
                    form.reset();
                    // Reset chips to default
                    chips.forEach(c => c.classList.remove('active'));
                    chips[1].classList.add('active'); // AI Solutions default
                })
                .catch(error => {
                    if (msg) {
                        msg.innerText = "Error! Please try again.";
                        msg.style.color = '#ff4444';
                    }
                    console.error('Error!', error.message);
                });
        });
    }

    // --- Cinematic Reveals & Floating Animation ---
    initContactAnimations();
});

/**
 * Cinematic Reveals for Contact Page
 */
function initContactAnimations() {
    const tl = gsap.timeline();

    // Ensure section is visible
    gsap.set('#contact', { opacity: 1, visibility: 'visible' });

    // 1. Initial Header Entry (Maintained from original)
    tl.fromTo('.header-watermark', 
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' }
    )
    .fromTo('.contact-title-main .title-part-1', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 
        '-=1'
    )
    .fromTo('.contact-title-main .title-part-2', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 
        '-=0.7'
    )
    .fromTo('.header-separator-line', 
        { width: 0 },
        { width: 60, duration: 0.8, ease: 'expo.out' }, 
        '-=0.5'
    )
    .fromTo('.section-subtitle', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, 
        '-=0.3'
    )
    // 2. Form Card & Panels Entry
    .fromTo('.contact-form-wrapper', 
        { y: 50, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' }, 
        '-=0.5'
    )
    .fromTo('.form-left-panel', 
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 
        '-=0.8'
    )
    .fromTo('.form-right-panel', 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 
        '-=0.8'
    );

    // 3. Floating Animation for Illustration
    gsap.to('#contactIllustration', {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });

    // 4. Pill Links Staggered Entry
    gsap.fromTo('.channel-pill-link', 
        { y: 40, opacity: 0, scale: 0.9 },
        {
            scrollTrigger: {
                trigger: '.contact-bottom-channels',
                start: 'top 90%',
                once: true
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }
    );

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
}

