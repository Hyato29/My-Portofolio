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
  strings: ["Mobile Developer", "Web Developer", "Tech Enthusiast"],
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
let navLinks = document.querySelectorAll(".navbar .menu a");

window.addEventListener("scroll", () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
      });
      let target = document.querySelector(".navbar .menu a[href*=" + id + "]");
      if (target) {
        target.classList.add("active");
      }
    }
  });
});

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

const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const musicIcon = musicBtn.querySelector("i");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.classList.add("playing");
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
});

music.volume = 0.3;

const supabaseClient = window.supabase.createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY,
);

const guestbookForm = document.getElementById("guestbookForm");
const messagesGrid = document.getElementById("messagesGrid");
const submitBtn = document.querySelector(".chat-send-btn");

async function fetchMessages() {
  messagesGrid.innerHTML =
    '<p style="color: var(--text-muted); text-align: center; margin-top: auto; margin-bottom: auto;">Memuat pesan...</p>';

  const { data, error } = await supabaseClient
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    messagesGrid.innerHTML =
      '<p style="color: #ff4757; text-align: center; margin-top: auto;">Gagal memuat pesan.</p>';
    return;
  }

  renderMessages(data);
}

function renderMessages(messages) {
  messagesGrid.innerHTML = "";

  if (messages.length === 0) {
    messagesGrid.innerHTML =
      '<p style="color: var(--text-muted); text-align: center; margin-top: auto; margin-bottom: auto;">Belum ada obrolan. Mulai percakapan!</p>';
    return;
  }

  messages.forEach((msg) => {
    const colors = [
      "var(--main-color)",
      "var(--secondary-color)",
      "#ff4757",
      "#2ed573",
      "#ffa502",
      "#70a1ff",
    ];
    const colorIndex = msg.name.length % colors.length;
    const randomColor = colors[colorIndex];

    const msgDate = new Date(msg.created_at);
    const timeString = msgDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const messageCard = document.createElement("div");
    messageCard.classList.add("message-card");

    messageCard.innerHTML = `
      <div class="msg-bubble-header">
        <span class="msg-sender-name" style="color: ${randomColor};">${msg.name}</span>
        <span class="msg-time">${timeString}</span>
      </div>
      <div class="msg-body">${msg.message}</div>
    `;

    messagesGrid.appendChild(messageCard);
  });

  messagesGrid.scrollTop = messagesGrid.scrollHeight;
}

if (guestbookForm) {
  guestbookForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("senderName");
    const messageInput = document.getElementById("senderMessage");

    if (!nameInput.value.trim()) {
      alert("Silakan isi nama Anda di bagian atas terlebih dahulu!");
      nameInput.focus();
      return;
    }

    submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i>';
    submitBtn.disabled = true;

    const { data, error } = await supabaseClient
      .from("guestbook")
      .insert([
        { name: nameInput.value.trim(), message: messageInput.value.trim() },
      ]);

    submitBtn.innerHTML = '<i class="bx bx-send"></i>';
    submitBtn.disabled = false;

    if (error) {
      console.error("Error inserting message:", error);
      alert("Gagal mengirim pesan.");
    } else {
      messageInput.value = "";
      fetchMessages();
    }
  });
}

window.addEventListener("DOMContentLoaded", fetchMessages);
