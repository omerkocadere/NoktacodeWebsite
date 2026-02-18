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
  initMagneticElements();

  // Mark page as loaded
  document.body.classList.add("page-loaded");
});

// ========================================
// MAGNETIC ELEMENTS (AI INTERACTIVITY)
// ========================================
function initMagneticElements() {
  const elements = document.querySelectorAll(".btn-glow, .social-icon, .logo-container");

  elements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = (clientX - (left + width / 2)) * 0.3;
      const y = (clientY - (top + height / 2)) * 0.3;

      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = `translate(0px, 0px)`;
    });
  });
}

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
  if (!canvas || !globalThis.THREE) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, globalThis.innerWidth / globalThis.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });

  renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio, 2));

  // Particles config
  const particlesCount = 150;
  const positions = new Float32Array(particlesCount * 3);
  const velocities = [];
  const particleGeometry = new THREE.BufferGeometry();

  // Helper for accent color
  function getAccentColor() {
    const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    return new THREE.Color(hex || "#6366f1");
  }

  // Initializing particles
  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

    velocities.push({
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.01,
    });
  }

  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  // Circular texture for points
  const circleCanvas = document.createElement("canvas");
  circleCanvas.width = 64;
  circleCanvas.height = 64;
  const circleCtx = circleCanvas.getContext("2d");
  circleCtx.beginPath();
  circleCtx.arc(32, 32, 30, 0, Math.PI * 2);
  circleCtx.fillStyle = "#ffffff";
  circleCtx.fill();
  const particleTexture = new THREE.CanvasTexture(circleCanvas);

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    color: getAccentColor(),
    transparent: true,
    opacity: 0.8,
    map: particleTexture,
    alphaTest: 0.05,
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Lines for connections
  const lineMaterial = new THREE.LineBasicMaterial({
    color: getAccentColor(),
    transparent: true,
    opacity: 0.4, // Increased from 0.15
  });

  const lineGeometry = new THREE.BufferGeometry();
  let lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  camera.position.z = 5;

  // Mouse interactivity
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  globalThis.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - globalThis.innerWidth / 2) / 100;
    mouseY = (e.clientY - globalThis.innerHeight / 2) / 100;
  });

  // Handle Resizing & Theme Change
  function onResize() {
    camera.aspect = globalThis.innerWidth / globalThis.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(globalThis.innerWidth, globalThis.innerHeight);

    // Update material colors for theme change
    const newColor = getAccentColor();
    particleMaterial.color = newColor;
    lineMaterial.color = newColor;
  }

  globalThis.addEventListener("resize", onResize);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    scene.rotation.y = targetX * 0.5;
    scene.rotation.x = targetY * 0.5;

    // Movement animation
    const posAttr = particleGeometry.attributes.position;
    const linePositions = [];

    for (let i = 0; i < particlesCount; i++) {
      posAttr.array[i * 3] += velocities[i].x;
      posAttr.array[i * 3 + 1] += velocities[i].y;
      posAttr.array[i * 3 + 2] += velocities[i].z;

      // Wrap around bounds
      if (Math.abs(posAttr.array[i * 3]) > 5) velocities[i].x *= -1;
      if (Math.abs(posAttr.array[i * 3 + 1]) > 5) velocities[i].y *= -1;
      if (Math.abs(posAttr.array[i * 3 + 2]) > 5) velocities[i].z *= -1;
    }
    posAttr.needsUpdate = true;

    // Build connections
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const dx = posAttr.array[i * 3] - posAttr.array[j * 3];
        const dy = posAttr.array[i * 3 + 1] - posAttr.array[j * 3 + 1];
        const dz = posAttr.array[i * 3 + 2] - posAttr.array[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 2.5) {
          linePositions.push(
            posAttr.array[i * 3],
            posAttr.array[i * 3 + 1],
            posAttr.array[i * 3 + 2],
            posAttr.array[j * 3],
            posAttr.array[j * 3 + 1],
            posAttr.array[j * 3 + 2],
          );
        }
      }
    }

    lineGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));

    renderer.render(scene, camera);
  }

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
