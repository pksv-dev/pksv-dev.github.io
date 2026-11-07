(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const toast = document.querySelector(".toast");

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 35);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const closeMenu = () => {
    mobileNav.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const opening = mobileNav.hidden;
    mobileNav.hidden = !opening;
    toggle.setAttribute("aria-expanded", String(opening));
    toggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", opening);
  });

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // Language selector is a presentation prototype. Translation pages
  // can be connected when the full multilingual site is implemented.
  const languageButtons = document.querySelectorAll(".language-button");
  languageButtons.forEach(button => {
    button.addEventListener("click", () => {
      languageButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      showToast(`${button.dataset.lang} selected — translated content will be added in the next prototype stage.`);
    });
  });

  // The featured video is intentionally a placeholder link for this pitch.
  const videoFeature = document.querySelector(".video-feature");
  if (videoFeature) {
    videoFeature.addEventListener("click", event => {
      event.preventDefault();
      showToast("Featured performance video placeholder — connect the artist's recording here.");
    });
  }


  // Contact form is a visual prototype only; no message is sent or stored.
  const contactForm = document.querySelector("[data-contact-stub]");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      showToast("This message form is a preview and is not connected yet. Please use the email or WhatsApp links above.");
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3600);
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !mobileNav.hidden) closeMenu();
  });
})();
