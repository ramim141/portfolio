 // Wait until the DOM is fully loaded
 document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click listeners to each filter button
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Get filter value
        const filter = this.getAttribute('data-filter');
        
        // Update active button styling
        filterButtons.forEach(btn => {
          // Reset all buttons
          btn.classList.remove('bg-[#08D665]');
          btn.classList.remove('text-white');
          btn.classList.add('bg-[#1A1A2E]');
          btn.classList.add('text-gray-200');
        });
        
        // Set active button
        this.classList.remove('bg-[#1A1A2E]');
        this.classList.remove('text-gray-200');
        this.classList.add('bg-[#08D665]');
        this.classList.add('text-white');
        
        // Filter the projects
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex'; // Show the card
          } else {
            card.style.display = 'none'; // Hide the card
          }
        });
      });
    });
    
    // Trigger click on "All" button to initialize
    document.querySelector('[data-filter="all"]').click();
  });