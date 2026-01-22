// ===================================
// Vacations Reps - JavaScript
// Mobile Navigation, Form Validation, FAQ Accordion, Smooth Scroll
// ===================================

(function() {
    'use strict';

    // ===== MOBILE NAVIGATION TOGGLE =====
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.navigation-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.navigation-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                // Close other items
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous errors
            clearErrors();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Validate name
            if (name === '' || name.length < 2) {
                showError('nameError', 'Please enter a valid name');
                isValid = false;
            }

            // Validate email
            if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }

            // Validate phone
            if (phone === '' || phone.length < 10) {
                showError('phoneError', 'Please enter a valid phone number');
                isValid = false;
            }

            // Validate message
            if (message === '' || message.length < 10) {
                showError('messageError', 'Please enter a message (minimum 10 characters)');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                const successMessage = document.getElementById('formSuccess');
                if (successMessage) {
                    successMessage.style.display = 'block';
                    // Reset form
                    contactForm.reset();
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 5000);
                }
            }
        });
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(function(element) {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with fade-in classes
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2');
    fadeElements.forEach(function(element) {
        observer.observe(element);
    });

})();