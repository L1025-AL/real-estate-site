(() => {
  function setupMobileNav(config) {
    const btn = document.querySelector(config.buttonSelector);
    const nav = document.querySelector(config.navSelector);
    if (!btn || !nav) return;

    const closeScope = config.closeScopeSelector;

    const closeMenu = () => {
      btn.setAttribute("aria-expanded", "false");
      nav.removeAttribute("data-open");
    };

    const toggleMenu = () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      if (expanded) {
        nav.removeAttribute("data-open");
        return;
      }
      nav.setAttribute("data-open", "");
    };

    btn.addEventListener("click", toggleMenu);

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest(closeScope)) return;
      closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  setupMobileNav({
    buttonSelector: ".hero-header-container .mobile-menu-btn",
    navSelector: ".hero-nav",
    closeScopeSelector: ".hero-header-container",
  });

  setupMobileNav({
    buttonSelector: ".page-mobile-menu-btn",
    navSelector: ".page-nav",
    closeScopeSelector: ".page-header-inner",
  });

  const yearEl =
    document.getElementById("footer-year") || document.getElementById("y");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const faqRoot = document.querySelector(".faq-accordion");
  if (faqRoot) {
    faqRoot.querySelectorAll("details").forEach((details) => {
      details.addEventListener("toggle", () => {
        if (!details.open) return;
        faqRoot.querySelectorAll("details").forEach((other) => {
          if (other !== details) other.removeAttribute("open");
        });
      });
    });
  }
})();
