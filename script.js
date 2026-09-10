/* ==========================================================================
   SAFFRON TABLE - JavaScript Functionality
   File: script.js
   Beginner-Friendly, Well-Commented Vanilla JavaScript.
   No complex libraries needed!
   ========================================================================== */

// We wait for the HTML document to be fully loaded before running any script
document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. MOBILE NAVIGATION MENU TOGGLE
     Opens and closes the mobile dropdown menu when clicking the hamburger icon.
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const toggleIcon = menuToggle.querySelector('i');

  // When hamburger button is clicked:
  menuToggle.addEventListener('click', () => {
    // Toggle the 'open' class on the navigation drawer
    navbar.classList.toggle('open');

    // Switch the icon between hamburger bars and close 'X'
    if (navbar.classList.contains('open')) {
      toggleIcon.classList.remove('fa-bars');
      toggleIcon.classList.add('fa-xmark');
    } else {
      toggleIcon.classList.remove('fa-xmark');
      toggleIcon.classList.add('fa-bars');
    }
  });

  // When any nav link is clicked, close the mobile menu automatically
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        toggleIcon.classList.remove('fa-xmark');
        toggleIcon.classList.add('fa-bars');
      }
    });
  });

  // Close the mobile menu if user clicks anywhere outside the menu and toggle button
  document.addEventListener('click', (event) => {
    if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
      if (navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        toggleIcon.classList.remove('fa-xmark');
        toggleIcon.classList.add('fa-bars');
      }
    }
  });


  /* ------------------------------------------------------------------------
     2. STICKY NAVBAR ON SCROLL
     Adds a subtle shadow and solid background when the user scrolls down.
     ------------------------------------------------------------------------ */
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    // If scrolled more than 50 pixels down, add 'scrolled' class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  /* ------------------------------------------------------------------------
     3. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
     Highlights the current section's link in the navbar as you scroll.
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120; // Offset for header height
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNavLink);


  /* ------------------------------------------------------------------------
     4. MENU CATEGORY FILTER TABS
     Allows filtering dishes by category (All, Starters, Mains, Desserts, Drinks).
     ------------------------------------------------------------------------ */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove 'active' class from all buttons and add to the clicked one
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Get the selected category (e.g. 'starters', 'mains', 'all')
      const selectedCategory = button.getAttribute('data-category');

      // 3. Show or hide food items based on category
      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (selectedCategory === 'all' || selectedCategory === cardCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ------------------------------------------------------------------------
     5. RESERVATION FORM HANDLING
     Validates the input, prevents page refresh, and shows a friendly confirmation.
     ------------------------------------------------------------------------ */
  const reservationForm = document.getElementById('reservation-form');
  const reservationAlert = document.getElementById('reservation-alert');
  const alertMessage = document.getElementById('alert-message');
  const dateInput = document.getElementById('res-date');

  // Set minimum date to today so users cannot select past dates
  const today = new Date().toISOString().split('T')[0];
  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today; // Set default date to today
  }

  if (reservationForm) {
    reservationForm.addEventListener('submit', (event) => {
      // Prevent browser from reloading the page
      event.preventDefault();

      // Collect user input values
      const name = document.getElementById('res-name').value.trim();
      const guests = document.getElementById('res-guests').value;
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;

      // Format date for display (e.g. "September 15, 2026")
      const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      // Update message text
      alertMessage.innerHTML = `
        We've saved your spot by the hearth, <strong>${name}</strong>! Table for <strong>${guests}</strong> on <strong>${formattedDate}</strong> at <strong>${time}</strong>. We've sent arrival directions to your email.
      `;

      // Show the success banner
      reservationAlert.classList.remove('hidden');

      // Scroll smoothly to the confirmation alert
      reservationAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset form fields
      reservationForm.reset();
      dateInput.value = today; // restore today's date
    });
  }

});
