document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with updated settings
    AOS.init({
        duration: 1000,
        offset: 100,
        delay: 100,
        once: true,
        easing: 'ease-out-cubic',
        mirror: true
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Section visibility animation
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Enhanced project card interactions
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 10;
            const rotateY = (x - 0.5) * 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });

    // Add smooth reveal animation for sections
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    // Add dynamic hover effect for navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add typing animation
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["Data Engineer", "Cloud Architect", "ML Enthusiast", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } 
        else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    // Start typing animation when page loads
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Add parallax effect to hero section
document.addEventListener('mousemove', (e) => {
    const moveValue = 5;
    const x = (e.clientX * moveValue) / 250;
    const y = (e.clientY * moveValue) / 250;
    
    document.querySelector('.hero-text').style.transform = `translate(${x}px, ${y}px)`;
});

// Add hover effect for skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add glitch effect to name
const glitchText = document.querySelector('.highlight');
setInterval(() => {
    glitchText.classList.add('glitch');
    setTimeout(() => {
        glitchText.classList.remove('glitch');
    }, 200);
}, 3000);

// Add 3D parallax effect
document.addEventListener('mousemove', (e) => {
    const sections = document.querySelectorAll('.parallax-section');
    const cards = document.querySelectorAll('.education-item');
    
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    sections.forEach(section => {
        section.style.transform = `
            perspective(1000px)
            rotateY(${x * 10}deg)
            rotateX(${-y * 10}deg)
        `;
    });

    cards.forEach(card => {
        card.style.transform = `
            translateZ(50px)
            rotateY(${x * 20}deg)
            rotateX(${-y * 20}deg)
        `;
    });
});

// Add scroll-based parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const speed = section.dataset.speed || 0.5;
        section.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Enhance name reveal animation
document.querySelector('.name-reveal').addEventListener('animationend', () => {
    document.querySelector('.hero-subtitle').style.opacity = '1';
    document.querySelector('.tagline').style.opacity = '1';
});

// Enhanced 3D effects
document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / 50;
    const moveY = (clientY - centerY) / 50;

    // 3D text rotation
    document.querySelectorAll('.text-3d, .text-3d-gradient').forEach(element => {
        const depth = element.dataset.depth || 20;
        element.style.transform = `
            translateZ(${depth}px)
            rotateX(${-moveY}deg)
            rotateY(${moveX}deg)
        `;
    });

    // Parallax background
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        parallaxBg.style.transform = `
            translateX(${moveX * 2}px)
            translateY(${moveY * 2}px)
            translateZ(-50px)
        `;
    }
});

// Staggered animations on page load
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('[data-delay]');
    elements.forEach(element => {
        const delay = parseInt(element.dataset.delay);
        element.style.setProperty('--delay', `${delay}ms`);
    });
});

// 3D hover effect for buttons
document.querySelectorAll('.btn-3d').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        button.style.transform = `
            perspective(1000px)
            translateY(-5px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateZ(20px)
        `;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// Smooth reveal for sections
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.setProperty('--delay', `${entry.target.dataset.delay || 0}ms`);
            entry.target.classList.add('revealed');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    sectionObserver.observe(section);
});

// Add 3D hover effect for name
document.querySelectorAll('.first-name, .last-name').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        element.style.transform = `
            perspective(1000px)
            rotateX(${y * 20}deg)
            rotateY(${x * 20}deg)
            translateZ(50px)
        `;
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'none';
    });
});

// Add text animation for hero description
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
    animatedText.innerHTML = animatedText.textContent.split('').map(char => 
        `<span style="display:inline-block;">${char}</span>`
    ).join('');

    const chars = animatedText.querySelectorAll('span');
    chars.forEach((char, i) => {
        char.style.animation = `fadeInUp 0.5s ease forwards`;
        char.style.animationDelay = `${1.5 + (i * 0.05)}s`;
    });
}

// Add parallax effect for hero section
document.querySelector('.hero-section').addEventListener('mousemove', (e) => {
    const moveX = (e.clientX * 0.005);
    const moveY = (e.clientY * 0.005);

    document.querySelector('.hero-content').style.transform = 
        `translate3d(${moveX}px, ${moveY}px, 0)`;
});
