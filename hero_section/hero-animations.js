/**
 * CSA Vietnam Hero Section Animations
 * This script handles all animations for the hero section
 */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Initialize hero section animations
    initHeroAnimations();
    initParallaxEffects();
    initScrollIndicatorAnimation();
});

/**
 * Initialize all hero section entry animations
 */
function initHeroAnimations() {
    // Use SplitType to split hero title text into characters for animation
    const heroTitle = new SplitType(".hero-title", { types: "chars" });

    // Create main timeline for hero section animations
    const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
    });

    // Build the animation sequence
    tl.from(".hero-background-image", {
        opacity: 0,
        scale: 1.1,
        duration: 1.5,
        delay: 0.2,
    })
        .from(
            ".hero-background-overlay",
            {
                opacity: 0,
                duration: 1.5,
            },
            "<"
        ) // Start at the same time as previous animation
        .from(heroTitle.chars, {
            opacity: 0,
            y: 50,
            duration: 0.7,
            stagger: 0.03, // Staggered animation for each character
        })
        .from(
            ".hero-subtitle",
            {
                opacity: 0,
                y: 30,
                duration: 0.6,
            },
            "<0.2"
        ) // Start 0.2s after the title animation begins
        .from(
            ".intro-text",
            {
                opacity: 0,
                y: 20,
                duration: 0.6,
            },
            "<0.2"
        ) // Start 0.2s after subtitle animation begins
        .from(
            ".hero-buttons a",
            {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.15, // Staggered animation for each button
            },
            "<0.2"
        ) // Start 0.2s after intro text animation begins
        .from(
            ".hero-shape.shape-1",
            {
                opacity: 0,
                x: -100,
                rotation: 45,
                duration: 1,
            },
            "0.5"
        ) // Start at 0.5s mark of the timeline
        .from(
            ".hero-shape.shape-2",
            {
                opacity: 0,
                x: 100,
                rotation: -45,
                duration: 1,
            },
            "<0.2"
        ) // Start 0.2s after shape-1 animation begins
        .to(
            ".scroll-indicator",
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
            },
            "<0.5"
        ); // Start 0.5s after shape-2 animation begins

    // Continuous floating animation for decoration shapes
    gsap.to(".hero-shape.shape-1", {
        y: 20,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1, // Infinite repeat
    });

    gsap.to(".hero-shape.shape-2", {
        y: -20,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1, // Infinite repeat
    });
}

/**
 * Initialize parallax effects for scrolling
 */
function initParallaxEffects() {
    // Parallax effect for hero background image
    gsap.to(".hero-background-image", {
        yPercent: 20, // Move image up 20% when scrolling down
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top", // Start when the top of hero section reaches the top of viewport
            end: "bottom top", // End when the bottom of hero section reaches the top of viewport
            scrub: true, // Smooth scrolling animation
        },
    });

    // Subtle parallax effect for entire hero section
    gsap.to(".hero-section", {
        yPercent: 5, // Subtle movement
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.5, // Smoother scrubbing
        },
    });

    // Additional parallax for content (moving slower)
    gsap.to(".hero-content", {
        yPercent: -10, // Move slightly in the opposite direction for enhanced depth
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
        },
    });

    // Parallax for decoration shapes
    gsap.to(".hero-shape.shape-1", {
        yPercent: -30,
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    gsap.to(".hero-shape.shape-2", {
        yPercent: -20,
        xPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });
}

/**
 * Initialize scroll indicator animation
 */
function initScrollIndicatorAnimation() {
    // Use CSS keyframes animation for the dot instead of GSAP
    // as GSAP can't directly target pseudo-elements

    // Fade out the scroll indicator when scrolling down
    gsap.to(".scroll-indicator", {
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "10% top",
            scrub: true,
        },
    });
}
