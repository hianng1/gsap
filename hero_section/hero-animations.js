/**
 * CSA Vietnam Hero Section Animations
 * Enhanced version with improved performance and accessibility
 * 
 * @author CSA Vietnam Development Team
 * @version 2.0.0
 * @since 2025
 */

// Global configuration
const CONFIG = {
    animations: {
        duration: {
            fast: 0.3,
            normal: 0.6,
            slow: 1.2,
            verySlow: 2.0
        },
        easing: {
            primary: "power3.out",
            bounce: "back.out(1.7)",
            elastic: "elastic.out(1, 0.75)"
        },
        stagger: 0.03
    },
    performance: {
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        isMobile: window.innerWidth <= 768,
        isTablet: window.innerWidth <= 1024
    }
};

// Animation state management
let animationState = {
    heroAnimationsComplete: false,
    parallaxActive: false,
    currentSection: 'hero'
};

/**
 * Initialize all animations when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
    // Check for reduced motion preference
    if (CONFIG.performance.reducedMotion) {
        initAccessibleAnimations();
        return;
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, TextPlugin);

    // Set GSAP defaults
    gsap.defaults({
        ease: CONFIG.animations.easing.primary,
        duration: CONFIG.animations.duration.normal
    });

    // Initialize loading screen
    initLoadingScreen();

    // Initialize all animations after loading
    setTimeout(() => {
        initHeroAnimations();
        initParallaxEffects();
        initScrollIndicator();
        initStatisticsCounters();
        initInteractiveElements();
        initParticleSystem();
        removeLoadingScreen();
    }, 500);

    // Performance monitoring
    initPerformanceMonitoring();
});

/**
 * Initialize loading screen and removal
 */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    // Animate loading screen entrance
    gsap.set(loadingScreen, { opacity: 1 });
    gsap.to('.loading-spinner', {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: "none"
    });
}

/**
 * Remove loading screen with animation
 */
function removeLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    gsap.to(loadingScreen, {
        opacity: 0,
        duration: CONFIG.animations.duration.normal,
        ease: CONFIG.animations.easing.primary,
        onComplete: () => {
            loadingScreen.style.display = 'none';
            loadingScreen.remove();
        }
    });
}

/**
 * Initialize hero section entry animations
 */
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const introText = document.querySelector('.intro-text');
    const heroButtons = document.querySelectorAll('.hero-buttons a');
    const heroStats = document.querySelectorAll('.stat-item');
    const heroShapes = document.querySelectorAll('.hero-shape');

    if (!heroTitle) return;

    // Split text for character animation
    let splitTitle;
    try {
        splitTitle = new SplitType(heroTitle, { types: "chars, words" });
    } catch (error) {
        console.warn('SplitType failed, falling back to word animation');
        splitTitle = { chars: [heroTitle] };
    }

    // Create main timeline
    const mainTimeline = gsap.timeline({
        defaults: { ease: CONFIG.animations.easing.primary },
        onComplete: () => {
            animationState.heroAnimationsComplete = true;
            // Clean up SplitType to improve performance
            if (splitTitle.revert) splitTitle.revert();
        }
    });

    // Background animations
    mainTimeline
        .from('.hero-background-image', {
            opacity: 0,
            scale: 1.05,
            duration: CONFIG.animations.duration.verySlow,
            ease: "power2.out"
        })
        .from('.hero-background-overlay', {
            opacity: 0,
            duration: CONFIG.animations.duration.slow,
        }, "<0.5");

    // Text animations
    if (splitTitle.chars && splitTitle.chars.length > 1) {
        mainTimeline.from(splitTitle.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            duration: CONFIG.animations.duration.normal,
            stagger: CONFIG.animations.stagger,
            ease: CONFIG.animations.easing.bounce
        }, "-=1.5");
    } else {
        mainTimeline.from(heroTitle, {
            opacity: 0,
            y: 50,
            duration: CONFIG.animations.duration.normal,
            ease: CONFIG.animations.easing.bounce
        }, "-=1.5");
    }

    // Subtitle and content
    mainTimeline
        .from(heroSubtitle, {
            opacity: 0,
            y: 30,
            duration: CONFIG.animations.duration.normal,
        }, "-=0.8")
        .from(introText, {
            opacity: 0,
            y: 20,
            duration: CONFIG.animations.duration.normal,
        }, "-=0.6");

    // Buttons with stagger
    if (heroButtons.length) {
        mainTimeline.from(heroButtons, {
            opacity: 0,
            y: 20,
            scale: 0.9,
            duration: CONFIG.animations.duration.normal,
            stagger: 0.15,
            ease: CONFIG.animations.easing.bounce
        }, "-=0.4");
    }

    // Statistics with enhanced animation
    if (heroStats.length) {
        mainTimeline.from(heroStats, {
            opacity: 0,
            y: 30,
            scale: 0.8,
            duration: CONFIG.animations.duration.normal,
            stagger: 0.2,
            ease: CONFIG.animations.easing.elastic
        }, "-=0.2");
    }

    // Decorative shapes
    heroShapes.forEach((shape, index) => {
        mainTimeline.from(shape, {
            opacity: 0,
            scale: 0,
            rotation: index % 2 === 0 ? 180 : -180,
            duration: CONFIG.animations.duration.slow,
            ease: CONFIG.animations.easing.elastic
        }, index === 0 ? "-=1" : "<0.2");
    });

    // Scroll indicator
    mainTimeline.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: CONFIG.animations.duration.normal,
        ease: CONFIG.animations.easing.primary
    }, "-=0.3");

    // Continuous floating animations for shapes
    initFloatingAnimations();
}

/**
 * Initialize floating animations for decorative elements
 */
function initFloatingAnimations() {
    const shapes = document.querySelectorAll('.hero-shape');
    
    shapes.forEach((shape, index) => {
        const duration = 3 + (index * 0.5);
        const yMovement = 15 + (index * 5);
        const xMovement = 5 + (index * 2);

        gsap.to(shape, {
            y: yMovement,
            x: xMovement,
            rotation: index % 2 === 0 ? 10 : -10,
            duration: duration,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1
        });
    });
}

/**
 * Initialize parallax effects for scrolling
 */
function initParallaxEffects() {
    animationState.parallaxActive = true;

    // Hero background parallax
    gsap.to('.hero-background-image', {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "bottom top",
            scrub: true,
            onUpdate: self => {
                // Optimize performance on mobile
                if (CONFIG.performance.isMobile && self.progress > 0.8) {
                    return;
                }
            }
        }
    });

    // Content parallax with different speeds
    gsap.to('.hero-content', {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "bottom top",
            scrub: 0.8
        }
    });

    // Shapes parallax
    document.querySelectorAll('.hero-shape').forEach((shape, index) => {
        const speed = 10 + (index * 5);
        const direction = index % 2 === 0 ? 1 : -1;

        gsap.to(shape, {
            yPercent: speed * direction,
            xPercent: (speed / 2) * direction,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero-section',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Section-based background changes
    initSectionTransitions();
}

/**
 * Initialize section transitions
 */
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                animationState.currentSection = section.id || `section-${index}`;
                updateNavigationState();
            },
            onEnterBack: () => {
                animationState.currentSection = section.id || `section-${index}`;
                updateNavigationState();
            }
        });
    });
}

/**
 * Initialize scroll indicator with enhanced functionality
 */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    // Click handler for smooth scroll
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('#services') || document.querySelector('section:nth-child(2)');
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Hide on scroll
    gsap.to(scrollIndicator, {
        opacity: 0,
        ease: "power1.in",
        scrollTrigger: {
            trigger: '.hero-section',
            start: "top top",
            end: "15% top",
            scrub: true
        }
    });

    // Progress indicator
    const progressLine = document.createElement('div');
    progressLine.className = 'scroll-progress';
    progressLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        z-index: 1000;
        transform-origin: left;
        transform: scaleX(0);
    `;
    document.body.appendChild(progressLine);

    gsap.to(progressLine, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3
        }
    });
}

/**
 * Initialize statistics counters
 */
function initStatisticsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalText = stat.textContent;
        const numberMatch = finalText.match(/\d+/);
        
        if (numberMatch) {
            const finalNumber = parseInt(numberMatch[0]);
            const suffix = finalText.replace(numberMatch[0], '');
            
            ScrollTrigger.create({
                trigger: stat,
                start: "top 80%",
                onEnter: () => {
                    gsap.from({ value: 0 }, {
                        value: finalNumber,
                        duration: CONFIG.animations.duration.verySlow,
                        ease: "power2.out",
                        onUpdate: function() {
                            stat.textContent = Math.floor(this.targets()[0].value) + suffix;
                        },
                        onComplete: () => {
                            stat.textContent = finalText;
                        }
                    });
                }
            });
        }
    });
}

/**
 * Initialize interactive elements
 */
function initInteractiveElements() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: CONFIG.animations.duration.fast,
                ease: CONFIG.animations.easing.primary
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: CONFIG.animations.duration.fast,
                ease: CONFIG.animations.easing.primary
            });
        });
    });

    // Stat items hover effects
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                y: -5,
                scale: 1.02,
                duration: CONFIG.animations.duration.fast,
                ease: CONFIG.animations.easing.primary
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                y: 0,
                scale: 1,
                duration: CONFIG.animations.duration.fast,
                ease: CONFIG.animations.easing.primary
            });
        });
    });
}

/**
 * Initialize simple particle system
 */
function initParticleSystem() {
    if (CONFIG.performance.isMobile) return; // Skip on mobile for performance

    const particlesContainer = document.getElementById('particles-hero');
    if (!particlesContainer) return;

    const particleCount = CONFIG.performance.isTablet ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

/**
 * Create individual particle
 */
function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 1}px;
        height: ${Math.random() * 4 + 1}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1});
        border-radius: 50%;
        pointer-events: none;
    `;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    // Animate particle
    gsap.to(particle, {
        y: -100,
        x: Math.random() * 100 - 50,
        opacity: 0,
        duration: Math.random() * 10 + 10,
        ease: "none",
        repeat: -1,
        delay: Math.random() * 5
    });
}

/**
 * Initialize accessible animations for users with reduced motion preference
 */
function initAccessibleAnimations() {
    // Simple fade-in for content
    const elements = document.querySelectorAll('[data-hero] > *');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease';
            el.style.opacity = '1';
        }, index * 100);
    });
    
    // Remove loading screen immediately
    setTimeout(removeLoadingScreen, 100);
}

/**
 * Update navigation state
 */
function updateNavigationState() {
    // Update any navigation indicators here
    console.log(`Current section: ${animationState.currentSection}`);
}

/**
 * Performance monitoring
 */
function initPerformanceMonitoring() {
    // Monitor frame rate
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkPerformance() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 30 && !CONFIG.performance.reducedMotion) {
                console.warn('Low FPS detected, consider reducing animations');
                // Optionally reduce animation complexity
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkPerformance);
    }
    
    requestAnimationFrame(checkPerformance);
}

/**
 * Cleanup function for page unload
 */
window.addEventListener('beforeunload', () => {
    // Kill all GSAP animations
    gsap.killTweensOf("*");
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

/**
 * Handle window resize
 */
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Update performance flags
        CONFIG.performance.isMobile = window.innerWidth <= 768;
        CONFIG.performance.isTablet = window.innerWidth <= 1024;
        
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
    }, 250);
});

/**
 * Export for potential external use
 */
window.CSAHeroAnimations = {
    config: CONFIG,
    state: animationState,
    refresh: () => ScrollTrigger.refresh()
};
