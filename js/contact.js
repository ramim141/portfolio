// Get the contact form element
const contactForm = document.getElementById('contactForm');

// Add submit event listener to the form
contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Here you would typically send the data to your server
    // For now, we'll just show the success message
    
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'mb-6 bg-[#00FF62] text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 opacity-0';
    successMessage.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i class="fas fa-check-circle mr-2"></i>
                <span>Message sent successfully!</span>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Insert the message at the top of the form
    contactForm.parentElement.insertBefore(successMessage, contactForm);
    
    // Animate the message in
    setTimeout(() => {
        successMessage.style.opacity = '1';
    }, 100);
    
    // Remove the message after 5 seconds
    setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
            if (successMessage.parentElement) {
                successMessage.parentElement.removeChild(successMessage);
            }
        }, 300);
    }, 5000);
    
    // Reset the form
    contactForm.reset();
}); 