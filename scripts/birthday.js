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

// ===== FUNGSI SPLIT TEKS JADI PER KATA UNTUK ANIMASI SLIDE KIRI KE KANAN =====
function splitTextIntoWords(element) {
  if (!element) return;
  const originalText = element.innerHTML;
  // Pisahkan berdasarkan tag <br/> atau spasi
  const words = originalText.split(/(\s+|<br\s*\/?>)/).filter(w => w !== '');
  element.innerHTML = words.map(word => {
    if (word.match(/<br\s*\/?>/i)) {
      return '<br>';
    }
    return `<span class="word-slide" style="display:inline-block; opacity:0; transform:translateX(-30px); transition:none;">${word}</span>`;
  }).join('');
}

// ===== ANIMATION TIMELINE (DURASI LAMBAT - DENGAN SLIDE KIRI KE KANAN) =====
const animationTimeline = () => {
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");
  const idea3 = document.querySelector(".idea-3");

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

  // SPLIT TEKS IDEA-3 MENJADI PER KATA UNTUK SLIDE KIRI KE KANAN
  if (idea3) {
    const originalHtml = idea3.innerHTML;
    idea3.setAttribute('data-original', originalHtml);
    splitTextIntoWords(idea3);
  }

  const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewY: "-15deg" };

  tl = new TimelineMax({ paused: true });

  tl.to(".container", 0.6, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=3.4")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=3.3")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 1.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "#e8c97f", color: "#1a1a1a" }, "+=1.5")
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=1")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=2.8")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=2.8")
    
    // ===== ANIMASI KHUSUS UNTUK IDEA-3 (SLIDE KIRI KE KANAN PER KATA) =====
    // Step 1: Reset dan siapkan semua kata
    .set(".idea-3 .word-slide", { opacity: 0, x: -40, display: "inline-block" }, "+=0.2")
    // Step 2: Animasi per kata dari kiri ke kanan (stagger)
    .staggerTo(".idea-3 .word-slide", 0.5, 
      { opacity: 1, x: 0, ease: Back.easeOut.config(1.2) }, 
      0.08, "+=0.3")
    // Step 3: Efek highlight background kuning setelah semua kata muncul
    .to(".idea-3 strong", 0.4, 
      { backgroundColor: "#e8c97f", color: "#1a1a1a", scale: 1.05, repeat: 2, yoyo: true }, 
      "+=0.5")
    // Step 4: Tunggu sebentar lalu animasi leave
    .to(".idea-3 .word-slide", 0.6, 
      { opacity: 0, x: 30, stagger: 0.05, ease: Power2.easeIn }, 
      "+=3.0")
    
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=2.8")
    .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=2")
    .to(".idea-5 span", 0.7, { rotation: 90, x: 8 }, "+=2")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2.5")
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=2.5")
    .staggerFromTo(".ballons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".profile-picture", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")    
    .set(".eight svg", { visibility: "visible" })
    .staggerFromTo(".eight svg", 1.5,
      { opacity: 1, scale: 1, immediateRender: false },
      { opacity: 0, scale: 46, repeat: 2, repeatDelay: 1.4, ease: Power2.easeOut },
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
