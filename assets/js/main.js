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
