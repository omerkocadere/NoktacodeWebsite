// ===== Noktacode Main JavaScript =====

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Initialize all modules
  initThemeSystem();
  initLanguageSystem();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initCounterAnimation();
  initContactForm();
  initParticles();
  initScrollProgress();

  // Mark page as loaded
  document.body.classList.add("page-loaded");
});

// ========================================
// THEME SYSTEM (Dark/Light)
// ========================================
let currentTheme = localStorage.getItem("noktacode-theme") || "dark";

function initThemeSystem() {
  applyTheme(currentTheme);

  // Desktop toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Mobile toggle
  const themeToggleMobile = document.getElementById("themeToggleMobile");
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("noktacode-theme", currentTheme);
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  // All color switching is handled via CSS custom properties — no class toggling needed.
}

// ========================================
// LANGUAGE SYSTEM
// ========================================
let currentLang = localStorage.getItem("noktacode-lang") || "tr";

function initLanguageSystem() {
  applyTranslations(currentLang);

  // Desktop toggle
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", toggleLanguage);
  }

  // Mobile toggle
  const langToggleMobile = document.getElementById("langToggleMobile");
  if (langToggleMobile) {
    langToggleMobile.addEventListener("click", toggleLanguage);
  }
}

function toggleLanguage() {
  currentLang = currentLang === "tr" ? "en" : "tr";
  localStorage.setItem("noktacode-lang", currentLang);
  applyTranslations(currentLang);
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  // Update HTML lang attribute
  document.documentElement.lang = lang === "tr" ? "tr" : "en";

  // Text content translations
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  // HTML content translations (for spans inside text)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Placeholder translations
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (t[key]) {
      el.placeholder = t[key];
    }
  });
}

// ========================================
// NAVBAR
// ========================================
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active section highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });

  // Close menu when clicking a link
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      mobileMenu.classList.remove("open");
    });
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      menuToggle.classList.remove("open");
      mobileMenu.classList.remove("open");
    }
  });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Don't unobserve to allow re-animation if needed,
        // but for performance we unobserve after first trigger
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all reveal elements
  document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children").forEach((el) => {
    observer.observe(el);
  });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach((counter) => {
            animateCounter(counter);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  // Observe the about section
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-count"), 10);
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out cubic
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(target * easeOut);

    el.textContent = currentVal + "+";

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + "+";
    }
  }

  requestAnimationFrame(update);
}

// ========================================
// CONTACT FORM
// ========================================
function initContactForm() {
  const form = document.getElementById("contactForm");
  const successMsg = document.getElementById("formSuccess");

  if (!form) return;

  // Set the _next redirect to the current page
  const nextInput = document.getElementById("formNext");
  if (nextInput) {
    nextInput.value = window.location.href;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector("span").textContent;

    // Show loading
    submitBtn.disabled = true;
    submitBtn.querySelector("span").textContent = translations[currentLang].contactSending;

    // Submit via fetch to FormSubmit.co
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          successMsg.classList.remove("hidden");
          successMsg.textContent = translations[currentLang].contactSuccess;
        } else {
          successMsg.classList.remove("hidden");
          successMsg.textContent = translations[currentLang].contactError || "Bir hata oluştu. Lütfen tekrar deneyin.";
          successMsg.style.borderColor = "rgba(239,68,68,0.2)";
          successMsg.style.background = "rgba(239,68,68,0.1)";
          successMsg.style.color = "#f87171";
        }
      })
      .catch(() => {
        successMsg.classList.remove("hidden");
        successMsg.textContent = translations[currentLang].contactError || "Bir hata oluştu. Lütfen tekrar deneyin.";
        successMsg.style.borderColor = "rgba(239,68,68,0.2)";
        successMsg.style.background = "rgba(239,68,68,0.1)";
        successMsg.style.color = "#f87171";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.querySelector("span").textContent = originalText;
        setTimeout(() => {
          successMsg.classList.add("hidden");
          // Reset success styles
          successMsg.style.borderColor = "";
          successMsg.style.background = "";
          successMsg.style.color = "";
        }, 5000);
      });
  });
}

// ========================================
// FLOATING PARTICLES
// ========================================
function initParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 3 + 1;
    const left = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 15;
    const hue = Math.random() > 0.5 ? "139, 92, 246" : "99, 102, 241";

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: rgba(${hue}, 0.6);
      box-shadow: 0 0 ${size * 3}px rgba(${hue}, 0.3);
      animation-delay: ${delay}s;
      animation-duration: ${duration}s;
    `;

    container.appendChild(particle);
  }
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    progressBar.style.width = scrollPercent + "%";
  });
}
