// ===================================
// CUSTOM CURSOR - Circle and Orbit following cursor
// ===================================

const cursorCircle = document.querySelector('.cursor-circle');
const cursorOrbit = document.querySelector('.cursor-orbit');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let circleX = mouseX;
let circleY = mouseY;
let orbitX = mouseX;
let orbitY = mouseY;

const circleSpeed = 0.15;
const orbitSpeed = 0.08;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    circleX += (mouseX - circleX) * circleSpeed;
    circleY += (mouseY - circleY) * circleSpeed;
    
    orbitX += (mouseX - orbitX) * orbitSpeed;
    orbitY += (mouseY - orbitY) * orbitSpeed;
    
    cursorCircle.style.left = circleX + 'px';
    cursorCircle.style.top = circleY + 'px';
    
    cursorOrbit.style.left = orbitX + 'px';
    cursorOrbit.style.top = orbitY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

const hoverElements = document.querySelectorAll('a, button, .nav-link, .btn, .project-link, .contact-item, .social-link, .skill-card, .project-card, .timeline-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorCircle.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursorCircle.classList.remove('hovering');
    });
});

// ===================================
// SMOOTH SCROLL & NAVIGATION
// ===================================

const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// ===================================
// ACTIVE SECTION HIGHLIGHTING
// ===================================

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll(
    '.skill-card, .project-card, .timeline-item, .about-paragraph, .highlight-item'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===================================
// CONTACT FORM HANDLING
// ===================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    console.log('Form submitted:', formData);
    
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    contactForm.reset();
});

// ===================================
// SMOOTH HERO ENTRANCE ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.querySelector('.hero-content').style.opacity = '1';
});

// ===================================
// SCROLL EVENT LISTENERS
// ===================================

let scrollTimeout;

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        handleNavbarScroll();
        updateActiveLink();
    });
});

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
    handleNavbarScroll();
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        setTimeout(() => {
            heroContent.style.opacity = '1';
        }, 100);
    }
});

// ===================================
// UTILITY: SCROLL TO TOP
// ===================================

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// PERFORMANCE: REDUCE MOTION
// ===================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    const animatedEls = document.querySelectorAll('.fade-in');
    animatedEls.forEach(el => {
        el.classList.add('visible');
    });
    
    cursorCircle.style.display = 'none';
    cursorOrbit.style.display = 'none';
    document.body.style.cursor = 'auto';
}