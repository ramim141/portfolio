// Mobile menu functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when window is resized to desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) { // 768px is the md breakpoint in Tailwind
        mobileMenu.classList.add('hidden');
    }
});

// Navbar scroll behavior
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const nav = document.querySelector('nav');
    
    if (currentScroll > lastScroll && currentScroll > 40) {
        // Scrolling down & past the top bar
        nav.classList.add('-translate-y-10'); // Height of the top bar
    } else {
        // Scrolling up
        nav.classList.remove('-translate-y-10');
    }
    lastScroll = currentScroll;
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu if open
            mobileMenu.classList.add('hidden');
        }
    });
});

// News headlines array
const headlines = [
    "FOX NEWS ANCHOR BRET BAIER...",
    "For new anchor breit better"
];

let currentHeadlineIndex = 0;
const headlineElement = document.querySelector('.text-white.text-sm.ml-3');
const leftArrow = document.querySelector('.fa-arrow-left').parentElement;
const rightArrow = document.querySelector('.fa-arrow-right').parentElement;

// Function to update headline with animation
function updateHeadline(direction) {
    // Add fade out animation
    headlineElement.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    
    setTimeout(() => {
        // Update index based on direction
        if (direction === 'right') {
            currentHeadlineIndex = (currentHeadlineIndex + 1) % headlines.length;
        } else {
            currentHeadlineIndex = currentHeadlineIndex === 0 ? headlines.length - 1 : currentHeadlineIndex - 1;
        }
        
        // Update text
        headlineElement.textContent = headlines[currentHeadlineIndex];
        
        // Add fade in animation
        headlineElement.classList.remove('opacity-0');
    }, 300);
}

// Add click event listeners to arrows
leftArrow.addEventListener('click', () => updateHeadline('left'));
rightArrow.addEventListener('click', () => updateHeadline('right'));



