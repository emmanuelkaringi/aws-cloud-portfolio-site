// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } 
    });
});

// Add some fun hover effects
document.addEventListener('DOMContentLoaded', function() {
    // Add bounce effect to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== BURGER MENU TOGGLE =====
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const navbar = document.getElementById('navbar');
    
    // Toggle mobile menu
    burger.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!burger.contains(event.target) && !navbar.contains(event.target)) {
            navbar.classList.remove('active');
        }
    });
});


// Visitor count
document.addEventListener("DOMContentLoaded", async () => {
    const countElement = document.getElementById("visitor-count");
    const apiUrl = "https://emmanuelkariithi.com/api/visitor-count"; // Replace with your CloudFront/Domain URL

    try {
        const response = await fetch(apiUrl, { method: "GET" });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        countElement.textContent = data.visitor_count ?? "N/A";
    } catch (error) {
        console.error("Error fetching visitor count:", error);
        countElement.textContent = "Error";
    }
});