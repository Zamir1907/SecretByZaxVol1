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

// ===== ANIMATION TIMELINE (DURASI LAMBAT - TANPA HILANGKAN FOTO) =====
// ===== ANIMATION TIMELINE (DURASI LAMBAT - TANPA HILANGKAN FOTO) =====
// ===== UPDATED: Smoother, more natural, professional animations =====
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

  // ===== MASUK: horizontal slide dari kiri + slight rotation (lebih cinematic) =====
  const ideaTextTrans = {
    opacity: 0,
    x: -40,
    rotation: -3,
    ease: Power3.easeOut
  };

  // ===== KELUAR: dissolve ke kanan + slight rotation (smooth storytelling) =====
  const ideaTextTransLeave = {
    opacity: 0,
    x: 40,
    rotation: 2,
    ease: Power2.easeIn
  };

  tl = new TimelineMax({ paused: true });

  tl.to(".container", 0.6, { visibility: "visible" })

    // ===== .one & .two: Soft Fade Slide Up — lebih cinematic, y:30 lebih kerasa naik =====
    .from(".one", 1.0, { opacity: 0, y: 30, ease: Power3.easeOut })
    .from(".two", 0.8, { opacity: 0, y: 20, ease: Power2.easeOut }, "-=0.3")

    // ===== KELUAR .one & .two: smooth easeIn =====
    .to(".one", 0.8, { opacity: 0, y: -20, ease: Power2.easeIn }, "+=3.2")
    .to(".two", 0.7, { opacity: 0, y: -15, ease: Power2.easeIn }, "-=0.5")

    // ===== .three: Blur Fade In — efek fokus kamera, elegan =====
    .from(".three", 1.0, {
      opacity: 0,
      filter: "blur(8px)",
      y: 15,
      ease: Power2.easeOut
    })
    .to(".three", 0.8, {
      opacity: 0,
      filter: "blur(8px)",
      y: -15,
      ease: Power2.easeIn
    }, "+=3.0")

    // ===== .four: scale masuk lebih smooth =====
    .from(".four", 0.8, { scale: 0.5, opacity: 0, ease: Back.easeOut.config(1.5) })
    .from(".fake-btn", 0.4, { scale: 0.5, opacity: 0, ease: Back.easeOut.config(1.5) })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "#e8c97f", color: "#1a1a1a" }, "+=1.5")
    .to(".four", 0.6, { scale: 0.3, opacity: 0, y: -100, ease: Power3.easeIn }, "+=1")

    // ===== .idea-1 s/d .idea-4: horizontal slide — storytelling, mudah dibaca =====
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.8")

    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.8")

    .from(".idea-3", 0.7, ideaTextTrans)

    // ===== .idea-3 strong: Highlight Pulse — lebih natural, tanpa scale agresif =====
    .to(".idea-3 strong", 0.6, {
      backgroundColor: "#e8c97f",
      color: "#1a1a1a",
      paddingLeft: "6px",
      paddingRight: "6px",
      borderRadius: "4px",
      ease: Power2.easeOut
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.8")

    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.8")

    // ===== .idea-5: Stagger Word Drop — per span, Back.easeOut natural =====
.from(".idea-5", 0.7, { opacity: 0, x: -40, rotation: -3, ease: Power3.easeOut }, "+=2")
.to(".idea-5 span", 0.5, { rotation: 15, scale: 1.2 }, "+=1.5")
.to(".idea-5", 0.6, { opacity: 0, x: 40, rotation: 2, ease: Power2.easeIn }, "+=1.5")

    // ===== .idea-6 span: Scale dikurangi dari 3 → 1.5, lebih profesional =====
    .staggerFrom(".idea-6 span", 0.7, {
      scale: 1.5,
      opacity: 0,
      y: -20,
      rotation: 8,
      ease: Expo.easeOut
    }, 0.15)
    .staggerTo(".idea-6 span", 0.6, {
      scale: 0.8,
      opacity: 0,
      y: 20,
      rotation: -5,
      ease: Power3.easeIn
    }, 0.1, "+=2.5")

    // ===== Ballons: tetap sama, sudah smooth =====
    .staggerFromTo(".ballons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)

    // ===== Profile picture & hat: sedikit lebih smooth =====
    .from(".profile-picture", 0.6, {
      scale: 2.5,
      opacity: 0,
      x: 20,
      y: -20,
      rotationZ: -30,
      ease: Back.easeOut.config(1.2)
    }, "-=2")
    .from(".hat", 0.5, { x: -80, y: 300, rotation: -150, opacity: 0, ease: Power3.easeOut })
.to(".hat", 0, { rotation: -22 }) // set ke posisi final CSS yang tadi kita hapus

    // ===== .wish-hbd span: Wave Bounce — dikurangi dari rotation:150 → 30, lebih elegan =====
    .staggerFrom(".wish-hbd span", 0.8, {
      opacity: 0,
      y: -40,
      rotation: 30,
      skewX: "10deg",
      ease: Back.easeOut.config(2)
    }, 0.08)

    // ===== .wish-hbd span color: subtle rotationY, lebih smooth =====
    .staggerFromTo(".wish-hbd span", 0.7,
      { scale: 1.3, rotationY: 90 },
      { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut },
      0.08, "party")

    // ===== .wish h5: clean fade in =====
    .from(".wish h5", 0.6, { opacity: 0, y: 12, ease: Power2.easeOut }, "party")

    // ===== .eight svg: tetap sama =====
    .set(".eight svg", { visibility: "visible" })
    .staggerFromTo(".eight svg", 1.5,
      { opacity: 1, scale: 1, immediateRender: false },
      { opacity: 0, scale: 35, repeat: 3, repeatDelay: 1.4, ease: Power2.easeOut },
      0.3);
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
