// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

// Establish default animation settings
gsap.defaults({
    ease: "power2.out",
    duration: 0.8,
    overwrite: "auto", // Better handling of overlapping animations
});

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Show years and animate text with improved transitions
    const textTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".timeline-wrapper",
            start: "top 80%",
            end: "bottom 80%",
            scrub: 0.5, // Smoother scrubbing
            toggleActions: "play none none reverse", // Better control
        },
    });

    // Create a staggered reveal animation for the year labels
    textTimeline
        .fromTo(
            ".text01",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2 },
            0
        )
        .fromTo(
            ".text02",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2 },
            0.1
        )
        .fromTo(
            ".text03",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2 },
            0.2
        )
        .fromTo(
            ".text04",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2 },
            0.3
        )
        .fromTo(
            ".text05",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2 },
            0.4
        )
        .fromTo(
            ".text06",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2 },
            0.5
        )
        .fromTo(
            ".text07",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.2 },
            0.6
        ); // Enhanced animation for line drawing and marker movement
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".timeline-wrapper",
            start: "top center",
            end: "bottom center",
            scrub: 0.6, // Smoother scrubbing for better motion
            pin: "#svg-container",
            pinSpacing: false,
            anticipatePin: 1, // Smoother pinning
        },
    });

    // Create a more dramatic reveal for the vertical line
    mainTimeline
        // Animate the marker with a custom bounce effect
        .fromTo(
            ".activeMarker",
            { autoAlpha: 0, scale: 0.5 },
            {
                autoAlpha: 1,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.7)",
            },
            0
        )
        // Animate the line drawing with eased timing
        .from(
            ".verticalLine",
            { drawSVG: "0%", duration: 0.8, ease: "power2.inOut" },
            0
        )
        // Smooth movement of the active marker along the timeline
        .to(
            ".activeMarker",
            {
                cy: 750, // Move from first (2018) to last point (2025)
                cx: 120, // Maintain alignment with the vertical line
                duration: 1,
                ease: "power1.inOut", // Smoother movement
                clearProps: "scale", // Prevent scale from persisting
            },
            0
        ); // Get all timeline items
    const timelineItems = document.querySelectorAll(".timeline-item");

    // Preload images for smoother transitions
    const preloadImages = () => {
        const images = document.querySelectorAll(".timeline-image");
        images.forEach((img) => {
            if (img.src) {
                const preloadLink = document.createElement("link");
                preloadLink.href = img.src;
                preloadLink.rel = "preload";
                preloadLink.as = "image";
                document.head.appendChild(preloadLink);
            }
        });
    };
    preloadImages();

    // Process each timeline item with enhanced animations
    timelineItems.forEach((item, index) => {
        const year = item.getAttribute("data-year");
        const content = item.querySelector(".timeline-content");
        const image = item.querySelector(".timeline-image");
        const children = content ? content.children : [];

        // Set initial states with more dynamic properties
        gsap.set(content, {
            opacity: 0,
            y: 60,
            rotateX: "10deg", // Add subtle 3D effect
            transformOrigin: "center bottom",
        });

        gsap.set(image, {
            opacity: 0,
            y: 60,
            scale: 0.92, // Start slightly smaller
            transformOrigin: "center center",
        });

        // Create staggered animation for content children
        if (children.length) {
            gsap.set(children, { opacity: 0, y: 20 });
        }

        ScrollTrigger.create({
            trigger: item,
            start: "top 70%",
            end: "bottom 30%",
            toggleClass: { targets: item, className: "active" },
            onEnter: () => {
                // Create a timeline for this section's animations
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out", duration: 0.8 },
                });

                // Animate content with 3D effect
                tl.to(content, {
                    opacity: 1,
                    y: 0,
                    rotateX: "0deg",
                    clearProps: "transform", // Clean up transforms after animation
                    ease: "power2.out",
                });

                // Animate image with subtle zoom
                tl.to(
                    image,
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power2.out",
                    },
                    "-=0.6"
                ); // Overlap with content animation

                // Stagger animate content children
                if (children.length) {
                    tl.to(
                        children,
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.1, // Staggered effect
                            ease: "back.out(1.2)",
                        },
                        "-=0.8"
                    ); // Overlap with previous animations
                }

                // Enhanced highlight for the year in the SVG
                gsap.to(`.text0${index + 1}`, {
                    fontWeight: "bold",
                    fill: "#0d6efd",
                    scale: 1.2,
                    opacity: 1,
                    transformOrigin: "left center",
                    duration: 0.4,
                    ease: "back.out(1.7)", // Bouncy effect
                });

                // Enhanced timepoint highlight with pulse effect
                const timepoint = document.querySelector(
                    `.timepoint:nth-child(${index * 2 + 2})`
                );
                if (timepoint) {
                    // Initial highlight
                    gsap.to(timepoint, {
                        fill: "#ff5252",
                        r: 14,
                        duration: 0.3,
                        ease: "power2.inOut",
                    });

                    // Add subtle pulse effect
                    gsap.fromTo(
                        timepoint,
                        { scale: 1 },
                        {
                            scale: 1.1,
                            repeat: 1,
                            yoyo: true,
                            duration: 0.5,
                            ease: "power1.inOut",
                        }
                    );
                } // Move the active marker to current position with spring effect
                gsap.to(".activeMarker", {
                    cy: 150 + index * 100,
                    cx: 120,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.75)", // Spring effect for smoother movement
                    onComplete: () => {
                        // Add subtle pulse effect after reaching position
                        gsap.fromTo(
                            ".activeMarker",
                            { scale: 1 },
                            {
                                scale: 1.15,
                                duration: 0.3,
                                yoyo: true,
                                repeat: 1,
                                ease: "power1.inOut",
                            }
                        );
                    },
                });
            },
            onLeaveBack: () => {
                // Create a timeline for smoother reverse animations
                const reverseTl = gsap.timeline({
                    defaults: { duration: 0.4 },
                });

                // Animate content and image back to initial state with more finesse
                if (content)
                    reverseTl.to(content, {
                        opacity: 0,
                        y: 30,
                        rotateX: "5deg",
                        ease: "power2.in",
                    });

                if (image)
                    reverseTl.to(
                        image,
                        {
                            opacity: 0,
                            y: 30,
                            scale: 0.95,
                            ease: "power2.in",
                        },
                        "-=0.3"
                    );

                // Animate children if present
                if (children && children.length) {
                    reverseTl.to(
                        children,
                        {
                            opacity: 0,
                            y: 10,
                            stagger: 0.05,
                            ease: "power1.in",
                        },
                        "-=0.4"
                    );
                }

                // Unhighlight when scrolling back up
                gsap.to(`.text0${index + 1}`, {
                    fontWeight: "normal",
                    fill: "#333",
                    scale: 1,
                    opacity: 0.7,
                    duration: 0.3,
                });

                // Restore the timepoint
                gsap.to(`.timepoint:nth-child(${index * 2 + 2})`, {
                    fill: "#0d6efd",
                    r: 12,
                    duration: 0.3,
                });
            },
            // For smoother continuous animation on scroll
            onLeave: () => {
                // Animate content and image out when scrolling down past the item
                gsap.to([content, image], {
                    opacity: 0,
                    y: -50, // Move upwards when leaving downwards
                    duration: 0.5,
                    ease: "power2.in",
                });

                // Unhighlight when leaving downwards
                gsap.to(`.text0${index + 1}`, {
                    fontWeight: "normal",
                    fill: "#333",
                    scale: 1,
                    opacity: 0.7,
                    duration: 0.3,
                });

                // Restore the timepoint
                gsap.to(`.timepoint:nth-child(${index * 2 + 2})`, {
                    fill: "#0d6efd",
                    r: 12,
                    duration: 0.3,
                });
            },
            onEnterBack: () => {
                // Animate content and image back in when scrolling back into view from below
                gsap.to(content, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
                });
                gsap.to(image, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    delay: 0.2,
                    ease: "power3.out",
                });

                // Highlight the current year in the SVG
                gsap.to(`.text0${index + 1}`, {
                    fontWeight: "bold",
                    fill: "#0d6efd",
                    scale: 1.2,
                    opacity: 1,
                    transformOrigin: "left center",
                    duration: 0.3,
                });

                // Highlight the current timepoint
                gsap.to(`.timepoint:nth-child(${index * 2 + 2})`, {
                    fill: "#ff5252",
                    r: 14,
                    duration: 0.3,
                });

                // Move the active marker to current position
                gsap.to(".activeMarker", {
                    cy: 150 + index * 100,
                    cx: 120,
                    duration: 0.5,
                    ease: "power2.out",
                });
            },
        });
    }); // Add special handling for the 2025 section with dramatic effects
    ScrollTrigger.create({
        trigger: ".timeline-item[data-year='2025']",
        start: "top 70%",
        onEnter: () => {
            // Create a timeline for coordinated animations
            const tl2025 = gsap.timeline();

            // Make the 2025 marker more prominent with a revealing animation
            tl2025.to(".text07", {
                fontWeight: "bold",
                fill: "#ff5252",
                scale: 1.4,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
                textShadow: "0px 0px 5px rgba(255,82,82,0.7)", // Glow effect
            });

            // Make the final point more prominent with pulsing effect
            tl2025.to(
                ".timepoint:last-of-type",
                {
                    r: 18,
                    fill: "#ff5252",
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    stroke: "#fff",
                    strokeWidth: 2,
                    onComplete: () => {
                        // Add pulsing animation after reaching final size
                        gsap.to(".timepoint:last-of-type", {
                            scale: 1.2,
                            repeat: 3,
                            yoyo: true,
                            duration: 0.5,
                            ease: "sine.inOut",
                        });
                    },
                },
                "-=0.3"
            );

            // Ensure active marker reaches the end with dramatic finish
            tl2025.to(
                ".activeMarker",
                {
                    cy: 750,
                    cx: 120,
                    scale: 1.3,
                    duration: 0.8,
                    ease: "back.out(1.2)", // Overshoot slightly for emphasis
                    stroke: "#fff",
                    strokeWidth: 4,
                    fill: "#ff5252",
                    onComplete: () => {
                        // Create celebration effect
                        gsap.to(".activeMarker", {
                            scale: 1.5,
                            duration: 0.5,
                            repeat: 1,
                            yoyo: true,
                            ease: "elastic.out(1, 0.3)",
                        });

                        // Optional: Add subtle background flash for emphasis
                        const flash = document.createElement("div");
                        flash.style.position = "fixed";
                        flash.style.top = "0";
                        flash.style.left = "0";
                        flash.style.width = "100%";
                        flash.style.height = "100%";
                        flash.style.backgroundColor = "rgba(255,82,82,0.05)";
                        flash.style.pointerEvents = "none";
                        flash.style.zIndex = "5";
                        document.body.appendChild(flash);

                        gsap.to(flash, {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => document.body.removeChild(flash),
                        });
                    },
                },
                "-=0.2"
            );
        },
    }); // Enhanced background transitions for immersive experience

    // Create a gradient overlay element for more dynamic background effects
    const gradientOverlay = document.createElement("div");
    gradientOverlay.style.position = "fixed";
    gradientOverlay.style.top = "0";
    gradientOverlay.style.left = "0";
    gradientOverlay.style.width = "100%";
    gradientOverlay.style.height = "100%";
    gradientOverlay.style.pointerEvents = "none";
    gradientOverlay.style.opacity = "0";
    gradientOverlay.style.zIndex = "1";
    gradientOverlay.style.mixBlendMode = "overlay";
    document.body.appendChild(gradientOverlay);

    // Background transitions with richer colors
    gsap.to("body", {
        backgroundColor: "#e6eef7", // Soft blue for 2019
        backgroundImage: "linear-gradient(to bottom right, #e6eef7, #d9e6f3)",
        scrollTrigger: {
            trigger: ".timeline-item[data-year='2019']",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
        },
    });

    // Subtle radial gradient for 2019
    gsap.to(gradientOverlay, {
        opacity: 0.2,
        background:
            "radial-gradient(circle at 70% 30%, rgba(173,216,230,0.3), transparent 70%)",
        scrollTrigger: {
            trigger: ".timeline-item[data-year='2019']",
            start: "top 50%",
            end: "bottom 20%",
            scrub: true,
        },
    });

    gsap.to("body", {
        backgroundColor: "#d2e0f0", // Deeper blue for 2021
        backgroundImage: "linear-gradient(to bottom right, #d2e0f0, #c4d8ed)",
        scrollTrigger: {
            trigger: ".timeline-item[data-year='2021']",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
        },
    });

    // Different gradient for 2021
    gsap.to(gradientOverlay, {
        opacity: 0.25,
        background:
            "radial-gradient(circle at 30% 70%, rgba(100,149,237,0.25), transparent 60%)",
        scrollTrigger: {
            trigger: ".timeline-item[data-year='2021']",
            start: "top 50%",
            end: "bottom 20%",
            scrub: true,
        },
    });

    gsap.to("body", {
        backgroundColor: "#c0d4e9", // Even deeper blue for 2023
        backgroundImage: "linear-gradient(to bottom right, #c0d4e9, #b3cce6)",
        scrollTrigger: {
            trigger: ".timeline-item[data-year='2023']",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
        },
    });

    // Special treatment for 2025 - create a more dramatic finish
    gsap.to("body", {
        backgroundColor: "#a7c5e3", // Final blue with hint of achievement
        backgroundImage: "linear-gradient(to bottom right, #a7c5e3, #9abedf)",
        scrollTrigger: {
            trigger: ".timeline-item[data-year='2025']",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
        },
    });

    // Special gradient for 2025
    gsap.to(gradientOverlay, {
        opacity: 0.35,
        background:
            "radial-gradient(circle at 50% 50%, rgba(70,130,220,0.3), transparent 70%)",
        scrollTrigger: {
            trigger: ".timeline-item[data-year='2025']",
            start: "top 50%",
            end: "bottom 20%",
            scrub: true,
            onEnter: () => {
                // Add subtle particles when reaching 2025
                if (window.innerWidth > 768) {
                    // Only on desktop
                    const particle = document.createElement("div");
                    particle.className = "celebrate-particles";
                    particle.style.position = "fixed";
                    particle.style.top = "0";
                    particle.style.left = "0";
                    particle.style.width = "100%";
                    particle.style.height = "100%";
                    particle.style.pointerEvents = "none";
                    particle.style.zIndex = "2";
                    particle.style.opacity = "0";
                    document.body.appendChild(particle);

                    gsap.to(particle, {
                        opacity: 1,
                        duration: 1,
                        onComplete: () => {
                            setTimeout(() => {
                                gsap.to(particle, {
                                    opacity: 0,
                                    duration: 2,
                                    onComplete: () =>
                                        document.body.removeChild(particle),
                                });
                            }, 4000);
                        },
                    });
                }
            },
        },
    });
});
