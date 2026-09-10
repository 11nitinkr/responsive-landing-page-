/* =========================================================
   NOVA ONE — Vanilla JavaScript
   Mobile navigation, scroll reveal, active navigation,
   and dynamic copyright year.
   ========================================================= */

(() => {
  "use strict";

  // =========================
  // Select DOM elements
  // =========================
  const body = document.body;
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
  const revealItems = document.querySelectorAll(".reveal");
  const yearElement = document.querySelector("#current-year");

  // =========================
  // Dynamic copyright year
  // =========================
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =========================
  // Mobile navigation
  // =========================

  function closeMenu() {
    if (!navToggle || !navMenu) return;

    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");

    body.classList.remove("menu-open");
    navToggle.classList.remove("is-open");
  }

  function toggleMenu() {
    if (!navToggle || !navMenu) return;

    const isOpen = navMenu.classList.toggle("open");

    navToggle.setAttribute("aria-expanded", String(isOpen));

    navToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

    body.classList.toggle("menu-open", isOpen);
    navToggle.classList.toggle("is-open", isOpen);
  }

  // Hamburger button
  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  // Close menu when a navigation link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when Escape key is pressed
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close menu when clicking outside navbar
  document.addEventListener("click", (event) => {
    if (!navMenu || !navToggle) return;

    if (!navMenu.classList.contains("open")) return;

    const clickedInsideNav =
      navMenu.contains(event.target) ||
      navToggle.contains(event.target);

    if (!clickedInsideNav) {
      closeMenu();
    }
  });

  // Close mobile menu after resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });

  // =========================
  // Scroll reveal animations
  // =========================

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            // Once visible, stop observing it
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    // If animations are disabled/not supported,
    // immediately show everything.
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  // =========================
  // Active navigation link
  // =========================

  const sections = navLinks
    .map((link) => {
      const target = link.getAttribute("href");

      if (!target) return null;

      return document.querySelector(target);
    })
    .filter(Boolean);

  if (
    "IntersectionObserver" in window &&
    sections.length > 0
  ) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const activeId = `#${entry.target.id}`;

          navLinks.forEach((link) => {
            const linkTarget = link.getAttribute("href");

            link.classList.toggle(
              "active",
              linkTarget === activeId
            );
          });
        });
      },
      {
        rootMargin: "-34% 0px -56% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // =========================
  // Pre-order email link
  // =========================

  const mailLink = document.querySelector(
    'a[href^="mailto:hello@nova-one.example"]'
  );

  if (mailLink) {
    mailLink.addEventListener("click", (event) => {
      event.currentTarget.setAttribute(
        "aria-label",
        "Pre-order NOVA ONE by email"
      );
    });
  }

})();
