// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Set default animation settings
    gsap.defaults({
        ease: "power2.out",
        duration: 1,
        overwrite: "auto",
    });

    // Hero section animations
    gsap.timeline()
        .from(".header-section", {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
        })
        .from(
            ".section-divider",
            {
                width: 0,
                duration: 0.8,
                ease: "power2.out",
            },
            "-=0.8"
        )
        .from(
            ".lead",
            {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
            },
            "-=0.6"
        );

    // Get all sections
    const sections = document.querySelectorAll(".pSection");

    sections.forEach((section, index) => {
        const content = section.querySelector(".pContent");
        const image = section.querySelector(".pImage");
        const isEven = index % 2 === 1; // Because we start from index 0

        // Set initial states
        gsap.set(content, {
            y: 100,
            opacity: 0,
            rotateY: isEven ? -15 : 15,
            transformOrigin: isEven ? "right center" : "left center",
        });

        gsap.set(image, {
            y: 150,
            opacity: 0,
            scale: 0.8,
            rotateY: isEven ? 15 : -15,
            transformOrigin: "center center",
        });

        // Parallax effects for content
        gsap.to(content, {
            yPercent: isEven ? -80 : -120,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
            },
        });

        // Parallax effects for images with different speeds
        gsap.to(image, {
            yPercent: isEven ? 60 : 40,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 2,
            },
        });

        // Enhanced entrance animations
        ScrollTrigger.create({
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            onEnter: () => {
                const tl = gsap.timeline({
                    defaults: { ease: "power3.out" },
                });

                // Animate content with 3D rotation
                tl.to(content, {
                    y: 0,
                    opacity: 1,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "back.out(1.2)",
                });

                // Animate image with scale and rotation
                tl.to(
                    image,
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        duration: 1.5,
                        ease: "power3.out",
                    },
                    "-=0.8"
                );

                // Animate content children individually
                const children = content.querySelectorAll(".year, h3, p");
                tl.from(
                    children,
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        ease: "power2.out",
                    },
                    "-=1"
                );
            },
            onLeave: () => {
                // Subtle exit animation
                gsap.to([content, image], {
                    opacity: 0.7,
                    duration: 0.5,
                });
            },
            onEnterBack: () => {
                // Re-entrance animation when scrolling back
                gsap.to([content, image], {
                    opacity: 1,
                    duration: 0.5,
                });
            },
            onLeaveBack: () => {
                // Exit animation when scrolling back up
                gsap.to([content, image], {
                    opacity: 0.5,
                    duration: 0.5,
                });
            },
        });

        // Background parallax effect
        gsap.to(section, {
            backgroundPositionY: "50%",
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
        });

        // Special effects for specific years
        if (index === 0) {
            // 2018 - First section
            gsap.from(content, {
                x: -200,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                },
            });
        }

        if (index === sections.length - 1) {
            // 2025 - Last section
            ScrollTrigger.create({
                trigger: section,
                start: "top 50%",
                onEnter: () => {
                    // Special celebration effect for 2025
                    const celebrationTl = gsap.timeline();

                    celebrationTl.to(content, {
                        scale: 1.05,
                        duration: 0.8,
                        ease: "elastic.out(1, 0.3)",
                        yoyo: true,
                        repeat: 1,
                    });

                    // Add sparkle effect
                    const sparkles = createSparkles(section);
                    celebrationTl.from(
                        sparkles,
                        {
                            scale: 0,
                            opacity: 0,
                            duration: 1,
                            stagger: 0.1,
                            ease: "back.out(1.7)",
                        },
                        "-=0.5"
                    );
                },
            });
        }
    });

    // Smooth scroll progress indicator
    gsap.to(".hero-section", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
        },
    });

    // Dynamic background color changes
    const backgroundColors = [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        "linear-gradient(135deg, #ff8a80 0%, #ffab91 100%)",
    ];

    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                gsap.to("body", {
                    background:
                        backgroundColors[index % backgroundColors.length],
                    duration: 1.5,
                    ease: "power2.inOut",
                });
            },
        });
    });

    // Resize handler for responsive behavior
    ScrollTrigger.addEventListener("refresh", () => ScrollTrigger.refresh());
    window.addEventListener("resize", () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    });
});

// Helper function to create sparkle effects
function createSparkles(container) {
    const sparkles = [];
    const sparkleCount = 12;

    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("div");
        sparkle.style.position = "absolute";
        sparkle.style.width = "8px";
        sparkle.style.height = "8px";
        sparkle.style.background = "#FFD700";
        sparkle.style.borderRadius = "50%";
        sparkle.style.pointerEvents = "none";
        sparkle.style.boxShadow = "0 0 10px #FFD700";

        // Random position within the container
        sparkle.style.left = Math.random() * 100 + "%";
        sparkle.style.top = Math.random() * 100 + "%";

        container.appendChild(sparkle);
        sparkles.push(sparkle);

        // Animate sparkles
        gsap.to(sparkle, {
            rotation: 360,
            duration: 2,
            repeat: -1,
            ease: "none",
        });

        gsap.to(sparkle, {
            scale: 1.5,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: Math.random() * 1,
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            gsap.to(sparkle, {
                opacity: 0,
                scale: 0,
                duration: 0.5,
                onComplete: () => {
                    if (sparkle.parentNode) {
                        sparkle.parentNode.removeChild(sparkle);
                    }
                },
            });
        }, 5000);
    }

    return sparkles;
}
