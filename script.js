document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("intro-screen");
  const openInvitationBtn = document.getElementById("open-invitation-btn");
  const mainContent = document.getElementById("main-content");

  const bgAudio = document.getElementById("bg-audio");
  const musicPlayPauseBtn = document.getElementById("music-play-pause-btn");
  const volumeSlider = document.getElementById("volume-slider");
  const musicStatusText = document.getElementById("music-status-text");
  const musicVisualizer = document.querySelector(".music-visualizer");
  const musicFallbackMsg = document.getElementById("music-fallback-msg");

  const floatingMusicBtn = document.getElementById("floating-music-btn");

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMinutes = document.getElementById("cd-minutes");
  const cdSeconds = document.getElementById("cd-seconds");
  const countdownGrid = document.getElementById("countdown-grid");
  const countdownStarted = document.getElementById("countdown-started");

  const mapBtn = document.getElementById("map-btn");
  const calendarBtn = document.getElementById("calendar-btn");
  const modalOpenBtn = document.getElementById("modal-open-btn");
  const greetingModal = document.getElementById("greeting-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalCloseX = document.getElementById("modal-close-x");
  const restartBtn = document.getElementById("restart-btn");

  const teacherImg = document.getElementById("teacher-img");
  const photoPlaceholder = document.getElementById("photo-placeholder");

  if (openInvitationBtn && introScreen) {
    openInvitationBtn.addEventListener("click", () => {
      introScreen.classList.add("fade-out");
      if (mainContent) {
        mainContent.classList.add("visible");
      }

      playAudio();

      setTimeout(handleScrollReveal, 300);
    });
  }
  let isPlaying = false;

  function playAudio() {
    if (!bgAudio) return;

    bgAudio
      .play()
      .then(() => {
        isPlaying = true;
        updateMusicUI(true);
      })
      .catch(() => {
        isPlaying = false;
        updateMusicUI(false);
        if (musicFallbackMsg) {
          musicFallbackMsg.style.display = "block";
        }
      });
  }

  function pauseAudio() {
    if (!bgAudio) return;
    bgAudio.pause();
    isPlaying = false;
    updateMusicUI(false);
  }

  function toggleAudio() {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  function updateMusicUI(active) {
    if (musicStatusText) {
      musicStatusText.textContent = active ? "ТЫҢДАЛУУДА" : "ТОКТОТУЛДУ";
    }
    if (musicPlayPauseBtn) {
      musicPlayPauseBtn.textContent = active ? "ТОКТОТУУ" : "ОЙНОТУУ";
    }
    if (musicVisualizer) {
      if (active) musicVisualizer.classList.add("playing");
      else musicVisualizer.classList.remove("playing");
    }
    if (floatingMusicBtn) {
      if (active) floatingMusicBtn.classList.add("playing");
      else floatingMusicBtn.classList.remove("playing");
    }
  }

  if (musicPlayPauseBtn) {
    musicPlayPauseBtn.addEventListener("click", toggleAudio);
  }

  if (floatingMusicBtn) {
    floatingMusicBtn.addEventListener("click", toggleAudio);
  }

  if (volumeSlider && bgAudio) {
    volumeSlider.addEventListener("input", (e) => {
      bgAudio.volume = e.target.value;
    });
  }

  function updateCountdown() {
    if (!cdDays || !cdHours || !cdMinutes || !cdSeconds) return;

    const targetDate = new Date("2026-10-05T12:00:00+06:00").getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (countdownGrid) countdownGrid.style.display = "none";
      if (countdownStarted) countdownStarted.style.display = "block";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    cdDays.textContent = String(days).padStart(2, "0");
    cdHours.textContent = String(hours).padStart(2, "0");
    cdMinutes.textContent = String(minutes).padStart(2, "0");
    cdSeconds.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isExpanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
      hamburgerBtn.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active");
      if (hamburgerBtn) hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  function handleScrollReveal() {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
            }
          });
        },
        { threshold: 0.15 },
      );

      revealElements.forEach((el) => observer.observe(el));
    } else {
      revealElements.forEach((el) => el.classList.add("active"));
    }
  }

  handleScrollReveal();

  if (mapBtn) {
    mapBtn.addEventListener("click", () => {
      const query = encodeURIComponent(
        "«Манас» жатак лицейи, Бакай-Ата району, Талас облусу",
      ); //2gis.kg/bishkek/geo/70000001080451549/71.925444,42.558705
      const mapUrl = `//2gis.kg/bishkek/geo/70000001080451549/71.925444,42.558705=${query}`;
      window.open(mapUrl, "_blank", "noopener,noreferrer");
    });
  }

  if (calendarBtn) {
    calendarBtn.addEventListener("click", () => {
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Manas Zhatak Lyceum//Teacher Day//KY
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Мугалимдер күнү
DESCRIPTION:Мугалимдер күнүнө арналган салтанаттуу иш-чара.
LOCATION:«Манас» жатак лицейи, Бакай-Ата району, Талас облусу
DTSTART:20261005T060000Z
DTEND:20261005T090000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8",
      });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "teacher-day.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  function openModal() {
    if (!greetingModal) return;
    greetingModal.classList.add("active");
    greetingModal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    if (!greetingModal) return;
    greetingModal.classList.remove("active");
    greetingModal.setAttribute("aria-hidden", "true");
  }

  if (modalOpenBtn) modalOpenBtn.addEventListener("click", openModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalCloseX) modalCloseX.addEventListener("click", closeModal);

  if (greetingModal) {
    greetingModal.addEventListener("click", (e) => {
      if (e.target === greetingModal) {
        closeModal();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (introScreen) {
        introScreen.classList.remove("fade-out");
      }
      if (mainContent) {
        mainContent.classList.remove("visible");
      }
      pauseAudio();
    });
  }

  if (teacherImg && photoPlaceholder) {
    teacherImg.addEventListener("error", () => {
      teacherImg.style.display = "none";
      photoPlaceholder.style.display = "flex";
    });
  }
});
const introBtn = document.getElementById("intro-btn");
const bgAudio = document.getElementById("bg-audio");

if (introBtn) {
  introBtn.addEventListener("click", () => {
    if (bgAudio) {
      bgAudio.play().catch((err) => console.log(err));
    }
  });
}

(() => {
  const canvas = document.getElementById("gold-particles");
  const petalsLayer = document.getElementById("falling-petals");

  if (!canvas || !petalsLayer) return;

  // Уважаем настройку уменьшения анимации
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // ЗОЛОТАЯ ПЫЛЬ
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w = 0;
  let h = 0;
  let frame;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(85, Math.floor((w * h) / 12000));

    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      speed: Math.random() * 0.35 + 0.08,
      drift: (Math.random() - 0.5) * 0.3,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.45 + 0.2,
    }));
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.y -= p.speed;
      p.x += p.drift;
      p.phase += 0.018;

      if (p.y < -4) {
        p.y = h + 4;
        p.x = Math.random() * w;
      }

      if (p.x < -4) p.x = w + 4;
      if (p.x > w + 4) p.x = -4;

      const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.phase));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(225, 190, 112, ${alpha})`;
      ctx.fill();
    }

    frame = requestAnimationFrame(animate);
  }

  resize();
  animate();
  window.addEventListener("resize", resize);

  // ЛЕПЕСТКИ
  const amount = window.innerWidth < 600 ? 7 : 13;

  for (let i = 0; i < amount; i++) {
    const petal = document.createElement("span");
    petal.className = "falling-petal";

    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 14}s`;
    petal.style.animationDelay = `${-Math.random() * 25}s`;
    petal.style.transform = `scale(${0.65 + Math.random() * 0.65})`;

    petalsLayer.appendChild(petal);
  }

  // Не продолжаем анимацию в скрытой вкладке
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
    } else {
      cancelAnimationFrame(frame);
      animate();
    }
  });
})();
