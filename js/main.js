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
  initTypewriter();

  // Mark page as loaded
  document.body.classList.add("page-loaded");
});

// ========================================
// TYPEWRITER EFFECT
// ========================================
function initTypewriter() {
  const elements = document.querySelectorAll(".typewriter");
  elements.forEach((el) => {
    const text = el.dataset.text || el.textContent;
    el.textContent = "";
    let i = 0;
    const speed = 50;

    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    // Delay start based on scroll reveal or just a fixed delay
    setTimeout(type, 800);
  });
}

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
  document.documentElement.dataset.theme = theme;
  // All color switching is handled via CSS custom properties
  // Force canvas resize/reinit to pick up theme colors
  globalThis.dispatchEvent(new Event("resize"));
}

// ========================================
// LANGUAGE SYSTEM
// ========================================
// Auto-detect browser language (fallback to TR for Turkish speakers, EN for everyone else)
let currentLang = localStorage.getItem("noktacode-lang") || (navigator.language.startsWith("tr") ? "tr" : "en");

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

  updateContentTranslations(t);
  updateSeoMetaTags(t);
  updateOgLocale(lang);
}

function updateContentTranslations(t) {
  // Text content translations
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (t[el.dataset.i18n]) {
      el.textContent = t[el.dataset.i18n];
    }
  });

  // HTML content translations (for spans inside text)
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    if (t[el.dataset.i18nHtml]) {
      el.innerHTML = t[el.dataset.i18nHtml];
    }
  });

  // Placeholder translations
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    if (t[el.dataset.i18nPlaceholder]) {
      el.placeholder = t[el.dataset.i18nPlaceholder];
    }
  });
}

function updateSeoMetaTags(t) {
  if (t.seoTitle) {
    document.getElementById("pageTitle").textContent = t.seoTitle;
    const metaTitle = document.getElementById("metaTitle");
    if (metaTitle) metaTitle.content = t.seoTitle;
  }
  if (t.seoDescription) {
    const metaDescription = document.getElementById("metaDescription");
    if (metaDescription) metaDescription.content = t.seoDescription;
  }
  if (t.seoKeywords) {
    const metaKeywords = document.getElementById("metaKeywords");
    if (metaKeywords) metaKeywords.content = t.seoKeywords;
  }
  if (t.seoOgTitle) {
    const fields = ["ogTitle", "twitterTitle"];
    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.content = t.seoOgTitle;
    });
  }
  if (t.seoOgDescription) {
    const fields = ["ogDescription", "twitterDescription"];
    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.content = t.seoOgDescription;
    });
  }
}

function updateOgLocale(lang) {
  const ogLocale = document.getElementById("ogLocale");
  if (ogLocale) {
    ogLocale.content = lang === "tr" ? "tr_TR" : "en_US";
  }
}

// ========================================
// NAVBAR
// ========================================
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  globalThis.addEventListener("scroll", () => {
    if (globalThis.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Active section highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  globalThis.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (globalThis.scrollY >= sectionTop) {
        current = section.id;
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
    { threshold: 0.5 },
  );

  // Observe the about section
  const aboutSection = document.getElementById("about");
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}

function animateCounter(el) {
  const target = Number.parseInt(el.dataset.count, 10);
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
    nextInput.value = globalThis.location.href;
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
// AI-INSPIRED NEURAL NETWORK ANIMATION
// ========================================

// Simplified hexToRgba helper
function hexToRgba(hex, alpha) {
  let r = 99;
  let g = 102;
  let b = 241;
  if (hex.startsWith("#")) {
    const bigint = Number.parseInt(hex.slice(1), 16);
    r = (bigint >> 16) & 255;
    g = (bigint >> 8) & 255;
    b = bigint & 255;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function initParticles() {
  const canvas = document.getElementById("neuralCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particles = [];
  const mouse = { x: null, y: null, radius: 150 };

  // Adjust canvas size to window
  function resizeCanvas() {
    canvas.width = globalThis.innerWidth;
    canvas.height = globalThis.innerHeight;
    initParticlesArray();
  }

  // Particle Class
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.speedY = Math.random() * 0.8 - 0.4;
      this.color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Bounce off edges
      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

      // Interactivity
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= dx * force * 0.02;
          this.y -= dy * force * 0.02;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticlesArray() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < Math.min(count, 120); i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();

    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.hypot(dx, dy);

        if (distance < 150) {
          const opacity = 1 - distance / 150;
          ctx.strokeStyle = accentColor.startsWith("#")
            ? hexToRgba(accentColor, opacity * 0.2)
            : `rgba(99, 102, 241, ${opacity * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  // Event Listeners
  globalThis.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  globalThis.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  globalThis.addEventListener("resize", resizeCanvas);

  resizeCanvas();
  animate();
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgress");
  if (!progressBar) return;

  globalThis.addEventListener("scroll", () => {
    const scrollTop = globalThis.scrollY;
    const docHeight = document.documentElement.scrollHeight - globalThis.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    progressBar.style.width = scrollPercent + "%";
  });
}
