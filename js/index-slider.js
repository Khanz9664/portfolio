/**
 * Advanced Double Slider Logic
 * Full-background, synchronized overlays, preview window, and hold-to-pause
 */

document.addEventListener('DOMContentLoaded', () => {
    const bgTrack = document.querySelector('.slider-bg-track');
    const detailsTrack = document.querySelector('.slider-details-track');
    const previewTrack = document.querySelector('.preview-track');
    const progressBar = document.getElementById('slider-progress');
    const mainNext = document.getElementById('main-next');
    const mainPrev = document.getElementById('main-prev');
    const previewWindow = document.getElementById('next-slide-preview');
    const sliderWrapper = document.getElementById('project-slider-main');

    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.bg-slide-item').length;
    let autoSlideInterval;
    let progressInterval;
    let progress = 0;
    const slideDuration = 6000; // 6 seconds
    const progressStep = 100 / (slideDuration / 100); // Update every 100ms

    function updateSliders(index) {
        const offset = index * 100;
        bgTrack.style.transform = `translate3d(-${offset}%, 0, 0)`;
        detailsTrack.style.transform = `translate3d(-${offset}%, 0, 0)`;
        previewTrack.style.transform = `translate3d(-${offset}%, 0, 0)`;

        // Custom "simultaneous click" logic as requested
        const hiddenNextBg = document.getElementById('hidden-next-bg');
        const hiddenNextDetails = document.getElementById('hidden-next-details');
        if (hiddenNextBg) hiddenNextBg.click();
        if (hiddenNextDetails) hiddenNextDetails.click();

        resetProgress();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSliders(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSliders(currentIndex);
    }

    function startAutoSlide() {
        stopAutoSlide(); // Clear existing
        autoSlideInterval = setInterval(nextSlide, slideDuration);

        progressInterval = setInterval(() => {
            progress += progressStep;
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                progress = 0;
            }
        }, 100);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        clearInterval(progressInterval);
    }

    function resetProgress() {
        progress = 0;
        if (progressBar) progressBar.style.width = '0%';
    }

    // Event Listeners
    if (mainNext) mainNext.addEventListener('click', nextSlide);
    if (mainPrev) mainPrev.addEventListener('click', prevSlide);
    if (previewWindow) previewWindow.addEventListener('click', nextSlide);

    // Hold to pause functionality
    const handleDown = () => {
        stopAutoSlide();
        if (progressBar) progressBar.style.opacity = '0.5';
    };

    const handleUp = () => {
        startAutoSlide();
        if (progressBar) progressBar.style.opacity = '1';
    };

    if (sliderWrapper) {
        sliderWrapper.addEventListener('mousedown', handleDown);
        sliderWrapper.addEventListener('mouseup', handleUp);
        sliderWrapper.addEventListener('mouseleave', handleUp);

        // Touch support
        sliderWrapper.addEventListener('touchstart', handleDown, { passive: true });
        sliderWrapper.addEventListener('touchend', handleUp, { passive: true });
    }

    // Initialize
    startAutoSlide();

    // For debugging the hidden triggers
    document.getElementById('hidden-next-bg')?.addEventListener('click', () => console.log('Sync: Background triggered'));
    document.getElementById('hidden-next-details')?.addEventListener('click', () => console.log('Sync: Details triggered'));
});
