document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // HEADER SCROLL EVENT
  // ==========================================================================
  const header = document.getElementById('main-header');
  const urgencyBar = document.getElementById('urgency-bar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
      header.style.top = '0';
      if (urgencyBar) urgencyBar.style.transform = 'translateY(-100%)';
    } else {
      header.classList.remove('scrolled');
      header.style.top = '38px';
      if (urgencyBar) urgencyBar.style.transform = 'translateY(0)';
    }
  });

  // ==========================================================================
  // MOBILE MENU TOGGLE
  // ==========================================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  const allNavClosers = document.querySelectorAll('.nav-link, .nav-cta');
  
  const closeMenu = () => {
    menuToggle.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  allNavClosers.forEach(el => {
    el.addEventListener('click', closeMenu);
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // ==========================================================================
  // INTERACTIVE TOGGLE: OCCUPATION VS PROGRESS
  // ==========================================================================
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const panes = document.querySelectorAll('.toggle-content-pane');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPaneId = btn.getAttribute('data-target');
      
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panes.forEach(pane => {
        if (pane.id === targetPaneId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // ==========================================================================
  // INTERACTIVE TABS: GOLDEN HOUR
  // ==========================================================================
  const ghTabs = document.querySelectorAll('.gh-tab-card');
  const ghPanes = document.querySelectorAll('.gh-pane');

  ghTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPaneId = tab.getAttribute('data-target');

      ghTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      ghPanes.forEach(pane => {
        if (pane.id === targetPaneId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  // ==========================================================================
  // 3D EBOOK COVER PARALLAX HOVER EFFECT (DESKTOP ONLY)
  // ==========================================================================
  const ebook = document.querySelector('.ebook-3d');
  const wrapper = document.querySelector('.hero-mockup-wrapper');

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (ebook && wrapper && !isTouchDevice) {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Calculate rotation angles (scaled down for subtle effect)
      const rotateY = (x / rect.width) * 45; // up to 45 deg range
      const rotateX = -(y / rect.height) * 45; // up to 45 deg range
      
      ebook.style.transform = `rotateY(${rotateY - 22}deg) rotateX(${rotateX + 10}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      // Return to original aesthetic perspective angle
      ebook.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      ebook.style.transform = `rotateY(-22deg) rotateX(10deg)`;
      setTimeout(() => {
        ebook.style.transition = '';
      }, 500);
    });
  }

  // ==========================================================================
  // FAQ ACCORDIONS
  // ==========================================================================
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const faqItem = q.parentElement;
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // ==========================================================================
  // FADE-IN SCROLL ANIMATION
  // ==========================================================================
  const animatedElements = document.querySelectorAll('.fade-in-section');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }
});
