/**
 * Main Script
 * Handles UI interactions (Mobile Menu, Forms, Navigation) using vanilla JS.
 * Visual animations are handled by js/animations.js and js/generative-bg.js.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation & Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    const topBar = document.querySelector('.top-bar');

    // Toggle Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking a link
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && menuToggle && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('open');
            document.body.classList.remove('no-scroll');
        }
    });

    // --- Active Link Highlighting ---
    const highlightActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navItems.forEach(link => {
            const href = link.getAttribute('href');
            // Simple check: if href matches current page filename
            if (href === currentPage || (currentPage === 'index.html' && href === './')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };
    highlightActiveLink();


    // --- Form Submission (Google Sheets) ---
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');

    if (form) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwYYD90tXcX1EmV3HxohFM3fIYhXgMFQJwceLDXt8A7e9j3u1xleqp0vmxdUABN2SNx/exec';

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (msg) msg.innerText = "Sending...";

            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    if (msg) {
                        msg.innerText = "Message Sent Successfully!";
                        msg.style.color = 'var(--accent-cyan)';
                        setTimeout(() => msg.innerText = "", 5000);
                    }
                    form.reset();
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

    // --- Back to Top ---
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Navbar Scroll Effect ---
    // Make navbar transparent at top, blurred background on scroll
    const handleNavScroll = () => {
        if (window.scrollY > 50) {
            topBar?.classList.add('scrolled');
            topBar.style.background = 'rgba(5, 5, 5, 0.85)';
        } else {
            topBar?.classList.remove('scrolled');
            topBar.style.background = 'transparent'; // Clean look at top
        }
    };
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Init
});
