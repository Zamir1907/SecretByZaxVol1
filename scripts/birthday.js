// Birthday page scripts - FIXED VERSION

// ===== SETUP MUSIK =====
const bgMusic = document.getElementById('bgMusic');
let musicPlayed = false;
let loginSuccess = false;

// Cek apakah login sukses (dari localStorage)
// HAPUS FLAG setelah dibaca, TAPI simpan di sessionStorage untuk survive refresh
if (localStorage.getItem('loginSuccess') === 'true') {
  loginSuccess = true;
  localStorage.removeItem('loginSuccess'); // hapus dari localStorage
  
  // Simpan ke sessionStorage agar survive di page ini saat refresh
  sessionStorage.setItem('page2Accessed', 'true');
}

// Cek juga dari sessionStorage (untuk kasus refresh di page 2)
if (sessionStorage.getItem('page2Accessed') === 'true') {
  loginSuccess = true;
}

function playMusic() {
  if (!bgMusic) {
    console.log('Audio element tidak ditemukan');
    return;
  }
  
  if (musicPlayed) {
    console.log('Musik sudah diputar');
    return;
  }
  
  // Reset audio jika perlu
  bgMusic.currentTime = 0;
  
  bgMusic.play().then(() => {
    musicPlayed = true;
    console.log('Musik berjalan dengan sukses');
  }).catch(e => {
    console.log('Error play music:', e);
    // Fallback: coba lagi setelah user interaction
    if (e.name === 'NotAllowedError') {
      console.log('Menunggu user interaction...');
    }
  });
}

// ===== UNTUK INSTAGRAM & BROWSER: Universal unlock =====
function setupUniversalUnlock() {
  // Di page 2, kita ALWAYS setup unlock untuk musik
  // Tapi musik hanya akan diputar jika loginSuccess = true
  // Atau langsung mainkan otomatis jika browser mengizinkan
  
  const events = ['click', 'touchstart', 'touchend'];
  let unlocked = false;
  
  function unlockMusic() {
    if (!unlocked && bgMusic) {
      // Coba putar musik
      bgMusic.play().then(() => {
        musicPlayed = true;
        unlocked = true;
        console.log('Musik unlocked dan berjalan');
        
        // Hapus listener setelah sukses
        events.forEach(evt => {
          document.removeEventListener(evt, unlockMusic);
        });
      }).catch(e => {
        console.log('Gagal unlock music:', e);
      });
    }
  }
  
  // Pasang listener untuk berbagai event
  events.forEach(evt => {
    document.addEventListener(evt, unlockMusic);
  });
  
  // Coba mainkan otomatis (mungkin berhasil di browser)
  if (!musicPlayed && bgMusic) {
    bgMusic.play().then(() => {
      musicPlayed = true;
      console.log('Auto-play sukses');
    }).catch(e => {
      console.log('Auto-play tidak diizinkan, menunggu user interaction');
      // Jika login success, kita perlu user interaction
      if (loginSuccess) {
        console.log('Menunggu user klik untuk memutar musik');
      }
    });
  }
}

// ===== SETUP TOMBOL WISH =====
const setupWishButton = () => {
  const wishBtn = document.getElementById("wishButton");
  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      // Putar musik saat klik tombol (jika belum diputar)
      if (!musicPlayed && bgMusic) {
        bgMusic.play().then(() => {
          musicPlayed = true;
          console.log('Musik diputar dari tombol wish');
        }).catch(e => console.log('Error play dari wish:', e));
      }
      
      Swal.fire({
        title: "Untuk Kamu ✨",
        text: "Semoga semua impianmu tercapai tahun ini. Bahagia selalu!",
        icon: "success",
        confirmButtonText: "Terima kasih 💫",
        background: "#fff9f0",
        confirmButtonColor: "#e8c97f",
      });
    });
  }
};

// ===== ANIMATION TIMELINE =====
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

  const tl = new TimelineMax();

  tl.to(".container", 0.6, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "#e8c97f", color: "#1a1a1a" }, "+=2.2")
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.8")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, { scale: 1.1, x: 10, backgroundColor: "#e8c97f", color: "#1a1a1a" })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.5")
    .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=1.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=1.5")
    .staggerFromTo(".ballons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".profile-picture", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1.8");

  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.play().then(() => {
          musicPlayed = true;
          console.log('Musik replay');
        }).catch(e => console.log('Error replay:', e));
      }
      tl.restart();
    });
  }
};

// ===== LOAD =====
window.addEventListener("load", () => {
  console.log('Page loaded, loginSuccess:', loginSuccess);
  
  animationTimeline();
  setupWishButton();
  setupUniversalUnlock(); // Universal unlock untuk semua platform
});

// Prevent context menu & double click
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());
