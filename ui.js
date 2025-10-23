// ui.js - ChefOS User Interface JavaScript

// Alpine.js data for mobile menu state
document.addEventListener('alpine:init', () => {
    Alpine.data('mobileMenu', () => ({
        isOpen: false,
        toggle() {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                // Allow body scroll when menu is closed
                document.body.style.overflow = '';
            }
        },
        close() {
            this.isOpen = false;
            document.body.style.overflow = '';
        }
    }));
});


// --- OLD toggleMobileMenu function REMOVED ---

document.addEventListener('DOMContentLoaded', () => {

    // --- FAQ Accordion ---
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        const button = item.querySelector('button');
        button.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            // Close all other items
            allFaqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('active');
                }
            });
            // Toggle the clicked item
            if (!wasActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

    // --- Scroll Animations ---
    // (Keep your existing IntersectionObserver code here)
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });


    // --- Button Ripple Effects ---
    // (Keep your existing ripple effect code here)
     const buttons = document.querySelectorAll('.glow-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation if not already defined
    if (!document.querySelector('style[data-ripple-effect="true"]')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.dataset.rippleEffect = 'true';
        rippleStyle.textContent = `
            @keyframes ripple-effect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }


    // --- Position Dashboard Fade ---
    // (Keep your existing positionDashboardFade code here)
    function positionDashboardFade() {
        const featureTags = document.querySelector('.hero-buttons');
        const dashboardFade = document.querySelector('.fade-bottom'); // Ensure this element exists if needed
        const dashboardContainer = document.querySelector('.dashboard-mockup');

        // Your existing logic here...
    }

    // Position fade on load and resize
    window.addEventListener('load', positionDashboardFade);
    window.addEventListener('resize', positionDashboardFade);

});