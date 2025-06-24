// Main JavaScript functionality for the portfolio website

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all functionality when DOM is loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.initializeComponents();
            });
        } else {
            this.setupEventListeners();
            this.initializeComponents();
        }
    }

    setupEventListeners() {
        // Navigation functionality
        this.setupNavigation();
        
        // Form handling
        this.setupContactForm();
        
        // Scroll effects
        this.setupScrollEffects();
        
        // Skill bar animations
        this.setupSkillBars();
        
        // Smooth scrolling for anchor links
        this.setupSmoothScrolling();
    }

    initializeComponents() {
        // Initialize any components that need setup
        this.updateActiveNavLink();
        this.setupIntersectionObserver();
    }

    // Navigation functionality
    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle mobile menu
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const isNavClick = navMenu?.contains(e.target) || hamburger?.contains(e.target);
            if (!isNavClick && navMenu?.classList.contains('active')) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll effects
    setupScrollEffects() {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class to navbar
            if (scrollTop > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            // Update active navigation link
            this.updateActiveNavLink();

            lastScrollTop = scrollTop;
        });
    }

    // Update active navigation link based on scroll position
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Skill bar animations
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const animatedBars = new Set();

        const animateSkillBar = (bar) => {
            if (animatedBars.has(bar)) return;
            
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width + '%';
                animatedBars.add(bar);
            }
        };

        // Animate skill bars when they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        setTimeout(() => animateSkillBar(bar), 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // Contact form handling
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateForm(formObject)) {
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            this.showFormFeedback('success', 'Thank you! Your message has been sent successfully.');
            form.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    validateForm(formData) {
        const { name, email, subject, message } = formData;
        
        // Basic validation
        if (!name || name.trim().length < 2) {
            this.showFormFeedback('error', 'Please enter a valid name.');
            return false;
        }
        
        if (!email || !this.isValidEmail(email)) {
            this.showFormFeedback('error', 'Please enter a valid email address.');
            return false;
        }
        
        if (!subject || subject.trim().length < 3) {
            this.showFormFeedback('error', 'Please enter a subject.');
            return false;
        }
        
        if (!message || message.trim().length < 10) {
            this.showFormFeedback('error', 'Please enter a message with at least 10 characters.');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFormFeedback(type, message) {
        // Remove existing feedback
        const existingFeedback = document.querySelector('.form-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        // Create feedback element
        const feedback = document.createElement('div');
        feedback.className = `form-feedback form-feedback-${type}`;
        feedback.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        // Add styles
        feedback.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 0.5rem;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' 
                : 'background: #fee2e2; color: #991b1b; border: 1px solid #fecaca;'
            }
        `;

        // Insert feedback
        const form = document.getElementById('contact-form');
        form.insertBefore(feedback, form.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            feedback.remove();
        }, 5000);
    }

    // Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll(
            '.fade-in-up, .fade-in-left, .fade-in-right, .project-card, .skill-category, .highlight-item'
        );
        
        animateElements.forEach(element => {
            element.classList.add('fade-in-up');
            observer.observe(element);
        });
    }
}

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce(func, delay) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    // Throttle function for scroll events
    throttle(func, delay) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, delay);
            }
        };
    },

    // Get element's position relative to viewport
    getElementPosition(element) {
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            bottom: rect.bottom + window.scrollY,
            right: rect.right + window.scrollX
        };
    },

    // Check if element is in viewport
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    }
};

// Initialize the portfolio when the script loads
const portfolio = new Portfolio();

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, utils };
}
