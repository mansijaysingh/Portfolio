// Advanced animations and interactive effects for the portfolio

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupAnimations();
            });
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        this.setupParallaxEffects();
        this.setupHoverAnimations();
        this.setupTextAnimations();
        this.setupScrollRevealAnimations();
        this.setupFloatingElements();
        this.setupCursorEffects();
    }

    // Parallax scrolling effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-image, .hero::before');
        
        if (parallaxElements.length === 0) return;

        const handleParallax = utils.throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                if (element.classList.contains('hero-image')) {
                    element.style.transform = `translateY(${rate * 0.3}px)`;
                } else {
                    element.style.transform = `translateY(${rate * 0.1}px)`;
                }
            });
        }, 16);

        window.addEventListener('scroll', handleParallax);
    }

    // Enhanced hover animations
    setupHoverAnimations() {
        // Project cards with 3D tilt effect
        this.setupTiltEffect('.project-card');
        
        // Skill cards with glow effect
        this.setupGlowEffect('.skill-category');
        
        // Button ripple effect
        this.setupRippleEffect('.btn');
        
        // Navigation link underline animation
        this.setupUnderlineAnimation('.nav-link');
    }

    setupTiltEffect(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });

            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    setupGlowEffect(selector) {
        const elements = document.querySelectorAll(selector);
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.2), 0 0 0 1px rgba(99, 102, 241, 0.1)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.boxShadow = '';
            });
        });
    }

    setupRippleEffect(selector) {
        const buttons = document.querySelectorAll(selector);
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('div');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupUnderlineAnimation(selector) {
        const links = document.querySelectorAll(selector);
        
        links.forEach(link => {
            // Create animated underline element if it doesn't exist
            if (!link.querySelector('.nav-underline')) {
                const underline = document.createElement('div');
                underline.className = 'nav-underline';
                underline.style.cssText = `
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(135deg, #6366f1, #4f46e5);
                    transition: width 0.3s ease;
                `;
                link.style.position = 'relative';
                link.appendChild(underline);
            }
        });
    }

    // Text animations
    setupTextAnimations() {
        this.typewriterEffect('.hero-title .name', 100);
        this.fadeInTextLines('.hero-description', 50);
    }

    typewriterEffect(selector, speed = 100) {
        const element = document.querySelector(selector);
        if (!element) return;

        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #6366f1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        };

        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }

    fadeInTextLines(selector, delay = 50) {
        const element = document.querySelector(selector);
        if (!element) return;

        const text = element.textContent;
        const words = text.split(' ');
        element.innerHTML = '';

        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = 'all 0.6s ease';
            element.appendChild(span);

            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 2000 + (index * delay));
        });
    }

    // Scroll reveal animations
    setupScrollRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.about-text, .skill-item, .project-card, .contact-method'
        );

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            revealObserver.observe(element);
        });
    }

    // Floating elements animation
    setupFloatingElements() {
        this.createFloatingShapes();
        this.animateScrollIndicator();
    }

    createFloatingShapes() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const shapes = [
            { size: 60, color: 'rgba(139, 92, 246, 0.1)', duration: 8 },
            { size: 40, color: 'rgba(20, 184, 166, 0.1)', duration: 12 },
            { size: 80, color: 'rgba(245, 158, 11, 0.1)', duration: 10 },
            { size: 30, color: 'rgba(124, 58, 237, 0.1)', duration: 15 }
        ];

        shapes.forEach((shape, index) => {
            const element = document.createElement('div');
            element.style.cssText = `
                position: absolute;
                width: ${shape.size}px;
                height: ${shape.size}px;
                background: ${shape.color};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float-shape-${index} ${shape.duration}s ease-in-out infinite;
                pointer-events: none;
                z-index: 0;
            `;
            
            hero.appendChild(element);
        });

        // Add CSS animations for shapes
        if (!document.querySelector('#floating-shapes-styles')) {
            const style = document.createElement('style');
            style.id = 'floating-shapes-styles';
            style.textContent = shapes.map((shape, index) => `
                @keyframes float-shape-${index} {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(90deg); }
                    50% { transform: translateY(-10px) rotate(180deg); }
                    75% { transform: translateY(-30px) rotate(270deg); }
                }
            `).join('\n');
            document.head.appendChild(style);
        }
    }

    animateScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        let isVisible = true;
        
        window.addEventListener('scroll', utils.throttle(() => {
            const scrollPosition = window.scrollY;
            const shouldShow = scrollPosition < 100;
            
            if (shouldShow !== isVisible) {
                isVisible = shouldShow;
                scrollIndicator.style.opacity = isVisible ? '1' : '0';
                scrollIndicator.style.transform = `translateX(-50%) translateY(${isVisible ? '0' : '20px'})`;
            }
        }, 100));
    }

    // Custom cursor effects
    setupCursorEffects() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(139, 92, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        cursorFollower.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #8b5cf6;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: transform 0.15s ease;
        `;
        document.body.appendChild(cursorFollower);

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            cursorX += (mouseX - cursorX - 10) * 0.1;
            cursorY += (mouseY - cursorY - 10) * 0.1;
            
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            cursorFollower.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-category');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform += ' scale(1.5)';
                cursor.style.background = 'rgba(139, 92, 246, 0.8)';
            });

            element.addEventListener('mouseleave', () => {
                cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
                cursor.style.background = 'rgba(139, 92, 246, 0.5)';
            });
        });
    }
}

// Enhanced scroll animations
class ScrollAnimations {
    constructor() {
        this.setupScrollProgress();
        this.setupSectionTransitions();
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #8b5cf6, #7c3aed);
            z-index: 1001;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', utils.throttle(() => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        }, 16));
    }

    setupSectionTransitions() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.8s ease';
            sectionObserver.observe(section);
        });
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.measurePerformance();
    }

    measurePerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                
                // Measure animation performance
                this.measureAnimationPerformance();
            });
        }
    }

    measureAnimationPerformance() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                    this.optimizeAnimations();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }

    optimizeAnimations() {
        // Reduce animation complexity on low-performance devices
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            * {
                animation-duration: 0.5s !important;
                transition-duration: 0.2s !important;
            }
            .custom-cursor,
            .cursor-follower {
                display: none !important;
            }
        `;
        document.head.appendChild(styleSheet);
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
    new ScrollAnimations();
    new PerformanceMonitor();
});
