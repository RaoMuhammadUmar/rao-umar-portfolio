/* =====================================================
   RAO UMAR — PORTFOLIO
   main.js
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initProgressBar();
  initCursorGlow();
  initNavbar();
  initNavToggle();
  initSmoothScroll();
  initActiveNavigation();
  initTicker();
  initClock();
  initTypedName();
  initHeroGrid();
  initScrollReveal();
  initCounters();
  initSkillBars();
  initTilt();
});

/* =====================================================
   SCROLL PROGRESS BAR
===================================================== */
function initProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  };

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* =====================================================
   CURSOR GLOW (desktop only, lerp-smoothed)
===================================================== */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  if (window.matchMedia("(hover: none)").matches) {
    glow.style.display = "none";
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    glow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });

  function loop() {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    glow.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

/* =====================================================
   STICKY / SCROLLED NAVBAR
===================================================== */
function initNavbar() {
  const header = document.getElementById("header");
  if (!header) return;

  const update = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* =====================================================
   MOBILE NAV TOGGLE
===================================================== */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("active", isOpen);
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("active");
    });
  });
}

/* =====================================================
   SMOOTH SCROLL FOR NAV LINKS
===================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 90;
      const top =
        target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

/* =====================================================
   ACTIVE NAV LINK ON SCROLL
===================================================== */
function initActiveNavigation() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[data-nav]");
  if (!sections.length || !navLinks.length) return;

  const update = () => {
    let current = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 160;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + current
      );
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* =====================================================
   TICKER — seamless infinite loop
===================================================== */
function initTicker() {
  const track = document.getElementById("tickerTrack");
  if (!track) return;

  // Duplicate the items once so the -50% keyframe loops seamlessly
  track.innerHTML += track.innerHTML;
}

/* =====================================================
   LIVE TERMINAL CLOCK
===================================================== */
function initClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;

  const update = () => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    clock.textContent = `${hh}:${mm}:${ss}`;
  };

  update();
  setInterval(update, 1000);
}

/* =====================================================
   HERO — TYPED NAME EFFECT
===================================================== */
function initTypedName() {
  const el = document.getElementById("heroTypedName");
  if (!el) return;

  const fullText = el.textContent.trim();
  el.textContent = "";

  const cursor = document.createElement("span");
  cursor.className = "typed-cursor";
  cursor.textContent = "_";

  let i = 0;
  function type() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      el.appendChild(cursor);
      i++;
      setTimeout(type, 70);
    } else {
      setTimeout(() => cursor.remove(), 900);
    }
  }
  setTimeout(type, 400);
}

/* =====================================================
   HERO — ANIMATED GRID CANVAS
===================================================== */
function initHeroGrid() {
  const canvas = document.getElementById("heroGrid");
  if (!canvas) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  const hero = canvas.closest(".hero");
  let width, height, dpr;
  let mouseX = 0.5, mouseY = 0.5;

  const spacing = 46;
  let points = [];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = hero.offsetWidth;
    height = hero.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    points = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        points.push({ x: c * spacing, y: r * spacing });
      }
    }
  }

  window.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    mouseX = (e.clientX - rect.left) / width;
    mouseY = (e.clientY - rect.top) / height;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const accentR = 53, accentG = 224, accentB = 122;
    const cx = mouseX * width;
    const cy = mouseY * height;
    const radius = Math.max(width, height) * 0.32;

    // grid lines
    ctx.strokeStyle = "rgba(255,255,255,0.035)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // glowing points near cursor
    points.forEach((p) => {
      const dx = p.x - cx;
      const dy = p.y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        const strength = 1 - dist / radius;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1 + strength * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentR},${accentG},${accentB},${strength * 0.7})`;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(draw);
}

/* =====================================================
   SCROLL REVEAL
===================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}

/* =====================================================
   HERO STAT COUNTERS
===================================================== */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* =====================================================
   SKILL BARS — fill on view
===================================================== */
function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
}

/* =====================================================
   3D TILT ON PROJECT CARDS
===================================================== */
function initTilt() {
  const cards = document.querySelectorAll("[data-tilt]");
  if (!cards.length) return;
  if (window.matchMedia("(hover: none)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const maxTilt = 6;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}
