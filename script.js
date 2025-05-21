// Modern JavaScript for Vaib - Health Website
document.addEventListener('DOMContentLoaded', function() {
    // Add modern font from Google Fonts
    const linkFont = document.createElement('link');
    linkFont.rel = 'stylesheet';
    linkFont.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
    document.head.appendChild(linkFont);
    
    // Mobile menu functionality
    setupMobileMenu();
    
    // Initialize animations for cards
    initCardAnimations();
    
    // Setup theme toggling (light/dark mode)
    setupThemeToggler();
    
    // Setup newsletter form with validation
    setupNewsletterForm();
    
    // Add card toggle functionality
    setupCardToggler();
    
    // Add animation effect for cards
    setupCardAnimator();
    
    // Add scroll animations
    setupScrollAnimations();
    
    // Add intersection observer for elements
    setupIntersectionObserver();
  });
  
  // Mobile menu setup
  function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    
    // Create menu toggle button if it doesn't exist
    if (!document.querySelector('.menu-toggle')) {
      const menuToggle = document.createElement('button');
      menuToggle.className = 'menu-toggle';
      menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
      menuToggle.innerHTML = '☰';
      
      const navLinks = document.querySelector('.nav-links');
      
      // Initially hide nav links on mobile
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
      
      menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
          menuToggle.innerHTML = '✕';
          document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
          menuToggle.innerHTML = '☰';
          document.body.style.overflow = ''; // Re-enable scrolling
        }
      });
      
      navbar.appendChild(menuToggle);
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
          navLinks.classList.remove('active');
          menuToggle.innerHTML = '☰';
          document.body.style.overflow = '';
        }
      });
      
      // Close menu when clicking on a link
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰';
            document.body.style.overflow = '';
          }
        });
      });
    }
    
    // Update on window resize
    window.addEventListener('resize', () => {
      const navLinks = document.querySelector('.nav-links');
      if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        navLinks.style.display = 'flex';
        document.body.style.overflow = '';
      } else if (!navLinks.classList.contains('active')) {
        navLinks.style.display = 'none';
      }
    });
  }
  
  // Card animations setup
  function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach((card, index) => {
      // Add staggered animation delay for initial load
      card.style.animationDelay = `${index * 0.1}s`;
      
      // Add hover animation
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
      });
    });
  }
  
  // Theme toggler setup (change theme button to toggle light/dark mode)
  function setupThemeToggler() {
    const themeBtn = document.getElementById('changeTextBtn');
    
    if (themeBtn) {
      themeBtn.textContent = 'Toggle Dark Mode';
      
      themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
          themeBtn.textContent = 'Toggle Light Mode';
          showMessage('Dark mode activated ✓');
        } else {
          themeBtn.textContent = 'Toggle Dark Mode';
          showMessage('Light mode activated ✓');
        }
      });
    }
  }
  
  // Newsletter form setup
  function setupNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        if (validateEmail(email)) {
          // Show loading indicator
          const button = this.querySelector('button');
          const originalText = button.textContent;
          button.innerHTML = '<span class="loader"></span>';
          button.disabled = true;
          
          // Simulate submission delay
          setTimeout(() => {
            // Successful submission animation
            this.classList.add('submitted');
            button.innerHTML = originalText;
            button.disabled = false;
            showMessage(`Thanks for subscribing! We've sent a confirmation to ${email}`);
            this.reset();
          }, 1500);
        } else {
          // Error animation
          const input = this.querySelector('input[type="email"]');
          input.classList.add('error');
          showMessage('Please enter a valid email address');
          
          setTimeout(() => {
            input.classList.remove('error');
          }, 1000);
        }
      });
    }
  }
  
  // Email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Show message notification
  function showMessage(message) {
    // Check if alert box already exists
    let alertBox = document.querySelector('.alert-box');
    
    // If it exists, remove it first
    if (alertBox) {
      alertBox.remove();
    }
    
    // Create new alert box
    alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.textContent = message;
    
    // Add to DOM
    const interactions = document.querySelector('.interactions');
    interactions.after(alertBox);
    
    // Remove after delay with fade out
    setTimeout(() => {
      alertBox.style.opacity = '0';
      setTimeout(() => {
        if (alertBox.parentNode) {
          alertBox.parentNode.removeChild(alertBox);
        }
      }, 300);
    }, 3000);
  }
  
  // Card toggler setup
  function setupCardToggler() {
    const toggleBtn = document.getElementById('toggleCardBtn');
    let cardAdded = false;
    
    if (toggleBtn) {
      toggleBtn.textContent = 'Add Featured Card';
      
      toggleBtn.addEventListener('click', () => {
        const container = document.querySelector('.grid-container');
      
        if (!cardAdded) {
          const newCard = document.createElement('div');
          newCard.className = 'card dynamic';
          newCard.style.opacity = '0';
          newCard.style.transform = 'translateY(20px)';
          
          newCard.innerHTML = `
            <h2>🧪 Featured Research</h2>
            <p>Explore cutting-edge research and breakthroughs in global health and wellness technologies.</p>
            <a href="research.html" class="btn">View Research</a>
          `;
          
          container.appendChild(newCard);
          
          // Trigger animation
          setTimeout(() => {
            newCard.style.opacity = '1';
            newCard.style.transform = 'translateY(0)';
          }, 10);
          
          toggleBtn.textContent = 'Remove Featured Card';
          cardAdded = true;
          
          showMessage("Featured research card added!");
        } else {
          const dynamicCard = document.querySelector('.card.dynamic');
          
          if (dynamicCard) {
            // Remove with animation
            dynamicCard.style.opacity = '0';
            dynamicCard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              container.removeChild(dynamicCard);
            }, 300);
          }
          
          toggleBtn.textContent = 'Add Featured Card';
          cardAdded = false;
          
          showMessage("Featured card removed!");
        }
      });
    }
  }
  
  // Card animator setup
  function setupCardAnimator() {
    const animateBtn = document.getElementById('animateBtn');
    
    if (animateBtn) {
      animateBtn.textContent = 'Animate Cards';
      
      animateBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, index) => {
          // Staggered animation effect
          setTimeout(() => {
            card.classList.add('animated');
            
            // Remove class after animation completes
            setTimeout(() => {
              card.classList.remove('animated');
            }, 1000);
          }, index * 150);
        });
        
        showMessage("Cards animated!");
      });
    }
  }
  
  // Scroll animations setup
  function setupScrollAnimations() {
    // Add CSS for scroll fade in animations
    const style = document.createElement('style');
    style.innerHTML = `
      .fade-in-element {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
      }
      
      .fade-in-element.visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
    
    // Add scroll classes to elements
    const elementsToAnimate = [
      document.querySelector('.intro'),
      document.querySelector('.newsletter'),
      document.querySelector('.interactions'),
      ...document.querySelectorAll('.card')
    ];
    
    elementsToAnimate.forEach(el => {
      if (el) el.classList.add('fade-in-element');
    });
  }
  
  // Intersection Observer for scroll animations
  function setupIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      document.querySelectorAll('.fade-in-element').forEach(el => {
        observer.observe(el);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      document.querySelectorAll('.fade-in-element').forEach(el => {
        el.classList.add('visible');
      });
    }
  }