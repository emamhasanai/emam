const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    document.body.classList.toggle("nav-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    }
  });
}

const revealItems = document.querySelectorAll(
  ".timeline-item, .project-card, .skill-groups article, .publication-card, .conference-panel article, .award-grid article, .education, .contact-card"
);

if ("IntersectionObserver" in window && revealItems.length) {
  document.body.classList.add("reveal-ready");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item, index) => {
    item.classList.add("reveal-item");
    revealObserver.observe(item);
  });

  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);

    if (target) {
      target.classList.add("is-visible");
      target
        .querySelectorAll(".reveal-item")
        .forEach((item) => item.classList.add("is-visible"));
    }
  }
}

const scrollToHashTarget = () => {
  if (!window.location.hash) {
    return;
  }

  const target = document.querySelector(window.location.hash);

  if (!target) {
    return;
  }

  const headerOffset = 96;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(targetTop, 0), behavior: "auto" });
};

window.addEventListener("load", () => {
  requestAnimationFrame(scrollToHashTarget);
});

window.addEventListener("hashchange", scrollToHashTarget);
