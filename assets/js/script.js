document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    // Intersection Observer to highlight active navigation link based on scroll position
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute("id");
                
                navItems.forEach(item => {
                    item.classList.remove("active");
                    if (item.getAttribute("href") === `#${currentId}`) {
                        item.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});





// --- LOADING SCREEN FADE OUT ---
document.addEventListener("DOMContentLoaded", () => {
    const loaderWrapper = document.getElementById("loader-wrapper");
    
    // Wait for the 1.5s animation to finish, plus a tiny 100ms buffer, then fade out
    setTimeout(() => {
        loaderWrapper.classList.add("fade-out");
        
        // Optional: remove it from the DOM completely after fade out to keep things clean
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 400); // Wait for the 0.4s CSS opacity transition
        
    }, 1600); 
});