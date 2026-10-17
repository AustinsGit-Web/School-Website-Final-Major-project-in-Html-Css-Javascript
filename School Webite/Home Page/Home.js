

// ----- Automatic Image Slider -----
const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll("img");
const navLinks = document.querySelectorAll(".slider-nav a");

let current = 0;
let autoScroll;

// Scroll smoothly to a given slide index
function goToSlide(index) {
    slider.scrollTo({
        left: slides[index].offsetLeft - slider.offsetLeft,
        behavior: "smooth"
    });
}

// Move to the next slide (loops back to the first one)
function nextSlide() {
    current = (current + 1) % slides.length;
    goToSlide(current);
}

// Start the automatic sliding (every 3 seconds)
function startAutoScroll() {
    stopAutoScroll();
    autoScroll = setInterval(nextSlide, 3000);
}

// Stop the automatic sliding
function stopAutoScroll() {
    clearInterval(autoScroll);
}

// Keep track of which slide is visible when user scrolls/clicks a dot
function updateCurrentSlide() {
    const slideWidth = slides[0].offsetWidth;
    current = Math.round(slider.scrollLeft / slideWidth) % slides.length;
}

// Highlight the active dot
function updateDots() {
    navLinks.forEach((link, i) => {
        link.classList.toggle("active", i === current);
    });
}

// Pause auto-scroll while the user hovers over the slider
slider.addEventListener("mouseenter", stopAutoScroll);
slider.addEventListener("mouseleave", () => {
    updateCurrentSlide();
    startAutoScroll();
});

// Support manual navigation with the dots
navLinks.forEach((link, i) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        current = i;
        goToSlide(current);
        updateDots();
    });
});

// Sync dots while scrolling (including the smooth automatic scrolls)
slider.addEventListener("scroll", () => {
    updateCurrentSlide();
    updateDots();
});

// Kick everything off
updateDots();
startAutoScroll();



document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    if (!nav || !toggle) return;

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("menu-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            nav.classList.remove("menu-open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
});