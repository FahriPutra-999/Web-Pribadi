// Dark Cyberpunk Portfolio - Interactive Elements

document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate toggle button
      const spans = navToggle.querySelectorAll('span');
      navToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Smooth scroll for anchor links (enhanced)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Formspree handles submission via AJAX - no need for custom submit handler
  // The form now uses data-fs-* attributes with @formspree/ajax library
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    // Optional: Add custom behavior after success/error if needed
    document.addEventListener('formspree:success', function() {
      const successEl = document.querySelector('[data-fs-success]');
      if (successEl) {
        successEl.style.display = 'block';
        contactForm.style.display = 'none';
        setTimeout(() => {
          contactForm.style.display = 'block';
          successEl.style.display = 'none';
          contactForm.reset();
        }, 5000);
      }
    });

    document.addEventListener('formspree:error', function() {
      const errorEl = document.querySelector('[data-fs-error]');
      if (errorEl) {
        errorEl.style.display = 'block';
        setTimeout(() => {
          errorEl.style.display = 'none';
        }, 5000);
      }
    });
  }

  // Add glitch effect on hover for logo
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', function() {
      this.style.animation = 'glitch-anim 0.3s';
      setTimeout(() => {
        this.style.animation = '';
      }, 300);
    });
  }

  // Parallax effect for hero orbs (subtle)
  window.addEventListener('mousemove', function(e) {
    const orbs = document.querySelectorAll('.orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 0.5;
      const x = mouseX * speed * 20;
      const y = mouseY * speed * 20;
      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
});

// Add CSS for mobile nav toggle animation
const style = document.createElement('style');
style.textContent = `
  .nav-toggle.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-7px, 6px);
  }
  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }
  .nav-toggle.active span:nth-child(3) {
    transform: rotate(45deg) translate(-7px, -6px);
  }
  .nav-toggle span {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);
