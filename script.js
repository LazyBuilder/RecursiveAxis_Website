document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlist-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Here you would typically send this data to your server or a third-party service
            console.log('Waitlist submission:', { name, email });
            
            // Show a success message
            alert('Thank you for joining our waitlist! We\'ll be in touch soon.');
            
            // Clear the form
            form.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70; // Adjust this value based on your fixed header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});