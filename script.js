/**
 * MANAY WEBSITE JAVASCRIPT - Enhanced Edition
 * Modern features with mobile-first design
 */

class ManayApp {
    constructor() {
        this.currentUserType = 'landlords';
        this.lastScrollY = 0;
        this.navVisible = true;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupAll();
            });
        } else {
            this.setupAll();
        }
    }

    setupAll() {
        this.hidePageLoader();
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeCookieConsent();
        this.setupScrollProgress();
        this.setupNavbarHide();
        this.setupBackToTop();
        this.setupKeyboardShortcuts();
        this.setupIntersectionObserver();
        this.setupMagneticButtons();
        this.setupSwipeGestures();
        this.setupParallax();
        this.setupAnimatedCounters();
        this.setupToastSystem();
    }

    // ============================================
    // PAGE LOADER - IMMEDIATE HIDE
    // ============================================
    hidePageLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            // Hide immediately for better UX
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            loader.style.pointerEvents = 'none';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    }

    // ============================================
    // TOAST NOTIFICATION SYSTEM
    // ============================================
    setupToastSystem() {
        this.toastContainer = document.getElementById('toastContainer');
    }

    showToast(message, options = {}) {
        const { type = 'info', title = '', duration = 5000 } = options;
        
        if (!this.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <i class="fas ${icons[type]} toast-icon" aria-hidden="true"></i>
            <div class="toast-content">
                ${title ? `<div class="toast-title">${title}</div>` : ''}
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close notification">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
        `;

        this.toastContainer.appendChild(toast);

        // Auto remove
        const removeToast = () => {
            toast.classList.add('hiding');
            setTimeout(() => {
                toast.remove();
            }, 300);
        };

        toast.querySelector('.toast-close').addEventListener('click', removeToast);

        if (duration > 0) {
            setTimeout(removeToast, duration);
        }
    }

    // ============================================
    // SCROLL PROGRESS BAR
    // ============================================
    setupScrollProgress() {
        const progressBar = document.getElementById('scrollProgressBar');
        if (!progressBar) return;

        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    // ============================================
    // NAVBAR HIDE/SHOW ON SCROLL
    // ============================================
    setupNavbarHide() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        const scrollThreshold = 100;
        const hideThreshold = 50;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Don't hide if menu is open
            if (this.isMenuOpen) return;

            // Hide/show based on scroll direction
            if (currentScrollY > scrollThreshold) {
                if (currentScrollY > this.lastScrollY && currentScrollY > hideThreshold) {
                    // Scrolling down - hide
                    navbar.classList.add('hidden');
                    this.navVisible = false;
                } else {
                    // Scrolling up - show
                    navbar.classList.remove('hidden');
                    this.navVisible = true;
                }
            } else {
                navbar.classList.remove('hidden');
                this.navVisible = true;
            }

            this.lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    setupBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        const showThreshold = 300;

        window.addEventListener('scroll', () => {
            if (window.scrollY > showThreshold) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    setupKeyboardShortcuts() {
        const modal = document.getElementById('keyboardHelpModal');
        const closeBtn = document.getElementById('closeKeyboardHelp');

        // Show help modal
        const showHelp = () => {
            if (modal) {
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        };

        // Hide help modal
        const hideHelp = () => {
            if (modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            }
        };

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', hideHelp);
        }

        // Close on backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) hideHelp();
            });
        }

        // Keyboard handler
        document.addEventListener('keydown', (e) => {
            // Close modal with Escape
            if (e.key === 'Escape') {
                hideHelp();
                // Also close mobile menu
                this.closeMobileMenu();
                return;
            }

            // Ignore if in input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
                return;
            }

            // Show help with ?
            if (e.key === '?' || e.key === 'Slash') {
                e.preventDefault();
                showHelp();
                return;
            }

            // Scroll to waitlist with 'w'
            if (e.key === 'w' || e.key === 'W') {
                e.preventDefault();
                this.scrollToWaitlist();
                return;
            }

            // Landlords view with 'l'
            if (e.key === 'l' || e.key === 'L') {
                e.preventDefault();
                const landlordBtn = document.querySelector('[data-target="landlords"]');
                if (landlordBtn) this.handleViewToggle(landlordBtn);
                return;
            }

            // Renters view with 'r'
            if (e.key === 'r' || e.key === 'R') {
                e.preventDefault();
                const renterBtn = document.querySelector('[data-target="renters"]');
                if (renterBtn) this.handleViewToggle(renterBtn);
                return;
            }

            // Scroll to top with 't'
            if (e.key === 't' || e.key === 'T') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
        });
    }

    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animation if it's a stat
                    const counters = entry.target.querySelectorAll('[data-count]');
                    counters.forEach(counter => this.animateCounter(counter));
                }
            });
        }, observerOptions);

        // Observe sections
        document.querySelectorAll('.lazy-section').forEach(section => {
            observer.observe(section);
        });

        // Observe steps
        document.querySelectorAll('.step').forEach(step => {
            observer.observe(step);
        });
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    setupAnimatedCounters() {
        // Counters are animated when they come into view
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        if (!target || element.classList.contains('counted')) return;

        element.classList.add('counted');
        const duration = 2000;
        const start = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (target - startValue) * easeOut);
            
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };

        requestAnimationFrame(updateCounter);
    }

    // ============================================
    // MAGNETIC BUTTON EFFECT
    // ============================================
    setupMagneticButtons() {
        // Only on non-touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const buttons = document.querySelectorAll('.magnetic-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ============================================
    // SWIPE GESTURES FOR MOBILE
    // ============================================
    setupSwipeGestures() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');

        // Touch start
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        // Touch end - detect swipe
        document.addEventListener('touchend', (e) => {
            if (!this.touchStartX || !this.touchStartY) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const diffX = this.touchStartX - touchEndX;
            const diffY = this.touchStartY - touchEndY;

            // Horizontal swipe detection
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                // Swipe left - close menu
                if (diffX > 0 && this.isMenuOpen) {
                    this.closeMobileMenu();
                }
                // Swipe right - open menu (from left edge)
                if (diffX < 0 && !this.isMenuOpen && this.touchStartX < 50) {
                    this.openMobileMenu();
                }
            }

            this.touchStartX = 0;
            this.touchStartY = 0;
        }, { passive: true });
    }

    openMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.add('active');
            navToggle.classList.add('active');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.classList.add('menu-open');
            this.isMenuOpen = true;
        }
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('navMenu');
        const navToggle = document.getElementById('navToggle');
        
        if (navMenu && navToggle) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            this.isMenuOpen = false;
        }
    }

    // ============================================
    // PARALLAX EFFECT
    // ============================================
    setupParallax() {
        // Only on non-touch devices for performance
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const parallaxBg = document.querySelector('.hero-parallax-bg');
        if (!parallaxBg) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    setupEventListeners() {
        // Toggle functionality between landlord/renter views
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleViewToggle(e.currentTarget);
            });
        });

        // Form submission handling
        const waitlistForm = document.getElementById('waitlistForm');
        if (waitlistForm) {
            waitlistForm.addEventListener('submit', (e) => {
                this.handleFormSubmit(e);
            });
        }

        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleSmoothScroll(e);
            });
        });

        // Mobile menu toggle
        const navToggle = document.getElementById('navToggle');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMobileMenu();
                } else {
                    this.openMobileMenu();
                }
            });
        }

        // Close mobile menu when clicking a link
        const mobileNavLinks = document.querySelectorAll('.nav-menu .nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });

        // FAB button
        const fabButton = document.getElementById('fabButton');
        if (fabButton) {
            fabButton.addEventListener('click', () => {
                this.scrollToWaitlist();
            });
        }

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // ============================================
    // VIEW TOGGLE
    // ============================================
    handleViewToggle(button) {
        try {
            const target = button.getAttribute('data-target');
            const toggleButtons = document.querySelectorAll('.toggle-btn');
            const ctaContents = document.querySelectorAll('.cta-content');

            // Update button states
            toggleButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            // Update CTA content
            ctaContents.forEach(content => {
                content.classList.remove('active');
                content.hidden = true;
                if (content.id === `${target}-cta`) {
                    content.classList.add('active');
                    content.hidden = false;
                }
            });

            // Animate the transition
            this.animateToggleTransition();

            // Show toast
            const viewName = target === 'landlords' ? 'Landlord' : 'Renter';
            this.showToast(`Switched to ${viewName} view`, { type: 'info', duration: 2000 });

        } catch (error) {
            console.error('Error handling view toggle:', error);
        }
    }

    animateToggleTransition() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = 'scale(0.98)';
            heroContent.style.opacity = '0.9';
            
            setTimeout(() => {
                heroContent.style.transform = 'scale(1)';
                heroContent.style.opacity = '1';
            }, 150);
        }
    }

    // ============================================
    // FORM HANDLING
    // ============================================
    handleFormSubmit(event) {
        event.preventDefault();
        
        try {
            const form = event.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Clear previous errors
            this.clearFormErrors();

            // Validate form data
            if (!this.validateForm(data)) {
                this.showToast('Please fix the errors in the form', { type: 'error' });
                return;
            }

            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            
            submitButton.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline-flex';

            // Submit form
            this.submitFormData(data)
                .then(() => {
                    this.showSuccessMessage();
                    this.showToast('Successfully joined the waitlist!', { 
                        type: 'success', 
                        title: 'Welcome aboard!' 
                    });
                    form.reset();
                })
                .catch((error) => {
                    this.showToast(error.message, { type: 'error', title: 'Submission failed' });
                })
                .finally(() => {
                    submitButton.disabled = false;
                    if (btnText) btnText.style.display = 'inline';
                    if (btnLoading) btnLoading.style.display = 'none';
                });

        } catch (error) {
            console.error('Error handling form submission:', error);
            this.showToast('An unexpected error occurred. Please try again.', { type: 'error' });
        }
    }

    clearFormErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(el => {
            el.setAttribute('aria-invalid', 'false');
        });
    }

    validateForm(data) {
        const errors = {};
        let isValid = true;

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Please enter a valid name (at least 2 characters)';
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // Phone validation (Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = data.phone ? data.phone.replace(/[\s\-\+]/g, '') : '';
        if (!data.phone || !phoneRegex.test(cleanPhone)) {
            errors.phone = 'Please enter a valid 10-digit Indian phone number';
            isValid = false;
        }

        // User type validation
        if (!data.userType) {
            errors.userType = 'Please select your user type';
            isValid = false;
        }

        // Display errors
        Object.keys(errors).forEach(field => {
            const errorEl = document.getElementById(`${field}-error`);
            const inputEl = document.getElementById(field);
            if (errorEl) {
                errorEl.textContent = errors[field];
            }
            if (inputEl) {
                inputEl.setAttribute('aria-invalid', 'true');
            }
        });

        return isValid;
    }

    submitFormData(data) {
        return new Promise((resolve, reject) => {
            const form = document.getElementById('waitlistForm');
            if (!form) {
                reject(new Error('Form not found'));
                return;
            }
            
            const formAction = form.getAttribute('action');
            
            fetch(formAction, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    resolve({ success: true, data });
                } else {
                    reject(new Error('Failed to submit form. Please try again.'));
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                reject(new Error('Network error. Please check your connection and try again.'));
            });
        });
    }

    showSuccessMessage() {
        const form = document.getElementById('waitlistForm');
        const successMessage = document.getElementById('formSuccess');
        const ariaLiveRegion = document.getElementById('aria-live-region');
        
        if (form && successMessage) {
            form.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.classList.add('animate-fade-in');
            
            if (ariaLiveRegion) {
                ariaLiveRegion.textContent = "You're on the list! We'll WhatsApp you when we're ready for beta testing in your area.";
            }
        }
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    handleSmoothScroll(event) {
        event.preventDefault();
        
        try {
            const targetId = event.currentTarget.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
                const offsetTop = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                this.closeMobileMenu();
            }
        } catch (error) {
            console.error('Error handling smooth scroll:', error);
        }
    }

    scrollToWaitlist() {
        const waitlistSection = document.getElementById('waitlist');
        if (waitlistSection) {
            const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
            const offsetTop = waitlistSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Focus the name input
            setTimeout(() => {
                const nameInput = document.getElementById('name');
                if (nameInput) nameInput.focus();
            }, 500);
        }
    }

    // ============================================
    // INITIALIZE ANIMATIONS
    // ============================================
    initializeAnimations() {
        this.animateOnLoad();
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
            }, index * 150);
        });
    }

    animateNotifications() {
        const notifications = document.querySelectorAll('.notification');
        
        notifications.forEach((notification, index) => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                notification.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 1000 + index * 300);
        });
    }

    // ============================================
    // COOKIE CONSENT
    // ============================================
    initializeCookieConsent() {
        const cookieBanner = document.getElementById('cookieBanner');
        const acceptBtn = document.getElementById('cookieAccept');
        const declineBtn = document.getElementById('cookieDecline');
        
        const cookieChoice = localStorage.getItem('cookieConsent');
        
        if (!cookieChoice && cookieBanner) {
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 3000);
        }
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'accepted');
                this.hideCookieBanner(cookieBanner);
                this.showToast('Cookies accepted!', { type: 'success', duration: 2000 });
                if (typeof gtag !== 'undefined') {
                    gtag('consent', 'update', {
                        'ad_storage': 'granted',
                        'analytics_storage': 'granted'
                    });
                }
            });
        }
        
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'declined');
                this.hideCookieBanner(cookieBanner);
                this.showToast('Cookies declined', { type: 'info', duration: 2000 });
            });
        }
    }

    hideCookieBanner(banner) {
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    // ============================================
    // WINDOW RESIZE HANDLER
    // ============================================
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }
}

// ============================================
// GLOBAL FUNCTIONS
// ============================================

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
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 70;
        const offsetTop = waitlistSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });

        // Focus the name input after scroll
        setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
        }, 600);

        // Show toast
        if (app) {
            app.showToast('Scroll to join the waitlist!', { type: 'info', duration: 2000 });
        }
    }
}

// ============================================
// INITIALIZE APP
// ============================================

const manayApp = new ManayApp();
window.manayApp = manayApp;
