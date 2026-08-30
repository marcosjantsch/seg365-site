const videoCards = Array.from(document.querySelectorAll("[data-video-card]"));
const featureVideo = document.querySelector("[data-feature-video]");
const featureSource = featureVideo?.querySelector("source");
const featureKicker = document.querySelector("[data-feature-kicker]");
const featureTitle = document.querySelector("[data-feature-title]");
const featureSummary = document.querySelector("[data-feature-summary]");
const featureDuration = document.querySelector("[data-feature-duration]");

function setFeaturedVideo(card, playVideo = false) {
  if (!card || !featureVideo || !featureSource) {
    return;
  }

  videoCards.forEach((button) => {
    const isActive = button === card;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  featureSource.src = card.dataset.videoSrc;
  if (featureKicker) featureKicker.textContent = card.dataset.videoKicker;
  if (featureTitle) featureTitle.textContent = card.dataset.videoTitle;
  if (featureSummary) featureSummary.textContent = card.dataset.videoSummary;
  if (featureDuration) featureDuration.textContent = card.dataset.videoDuration;

  featureVideo.load();

  if (playVideo) {
    featureVideo.play().catch(() => {
      featureVideo.controls = true;
    });
  }
}

videoCards.forEach((card) => {
  card.addEventListener("click", () => {
    setFeaturedVideo(card, true);
    document.getElementById("apresentacao")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

const workflowTabs = Array.from(document.querySelectorAll("[data-workflow-target]"));
const workflowViews = Array.from(document.querySelectorAll("[data-workflow-view]"));

function activateWorkflow(targetId) {
  workflowTabs.forEach((tab) => {
    const isActive = tab.dataset.workflowTarget === targetId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  workflowViews.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.workflowView === targetId);
  });
}

workflowTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateWorkflow(tab.dataset.workflowTarget);
  });
});

const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${sectionId}`);
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        setActiveNav(visible.target.id);
      }
    },
    {
      rootMargin: "-32% 0px -52% 0px",
      threshold: [0.15, 0.35, 0.55],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollProgress = document.querySelector("[data-scroll-progress]");

function updateScrollProgress() {
  if (!scrollProgress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

if (!prefersReducedMotion) {
  document.documentElement.classList.add("motion-ready");

  const revealTargets = Array.from(
    document.querySelectorAll(
      ".section-heading, .channel-card, .ecosystem-orbit > *, .journey-card, .integration-benefits article, .module-cta, .dds-flow article, .video-showcase, .video-card, .operation-main, .operation-proof article, .plan, .contact > *"
    )
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-item");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 70}ms`);
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    revealTargets.forEach((element) => revealObserver.observe(element));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-revealed"));
  }

  const tiltTargets = Array.from(
    document.querySelectorAll(".channel-card, .ecosystem-orbit article, .dds-flow article, .plan")
  );

  tiltTargets.forEach((card) => {
    card.classList.add("motion-card");
    card.addEventListener("pointermove", (event) => {
      if (window.innerWidth < 900 || event.pointerType === "touch") return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 3).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 4).toFixed(2)}deg`);
      card.style.setProperty("--glow-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--glow-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });

  const heroVisual = document.querySelector(".hero-visual");
  window.addEventListener(
    "scroll",
    () => {
      if (!heroVisual || window.innerWidth < 760) return;
      const offset = Math.min(window.scrollY * 0.045, 28);
      heroVisual.style.setProperty("--hero-shift", `${offset}px`);
    },
    { passive: true }
  );
}
