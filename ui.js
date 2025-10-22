// ui.js - ChefOS User Interface JavaScript

// Mobile menu toggle function
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuPanel = mobileMenu.querySelector('.absolute.left-0');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        // Small delay to ensure the element is visible before animating
        setTimeout(() => {
            menuPanel.classList.remove('-translate-x-full');
        }, 10);
    } else {
        menuPanel.classList.add('-translate-x-full');
        // Wait for animation to complete before hiding
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300);
    }
}

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
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Position dashboard fade overlay to align with feature tags
    function positionDashboardFade() {
        const featureTags = document.querySelector('.hero-buttons');
        const dashboardFade = document.querySelector('.fade-bottom');
        const dashboardContainer = document.querySelector('.dashboard-mockup');
        
        if (featureTags && dashboardFade && dashboardContainer) {
            // Get the bottom position of the feature tags relative to the viewport
            const featureTagsRect = featureTags.getBoundingClientRect();
            const dashboardRect = dashboardContainer.getBoundingClientRect();
            
            // Calculate where the fade should start (bottom of feature tags)
            const fadeStartPosition = featureTagsRect.bottom - dashboardRect.top;
            
            // Convert to percentage of dashboard height
            const fadeStartPercent = Math.max(0, Math.min(100, (fadeStartPosition / dashboardRect.height) * 100));
            
            // Update the fade gradient to start at the calculated position
            const fadeStart = Math.max(70, fadeStartPercent);
            dashboardFade.style.background = `linear-gradient(to top, transparent 0%, transparent ${fadeStart}%, rgba(255,255,255,0.3) ${fadeStart + 10}%, white ${fadeStart + 20}%, white 100%)`;
        }
    }
    
    // Position fade on load and resize
    window.addEventListener('load', positionDashboardFade);
    window.addEventListener('resize', positionDashboardFade);
    
});
