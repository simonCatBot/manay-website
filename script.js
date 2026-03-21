// Manay Website JavaScript - Modern, clean, and interactive

class ManayApp {
    constructor() {
        this.currentUserType = 'landlords';
        this.init();
    }

    init() {
        // Initialize all functionality when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupEventListeners();
                this.initializeAnimations();
            });
        } else {
            this.setupEventListeners();
            this.initializeAnimations();
        }
    }

    setupEventListeners() {
        // 1. Toggle functionality between landlord/renter views
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleViewToggle(e.target);
            });
        });

        // 2. Form submission handling
        const waitlistForm = document.getElementById('waitlistForm');
        if (waitlistForm) {
            waitlistForm.addEventListener('submit', (e) => {
                this.handleFormSubmit(e);
            });
        }

        // 3. Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleSmoothScroll(e);
            });
        });

        // 4. Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                this.handleMobileMenuToggle(navToggle, navMenu);
            });
        }

        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // 5. Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 6. Scroll animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimations();
        });

        // 7. Add click handlers for CTA buttons
        const ctaButtons = document.querySelectorAll('.primary-button, .secondary-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.onclick === null) {
                    this.handleCTAClick(e.target);
                }
            });
        });
    }

    // 1. Toggle functionality between landlord/renter views
    handleViewToggle(button) {
        try {
            const target = button.getAttribute('data-target');
            const toggleButtons = document.querySelectorAll('.toggle-btn');
            const ctaContents = document.querySelectorAll('.cta-content');

            // Update button states
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update CTA content
            ctaContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${target}-cta`) {
                    content.classList.add('active');
                }
            });

            // Animate the transition
            this.animateToggleTransition();

        } catch (error) {
            console.error('Error handling view toggle:', error);
        }
    }

    animateToggleTransition() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'scale(0.98)';
            heroContent.style.opacity = '0.8';
            
            setTimeout(() => {
                heroContent.style.transform = 'scale(1)';
                heroContent.style.opacity = '1';
            }, 150);
        }
    }

    // 2. Form submission handling with validation
    handleFormSubmit(event) {
        event.preventDefault();
        
        try {
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate form data
            if (!this.validateForm(data)) {
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Submitting...';
            submitButton.disabled = true;

            // Simulate API call (replace with actual API endpoint)
            this.submitFormData(data)
                .then(() => {
                    this.showSuccessMessage();
                    form.reset();
                })
                .catch((error) => {
                    this.showErrorMessage(error);
                })
                .finally(() => {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                });

        } catch (error) {
            console.error('Error handling form submission:', error);
            this.showErrorMessage('An unexpected error occurred. Please try again.');
        }
    }

    validateForm(data) {
        const errors = [];

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter a valid name');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }

        // Phone validation (Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!data.phone || !phoneRegex.test(data.phone.replace(/[\s\-\+]/g, ''))) {
            errors.push('Please enter a valid Indian phone number');
        }

        // User type validation
        if (!data.userType) {
            errors.push('Please select whether you are a landlord or renter');
        }

        if (errors.length > 0) {
            this.showErrorMessage(errors.join('\n'));
            return false;
        }

        return true;
    }

    submitFormData(data) {
        // Simulate API call - replace with actual endpoint
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success (90% of the time)
                if (Math.random() > 0.1) {
                    console.log('Form submitted successfully:', data);
                    resolve({ success: true, data });
                } else {
                    reject(new Error('Network error. Please try again.'));
                }
            }, 1500);
        });
    }

    // 5. Success message display
    showSuccessMessage() {
        const form = document.getElementById('waitlistForm');
        const successMessage = document.getElementById('formSuccess');
        
        if (form && successMessage) {
            // Hide form with animation
            form.style.opacity = '0';
            form.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                form.style.display = 'none';
                successMessage.style.display = 'block';
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateY(20px)';
                
                // Animate success message in
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                    successMessage.style.transform = 'translateY(0)';
                }, 50);
            }, 300);
        }
    }

    showErrorMessage(message) {
        // Create or update error message
        let errorElement = document.querySelector('.form-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error';
            errorElement.style.cssText = `
                background: #fee;
                color: #c33;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 16px;
                border-left: 4px solid #c33;
                white-space: pre-line;
            `;
            
            const form = document.getElementById('waitlistForm');
            form.insertBefore(errorElement, form.firstChild);
        }
        
        errorElement.textContent = message;
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorElement) {
                errorElement.style.opacity = '0';
                setTimeout(() => errorElement.remove(), 300);
            }
        }, 5000);
    }

    // 3. Smooth scrolling for navigation links
    handleSmoothScroll(event) {
        event.preventDefault();
        
        try {
            const targetId = event.currentTarget.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.error('Error handling smooth scroll:', error);
        }
    }

    // 4. Mobile menu toggle functionality
    handleMobileMenuToggle(navToggle, navMenu) {
        try {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        } catch (error) {
            console.error('Error handling mobile menu toggle:', error);
        }
    }

    // Handle CTA button clicks
    handleCTAClick(button) {
        try {
            const text = button.textContent.toLowerCase();
            
            if (text.includes('waitlist') || text.includes('trial') || text.includes('started')) {
                this.scrollToWaitlist();
            }
            
            // Add click animation
            this.animateButtonClick(button);
        } catch (error) {
            console.error('Error handling CTA click:', error);
        }
    }

    scrollToWaitlist() {
        const waitlistSection = document.getElementById('waitlist');
        if (waitlistSection) {
            const offsetTop = waitlistSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    animateButtonClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    }

    // 6. Interactive animations and effects
    initializeAnimations() {
        // Animate hero elements on load
        this.animateOnLoad();
        
        // Initialize intersection observer for scroll animations
        this.setupIntersectionObserver();
        
        // Initialize notification animations
        this.animateNotifications();
    }

    animateOnLoad() {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-toggle, .hero-cta');
        
        heroElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe feature cards and sections
        const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .step, .bangalore-card');
        animateElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateNotifications() {
        const notifications = document.querySelectorAll('.notification');
        
        notifications.forEach((notification, index) => {
            setTimeout(() => {
                notification.style.animation = `slideInRight 0.5s ease-out ${index * 0.2}s both`;
            }, 1000 + index * 500);
        });
    }

    handleScrollAnimations() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
}

// Global function for onclick handlers in HTML
function showWaitlist(userType) {
    const app = window.manayApp;
    const waitlistSection = document.getElementById('waitlist');
    const userTypeSelect = document.getElementById('userType');
    
    if (waitlistSection) {
        // Set the user type in the form
        if (userTypeSelect && userType) {
            userTypeSelect.value = userType;
        }
        
        // Scroll to waitlist
        const offsetTop = waitlistSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Initialize the app
const manayApp = new ManayApp();
window.manayApp = manayApp;

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .form-success {
        display: none;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        text-align: center;
        padding: 40px 20px;
    }
    
    .form-success i {
        font-size: 48px;
        color: #4CAF50;
        margin-bottom: 20px;
    }
    
    .form-success h3 {
        color: #2c3e50;
        margin-bottom: 10px;
    }
    
    .form-success p {
        color: #7f8c8d;
        font-size: 16px;
    }
    
    .feature-card, .pricing-card, .step, .bangalore-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .feature-card.animate-in,
    .pricing-card.animate-in,
    .step.animate-in,
    .bangalore-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        opacity: 0;
    }
    
    .primary-button, .secondary-button, .toggle-btn {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .primary-button:hover, .secondary-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .toggle-btn:hover {
        transform: translateY(-1px);
    }
    
    .hero-image {
        transition: transform 0.1s ease-out;
    }
    
    .nav-menu.active {
        display: flex;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        flex-direction: column;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideDown 0.3s ease-out;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

console.log('Manay website initialized successfully! 🏠');