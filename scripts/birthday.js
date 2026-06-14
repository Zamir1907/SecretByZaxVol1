// Birthday page scripts - FINAL WORK ON INSTAGRAM

// ===== SETUP MUSIK =====
const bgMusic = document.getElementById('bgMusic');
let musicPlayed = false;
let animationStarted = false;
let tl = null;

// Deteksi Instagram
const isInstagram = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua.indexOf('Instagram') > -1 || ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1;
};

// Fungsi play musik
function playMusic() {
  if (!bgMusic || musicPlayed) return;
  
  bgMusic.load();
  bgMusic.volume = 1.0;
  
  bgMusic.play().then(() => {
    musicPlayed = true;
    console.log('Musik berjalan');
  }).catch(e => {
    console.log('Error play musik:', e.message);
    if (isInstagram() && !musicPlayed) {
      setTimeout(() => {
        bgMusic.play().catch(() => {});
      }, 500);
    }
  });
}

// ===== MEMULAI SEMUANYA (dipanggil saat user klik overlay) =====
function startEverything() {
  if (animationStarted) return;
  animationStarted = true;
  
  playMusic();
  
  const overlay = document.getElementById('startOverlay');
  if (overlay) {
    overlay.classList.add('hide');
  }
  
  if (tl && tl.paused) {
    tl.resume();
  }
}

// ===== SETUP TOMBOL WISH =====
const setupWishButton = () => {
  const wishBtn = document.getElementById("wishButton");
  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      if (!musicPlayed) playMusic();
      Swal.fire({
        title: "✨ Untuk Kamu ✨",
        text: "Semoga semua impianmu tercapai tahun ini. Bahagia selalu!",
        icon: "success",
        confirmButtonText: "Terima kasih 💫",
        background: "#fff9f0",
        confirmButtonColor: "#e8c97f",
      });
    });
  }
};

// ===== ANIMATION TIMELINE (DIPERLAMBAT) =====
const animationTimeline = () => {
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");

  if (textBoxChars) {
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
      .split("")
      .join("</span><span>")}</span>`;
  }

  if (hbd) {
    hbd.innerHTML = `<span>${hbd.innerHTML
      .split("")
      .join("</span><span>")}</span>`;
  }

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewY: "-15deg" };

  tl = new TimelineMax({ paused: true });

  tl.to(".container", 0.8, { visibility: "visible" })
    .from(".one", 0.9, { opacity: 0, y: 10 })
    .from(".two", 0.6, { opacity: 0, y: 10 })
    .to(".one", 0.9, { opacity: 0, y: 10 }, "+=5")
    .to(".two", 0.9, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.9, { opacity: 0, y: 10 })
    .to(".three", 0.9, { opacity: 0, y: 10 }, "+=4.5")
    .from(".four", 0.9, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.5, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 2, { visibility: "visible" }, 0.08)
    .to(".fake-btn", 0.2, { backgroundColor: "#e8c97f", color: "#1a1a1a" }, "+=3.5")
    .to(".four", 0.7, { scale: 0.2, opacity: 0, y: -150 }, "+=1.2")
    .from(".idea-1", 0.9, ideaTextTrans)
    .to(".idea-1", 0.9, ideaTextTransLeave, "+=4")
    .from(".idea-2", 0.9, ideaTextTrans)
    .to(".idea-2", 0.9, ideaTextTransLeave, "+=4")
    .from(".idea-3", 0.9, ideaTextTrans)
    .to(".idea-3 strong", 0.7, { scale: 1.1, x: 10, backgroundColor: "#e8c97f", color: "#1a1a1a" })
    .to(".idea-3", 0.9, ideaTextTransLeave, "+=4")
    .from(".idea-4", 0.9, ideaTextTrans)
    .to(".idea-4", 0.9, ideaTextTransLeave, "+=3.5")
    .from(".idea-5", 0.9, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=2")
    .to(".idea-5 span", 0.9, { rotation: 90, x: 8 }, "+=2")
    .to(".idea-5", 0.9, { scale: 0.2, opacity: 0 }, "+=2.5")
    .staggerFrom(".idea-6 span", 1, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.25)
    .staggerTo(".idea-6 span", 1, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.25, "+=2")
    .staggerFromTo(".ballons img", 3, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.25)
    .from(".profile-picture", 0.7, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", 0.7, { x: -100, y: 350, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.9, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.15)
    .staggerFromTo(".wish-hbd span", 0.9, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.15, "party")
    .from(".wish h5", 0.7, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .staggerTo(".eight svg", 2, { visibility: "visible", opacity: 0, scale: 80, repeat: 2, repeatDelay: 1.8 }, 0.4)
    .to(".six", 0.7, { opacity: 0, y: 30, zIndex: "-1" }, "+=2")
    .staggerFrom(".nine p", 1.2, ideaTextTrans, 1.5)
    .to(".last-smile", 0.7, { rotation: 90 }, "+=2.5");

  // HAPUS atau COMMENT bagian replyBtn karena sudah dihapus di HTML
  // const replyBtn = document.getElementById("replay");
  // if (replyBtn) { ... }
};

// ===== LOAD EVENT =====
window.addEventListener("load", () => {
  console.log('Halaman loaded - animasi paused, platform:', isInstagram() ? 'Instagram' : 'Browser');
  
  animationTimeline();
  setupWishButton();
  
  const overlay = document.getElementById('startOverlay');
  if (overlay) {
    console.log('Overlay ditemukan, memasang listener');
    overlay.addEventListener('click', startEverything);
    overlay.addEventListener('touchstart', startEverything);
  } else {
    console.log('Overlay TIDAK ditemukan! Cek ID di HTML');
  }
  
  if (localStorage.getItem('loginSuccess') === 'true') {
    localStorage.removeItem('loginSuccess');
  }
  
  if (isInstagram()) {
    console.log('Mode Instagram aktif - user harus klik overlay untuk mulai');
  }
});

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());
