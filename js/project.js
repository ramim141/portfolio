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
                btn.classList.remove('bg-[#08D665]', 'text-white');
                btn.classList.add('bg-[#1A1A2E]', 'text-gray-200');
            });
            
            // Set active button
            this.classList.remove('bg-[#1A1A2E]', 'text-gray-200');
            this.classList.add('bg-[#08D665]', 'text-white');
            
            // Filter the projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                card.style.display = (filter === 'all' || categories.includes(filter)) ? 'flex' : 'none';
            });
        });
    });
    
    // Trigger click on "All" button to initialize
    document.querySelector('[data-filter="all"]').click();

    // Initialize modal elements
    window.modal = document.getElementById('projectModal');
    window.modalTitle = document.getElementById('modalTitle');
    window.modalImage = document.getElementById('modalImage');
    window.modalDescription = document.getElementById('modalDescription');
    window.modalTechnologies = document.getElementById('modalTechnologies');
    window.modalFeatures = document.getElementById('modalFeatures');
    window.modalLiveLink = document.getElementById('modalLiveLink');
    window.modalGithubLink = document.getElementById('modalGithubLink');

    // Make openProjectModal function globally available
    window.openProjectModal = function(projectId) {
        const project = projects[projectId];
        if (!project) return;

        // Update modal content
        window.modalTitle.textContent = project.title;
        window.modalImage.src = project.image;
        window.modalDescription.textContent = project.description;
        
        // Update technologies
        window.modalTechnologies.innerHTML = project.technologies
            .map(tech => `<span class="bg-[#08D665]/10 text-[#08D665] px-3 py-1 rounded-full text-sm">${tech}</span>`)
            .join('');
        
        // Update features
        window.modalFeatures.innerHTML = project.features
            .map(feature => `<li>${feature}</li>`)
            .join('');
        
        // Update links
        window.modalLiveLink.href = project.liveLink;
        window.modalGithubLink.href = project.githubLink;
        
        // Show modal
        window.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    };

    // Make closeProjectModal function globally available
    window.closeProjectModal = function() {
        window.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    };

    // Close modal when clicking outside
    window.modal.addEventListener('click', (e) => {
        if (e.target === window.modal) {
            window.closeProjectModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !window.modal.classList.contains('hidden')) {
            window.closeProjectModal();
        }
    });
});

// Project data
const projects = {
    'aniluxe': {
        title: 'ANILUXE',
        image: './images/aniluxe.png',
        description: 'A full-featured e-commerce platform built with Django, featuring product management, shopping cart, payment integration, and user authentication.',
        technologies: ['Django', 'PostgreSQL', 'JavaScript', 'Tailwind CSS'],
        features: [
            'User authentication and authorization',
            'Product catalog with categories and search',
            'Shopping cart functionality',
            'Secure payment integration',
            'Order management system',
            'Admin dashboard for product management',
            'Responsive design for all devices'
        ],
        liveLink: '#',
        githubLink: '#'
    },
    'restful-api': {
        title: 'RESTful API Service',
        image: './images/api.png',
        description: 'A comprehensive API service built with Django REST Framework, featuring authentication, rate limiting, and extensive documentation.',
        technologies: ['Django', 'DRF', 'Redis', 'Swagger'],
        features: [
            'RESTful API endpoints',
            'JWT authentication',
            'Rate limiting and throttling',
            'API documentation with Swagger',
            'Caching with Redis',
            'Unit and integration testing',
            'Error handling and logging'
        ],
        liveLink: '#',
        githubLink: '#'
    },
    'task-management': {
        title: 'Task Management System',
        image: './images/task.png',
        description: 'A collaborative task management application with real-time updates, team management, and detailed analytics.',
        technologies: ['Django', 'Channels', 'React', 'WebSockets'],
        features: [
            'Real-time task updates',
            'Team collaboration features',
            'Task assignment and tracking',
            'Progress monitoring and analytics',
            'File attachments and comments',
            'Email notifications',
            'Mobile-responsive interface'
        ],
        liveLink: '#',
        githubLink: '#'
    }
};