/**
 * CSA Vietnam - Services Section Animations
 * This script handles all animations for the services section
 */

document.addEventListener("DOMContentLoaded", () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Hiển thị tất cả nội dung trước khi áp dụng animation
    showAllContent();

    // Initialize animations sau khi đã hiển thị nội dung
    setTimeout(() => {
        initServicesAnimations();
        initBackgroundShapes();
        initHoverEffects();
    }, 100);
});

/**
 * Hiển thị tất cả nội dung trước khi áp dụng animation
 */
function showAllContent() {
    // Hiển thị tất cả các card
    document.querySelectorAll(".service-card").forEach((card) => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    });

    // Hiển thị tất cả icon
    document.querySelectorAll("[data-icon]").forEach((icon) => {
        icon.style.opacity = "1";
        icon.style.transform = "scale(1)";
    });

    // Hiển thị tất cả tiêu đề
    document.querySelectorAll("[data-title]").forEach((title) => {
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
    });

    // Hiển thị tất cả nội dung
    document.querySelectorAll("ul li").forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "translateX(0)";
    });

    // Hiển thị tất cả nút
    document.querySelectorAll(".btn").forEach((btn) => {
        btn.style.opacity = "1";
        btn.style.transform = "translateY(0)";
    });
}

/**
 * Initialize services section animations
 */
function initServicesAnimations() {
    // Split section title text for character animation
    const sectionTitle = new SplitType("[data-split]", { types: "chars" });

    // Create timeline for section title
    const titleTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-section",
            start: "top bottom-=100",
            toggleActions: "play none none none",
        },
    });

    // Animate section title characters
    titleTl
        .from(sectionTitle.chars, {
            opacity: 0,
            y: 20,
            rotateX: -90,
            stagger: 0.03,
            duration: 0.6,
            ease: "back.out(1.7)",
        })
        .from(
            ".section-divider",
            {
                width: 0,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
            },
            "-=0.3"
        )
        .from(
            ".section-divider::before, .section-divider::after",
            {
                width: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power3.out",
            },
            "-=0.2"
        ); // Tạo animation nhẹ nhàng hơn cho service cards
    // Sử dụng .from thay vì .to để bắt đầu từ điểm đã xác định và quay trở lại trạng thái hiện tại
    ScrollTrigger.batch("[data-card]", {
        interval: 0.1,
        batchMax: 3,
        start: "top bottom-=50",
        onEnter: (batch) => {
            // Sử dụng hiệu ứng nhẹ nhàng từ dưới lên không ảnh hưởng đến hiển thị
            gsap.from(batch, {
                y: 30,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out",
                // Không thay đổi opacity vì chúng ta muốn nội dung luôn hiển thị
            });

            // Thêm hiệu ứng nhẹ nhàng cho các phần tử bên trong, không ảnh hưởng đến hiển thị
            batch.forEach((card) => {
                animateCardElementsSubtle(card);
            });
        },
    });
}

/**
 * Animate elements inside a service card - Phiên bản gốc
 * Giữ lại để tham khảo nhưng không sử dụng
 */
function animateCardElements(card) {
    // Create timeline for card elements
    const cardTl = gsap.timeline();

    // Select elements inside the card
    const icon = card.querySelector("[data-icon]");
    const title = card.querySelector("[data-title]");
    const listItems = card.querySelectorAll("ul li");
    const button = card.querySelector(".btn");

    // Animate card elements
    cardTl
        .to(icon, {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
        })
        .to(
            title,
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            },
            "-=0.3"
        )
        .to(
            listItems,
            {
                x: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.5,
                ease: "power3.out",
            },
            "-=0.2"
        )
        .to(
            button,
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            },
            "-=0.3"
        );
}

/**
 * Animate elements inside a service card - Phiên bản nhẹ nhàng hơn
 * Sử dụng .from thay vì .to để đảm bảo nội dung luôn hiển thị
 */
function animateCardElementsSubtle(card) {
    // Create timeline for card elements
    const cardTl = gsap.timeline();

    // Select elements inside the card
    const icon = card.querySelector("[data-icon]");
    const title = card.querySelector("[data-title]");
    const listItems = card.querySelectorAll("ul li");
    const button = card.querySelector(".btn");

    // Animate card elements with subtle effects
    cardTl
        .from(icon, {
            y: 10,
            scale: 0.9,
            duration: 0.6,
            ease: "back.out(1.7)",
        })
        .from(
            title,
            {
                y: 10,
                duration: 0.5,
                ease: "power3.out",
            },
            "-=0.3"
        )
        .from(
            listItems,
            {
                x: 10,
                stagger: 0.08,
                duration: 0.5,
                ease: "power3.out",
            },
            "-=0.2"
        )
        .from(
            button,
            {
                y: 10,
                duration: 0.5,
                ease: "power3.out",
            },
            "-=0.3"
        );
}

/**
 * Initialize background decorative shapes
 */
function initBackgroundShapes() {
    // Add shapes to the DOM
    const servicesSection = document.querySelector(".services-section");

    // Create and append shapes
    const shapes = [
        { class: "bg-shape shape-1" },
        { class: "bg-shape shape-2" },
        { class: "bg-shape shape-3" },
    ];

    shapes.forEach((shape) => {
        const element = document.createElement("div");
        element.className = shape.class;
        servicesSection.appendChild(element);
    });

    // Animate shapes
    gsap.from(".bg-shape", {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".services-section",
            start: "top bottom-=100",
        },
    });

    // Add continuous floating animation
    gsap.to(".shape-1", {
        y: -30,
        x: 15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });

    gsap.to(".shape-2", {
        y: 30,
        x: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });

    gsap.to(".shape-3", {
        y: -20,
        x: 10,
        rotation: 15,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
    });
}

/**
 * Initialize hover effects
 */
function initHoverEffects() {
    // Add hover effect for buttons with data-hover="slide"
    const hoverButtons = document.querySelectorAll('[data-hover="slide"]');

    hoverButtons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            gsap.to(button.querySelector("i"), {
                x: 5,
                duration: 0.3,
                ease: "power2.out",
            });
        });

        button.addEventListener("mouseleave", () => {
            gsap.to(button.querySelector("i"), {
                x: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        });
    });
}

/**
 * Scroll trigger observer for elements
 */
function createScrollObserver() {
    // Fallback for browsers that don't support Intersection Observer
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".fade-up").forEach((el) => {
            el.classList.add("is-visible");
        });
        return;
    }

    // Create observer for fade-up elements
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    // Observe all elements with fade-up class
    document.querySelectorAll(".fade-up").forEach((el) => {
        observer.observe(el);
    });
}
