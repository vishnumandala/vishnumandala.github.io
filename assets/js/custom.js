/**
 * Smoothly scroll to the About section.
 */
function scrollToAbout() {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 20,
        behavior: "smooth",
      });
    }
  }
  
  /**
   * Toggle theme between dark and light.
   */
  function toggleTheme() {
    const themeIcon = document.getElementById("theme-icon");
    const currentTheme = document.documentElement.getAttribute("data-theme");
  
    if (currentTheme === "dark") {
      // Switch to light theme
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    } else {
      // Switch to dark theme
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    }
  }
  
  /**
   * Initialize the theme on page load based on localStorage.
   */
  function initTheme() {
    const themeIcon = document.getElementById("theme-icon");
    const savedTheme = localStorage.getItem("theme");
  
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      // Default to light
      document.documentElement.setAttribute("data-theme", "light");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  }
  
  /**
   * Set up the about section scroll animation
   * (adds or removes 'visible-section' based on scroll position).
   */
  function initAboutSectionScrollAnimation(aboutSection) {
    if (!aboutSection) return;
  
    let lastScrollY = window.scrollY;
  
    function handleScroll() {
      const currentScrollY = window.scrollY;
      const triggerHeight = window.innerHeight * 0.5;
  
      if (currentScrollY > triggerHeight && currentScrollY > lastScrollY) {
        aboutSection.classList.add("visible-section");
      } else if (currentScrollY < lastScrollY && currentScrollY < triggerHeight) {
        aboutSection.classList.remove("visible-section");
      }
  
      lastScrollY = currentScrollY;
    }
  
    window.addEventListener("scroll", handleScroll);
  }
  
  /**
   * Use IntersectionObserver to toggle the visibility of the scroll arrow.
   */
  function initScrollArrowIntersection(aboutSection, scrollArrow) {
    if (!aboutSection || !scrollArrow) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            scrollArrow.classList.add("hidden");
          } else {
            scrollArrow.classList.remove("hidden");
          }
        });
      },
      { threshold: 0.1 }
    );
  
    observer.observe(aboutSection);
  }
  
  /**
   * Match scroll arrow color to the computed color of the text-muted element.
   */
  function setScrollArrowColor(descriptionText, scrollArrow) {
    if (descriptionText && scrollArrow) {
      const computedStyle = window.getComputedStyle(descriptionText);
      scrollArrow.style.color = computedStyle.color;
    }
  }
  
  /**
   * Handle avatar tilt and shadow trail on hover.
   */
  function initAvatarHoverEffects(avatar) {
    if (!avatar) return;
  
    // Create and append shadow trail element
    const shadowTrail = document.createElement("div");
    shadowTrail.classList.add("shadow-trail");
    avatar.parentNode.appendChild(shadowTrail);
  
    // Mouse move effect for tilt and shadow trail
    avatar.addEventListener("mousemove", (e) => {
      const { offsetX, offsetY, target } = e;
      const { offsetWidth, offsetHeight } = target;
      const xRotation = ((offsetY - offsetHeight / 2) / offsetHeight) * 10;
      const yRotation = ((offsetX - offsetWidth / 2) / offsetWidth) * 10;
  
      target.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
      shadowTrail.style.opacity = "1";
      shadowTrail.style.animation = "shadowTrail 0.8s ease-out forwards";
    });
  
    // Reset effect on mouse leave
    avatar.addEventListener("mouseleave", () => {
      avatar.style.transform = "rotateX(0) rotateY(0) scale(1)";
      shadowTrail.style.opacity = "0";
  
      // Restart gradient animation
      avatar.style.animation = "none";
      void avatar.offsetWidth; // reflow
      avatar.style.animation = "gradientGlow 3s infinite alternate";
    });
  }
  
  /**
   * Main entry point for DOMContentLoaded.
   */
  document.addEventListener("DOMContentLoaded", function () {
    // Grab references
    const aboutSection    = document.getElementById("about");
    const scrollArrow     = document.getElementById("scrollArrow");
    const descriptionText = document.querySelector(".text-muted");
    const avatar          = document.querySelector(".avatar-container img");
    const themeToggle     = document.getElementById("theme-toggle"); // Changed to match your HTML
  
    // Theme initialization
    initTheme();
  
    // Attach the toggle event listener to the theme toggle anchor
    if (themeToggle) {
      themeToggle.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        toggleTheme();
      });
    }
  
    // About section scroll animation
    initAboutSectionScrollAnimation(aboutSection);
  
    // Intersection Observer for scroll arrow
    initScrollArrowIntersection(aboutSection, scrollArrow);
  
    // Set scroll arrow color
    setScrollArrowColor(descriptionText, scrollArrow);
  
    // Avatar hover effects
    initAvatarHoverEffects(avatar);
  });
  