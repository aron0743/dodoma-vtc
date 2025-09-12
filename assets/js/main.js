/**
* Template Name: NiceSchool
* Template URL: https://bootstrapmade.com/nice-school-bootstrap-education-template/
* Updated: May 10 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
            // Show loading animation when navigating
        function navigateToPage(url) {
            document.getElementById('loadingOverlay').classList.remove('hidden');
            
            // Wait a brief moment before navigation to ensure animation is visible
            setTimeout(() => {
                window.location.href = url;
            }, 300);
        }

        // Hide loading animation when page is fully loaded
        window.addEventListener('load', () => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
  
   

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  // Auto-scrolling for lists with class "scrollable-list"
  document.addEventListener("DOMContentLoaded", () => {
    const speed = 60;    // ms between scroll steps
    const step  = 0.70;     // px per step

    document.querySelectorAll(".scrollable-list").forEach(container => {
      let intervalId;

      function startAutoScroll() {
        intervalId = setInterval(() => {
          // scroll down by "step" pixels
          container.scrollTop += step;

          // if we've hit the bottom, jump back to top
          if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
            container.scrollTop = 0;
          }
        }, speed);
      }

      function stopAutoScroll() {
        clearInterval(intervalId);
      }

      // kick it off
      startAutoScroll();

      // pause on hover, resume on leave
      container.addEventListener("mouseenter", stopAutoScroll);
      container.addEventListener("mouseleave", startAutoScroll);
    });
  });


  //TRANSLATIONS
// main.js
async function loadTranslations(lang) {
  try {
    const pageName = window.location.pathname.split('/').pop().split('.')[0] || 'index';
    const resp = await fetch(`assets/translations/${pageName}.json`);
    if (!resp.ok) throw new Error(`Translation file not found: translations/${pageName}.json (status ${resp.status})`);
    const all = await resp.json();

    // all should be { "en": {...}, "sw": {...} }
    const translations = all[lang] || {};
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      if (key && translations[key] !== undefined) {
        el.textContent = translations[key];
      }
    });

    // Save preference
    localStorage.setItem('preferredLanguage', lang);

  } catch (err) {
    console.error('Error loading translations:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('languageToggle');
  const saved = localStorage.getItem('preferredLanguage') || 'en';

  // set toggle UI: checked => sw (you can invert if you like)
  if (toggle) toggle.checked = (saved === 'sw');

  // initial load
  loadTranslations(saved);

  // when toggle changed
  if (toggle) {
    toggle.addEventListener('change', () => {
      const lang = toggle.checked ? 'sw' : 'en';
      loadTranslations(lang);
    });
  }

  // optional: keep nav active style when clicking
  document.querySelectorAll('ul li a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('ul li a').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
    });
  });
});


//END OF TRANSLATIONS
  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

})();