const spotlightCards = document.querySelectorAll(".spotlight-card");

spotlightCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
});

const typed = new Typed(".multiple-text", {
  strings: ["Flutter Developer", "Web Developer", "Tech Enthusiast"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

ScrollReveal({
  reset: true,
  distance: "60px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".hero-text, .heading", { origin: "top" });
ScrollReveal().reveal(".lanyard-wrapper, .bento-grid, .contact-wrapper", {
  origin: "bottom",
});
ScrollReveal().reveal(".hero-text h1", { origin: "left" });

ScrollReveal({
  reset: true,
  distance: "100px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".hero-text, .heading", { origin: "top" });
ScrollReveal().reveal(".lanyard-wrapper, .bento-grid, .contact-wrapper", {
  origin: "bottom",
});
ScrollReveal().reveal(".hero-text h1", { origin: "left" });

ScrollReveal().reveal(".proj-visual, .proj-number", {
  origin: "left",
  distance: "120px",
  interval: 200,
});

ScrollReveal().reveal(".proj-content", {
  origin: "right",
  distance: "120px",
});

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        let target = document.querySelector(".navbar a[href*=" + id + "]");
        if (target) target.classList.add("active");
      });
    }
  });
};

const journeySection = document.querySelector("#journey");
const beamLight = document.querySelector(".beam-light");
const neonDots = document.querySelectorAll(".neon-dot");

function updateJourney() {
  if (!journeySection || !beamLight) return;

  const sectionTop = journeySection.getBoundingClientRect().top;
  const sectionHeight = journeySection.offsetHeight;
  const windowHeight = window.innerHeight;

  let percent = ((windowHeight / 1.5 - sectionTop) / sectionHeight) * 100;
  percent = Math.max(0, Math.min(100, percent));

  beamLight.style.height = `${percent}%`;

  neonDots.forEach((dot) => {
    const dotTop =
      dot.getBoundingClientRect().top -
      journeySection.getBoundingClientRect().top;
    const dotPercent = (dotTop / sectionHeight) * 100;

    const row = dot.closest(".terminal-row");
    const content = row.querySelector(".col-content");
    const desc = row.querySelector(".col-desc");

    if (percent >= dotPercent) {
      dot.classList.add("active");
      if (content) content.classList.add("show");
      if (desc) desc.classList.add("show");
    } else {
      dot.classList.remove("active");
      if (content) content.classList.remove("show");
      if (desc) desc.classList.remove("show");
    }
  });
}

window.addEventListener("scroll", updateJourney);
window.addEventListener("load", updateJourney);
