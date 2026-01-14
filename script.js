// script.js
// Menu toggle
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('active');
    
    // Toggle menu icon
    const menuIcon = document.querySelector('.menu-toggle i');
    if (nav.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

function closeMenu() {
    const nav = document.getElementById('nav');
    const menuIcon = document.querySelector('.menu-toggle i');
    
    if (window.innerWidth <= 768) {
        nav.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Fade-in sections
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < triggerBottom){
            section.classList.add('visible');
        }
    });
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (event) => {
    const nav = document.getElementById('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (window.innerWidth <= 768 && 
        nav.classList.contains('active') && 
        !nav.contains(event.target) && 
        !menuToggle.contains(event.target)) {
        closeMenu();
    }
});

// Add data-percent attributes to skills for animation
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.skill span');
    const percentages = ['80%', '70%', '65%', '70%', '75%', '60%'];
    
    skills.forEach((skill, index) => {
        skill.setAttribute('data-percent', percentages[index]);
    });
});
// Add this to your existing script.js file
function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    
    skills.forEach((skill, index) => {
        const progress = skill.querySelector('.progress');
        const percent = progress.getAttribute('data-percent');
        const skillName = skill.querySelector('span').textContent;
        
        // Add percentage to skill name
        skill.querySelector('span').setAttribute('data-percent', percent);
        
        // Animate progress bar when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation
                    setTimeout(() => {
                        progress.style.width = percent + '%';
                    }, index * 100); // Stagger the animations
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skill);
    });
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkills();
    
    // Also add to the existing scroll event to trigger animation
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        window.addEventListener('scroll', () => {
            const sectionTop = skillsSection.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.85;
            
            if (sectionTop < triggerBottom) {
                animateSkills();
            }
        });
    }
});
