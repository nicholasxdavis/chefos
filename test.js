// test.js - Hero Title and Screenshot Alignment

document.addEventListener('DOMContentLoaded', function() {
    // Function to align hero title with screenshot and add top spacing
    function alignHeroElements() {
        // Get the hero title element
        const heroTitle = document.querySelector('.hero-title');
        // Get the dashboard mockup element
        const dashboardMockup = document.querySelector('.dashboard-mockup');
        
        if (heroTitle && dashboardMockup) {
            // Add 18px top spacing to both elements (8px + 10px more)
            const topSpacing = 18;
            
            // Get the position of the hero title
            const titleRect = heroTitle.getBoundingClientRect();
            // Get the position of the dashboard mockup
            const mockupRect = dashboardMockup.getBoundingClientRect();
            
            // Calculate the difference in top positions
            const positionDifference = titleRect.top - mockupRect.top;
            
            console.log('Title top:', titleRect.top);
            console.log('Mockup top:', mockupRect.top);
            console.log('Position difference:', positionDifference);
            
            // Apply top spacing to both elements
            heroTitle.style.transform = `translateY(${topSpacing}px)`;
            dashboardMockup.style.transform = `translateY(${topSpacing}px)`;
            
            // If the title is higher than the mockup, adjust the mockup position
            if (positionDifference < 0) {
                // Title is higher, so we need to move the mockup up
                const adjustment = Math.abs(positionDifference);
                dashboardMockup.style.transform = `translateY(${topSpacing - adjustment}px)`;
                console.log('Moved mockup up by:', adjustment, 'px');
            } else if (positionDifference > 0) {
                // Title is lower, so we need to move the mockup down
                dashboardMockup.style.transform = `translateY(${topSpacing + positionDifference}px)`;
                console.log('Moved mockup down by:', positionDifference, 'px');
            } else {
                // They're already aligned, just apply top spacing
                console.log('Elements are already aligned, applied top spacing');
            }
            
            console.log('Applied 18px top spacing to both elements');
        }
    }
    
    // Function to reset alignment
    function resetAlignment() {
        const heroTitle = document.querySelector('.hero-title');
        const dashboardMockup = document.querySelector('.dashboard-mockup');
        
        if (heroTitle) {
            heroTitle.style.transform = '';
        }
        if (dashboardMockup) {
            dashboardMockup.style.transform = '';
        }
        console.log('Alignment reset for both elements');
    }
    
    // Run alignment on page load
    alignHeroElements();
    
    // Run alignment on window resize
    window.addEventListener('resize', function() {
        // Reset first, then realign
        resetAlignment();
        setTimeout(alignHeroElements, 100); // Small delay to ensure layout is updated
    });
    
    // Expose functions to global scope for testing
    window.alignHeroElements = alignHeroElements;
    window.resetAlignment = resetAlignment;
    
    console.log('Hero alignment script loaded. Use alignHeroElements() or resetAlignment() in console to test.');
});
