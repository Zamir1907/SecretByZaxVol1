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
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, { scale: 1.1, x: 10, backgroundColor: "#e8c97f", color: "#1a1a1a" })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=2.8")
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
    // ===== PERUBAHAN: UNLIMITED EFFECT UNTUK .eight svg =====
  .staggerTo(".eight svg", 1.5, { 
  visibility: "visible", 
  opacity: 0, 
  scale: 80, 
  repeat: -1, 
  repeatDelay: 1.4,
  ease: Power1.easeInOut
}, 0.3);
};

// ===== FUNGSI TAMBAHAN: MEMASTIKAN EIGHT TETAP MUNCUL =====
// Opsional: tambahkan fungsi untuk membuat efek confetti terus berjalan setelah animasi selesai
const keepEightVisible = () => {
  // Cek setiap 5 detik apakah elemen .eight svg masih ada yang terlihat
  // Jika perlu, restart animasinya
  const eightSvgs = document.querySelectorAll('.eight svg');
  if (eightSvgs.length > 0 && tl && !tl.isActive()) {
    // Jika timeline sudah selesai, tetap buat efek looping
    setInterval(() => {
      eightSvgs.forEach((svg, index) => {
        setTimeout(() => {
          svg.style.visibility = 'visible';
          svg.style.opacity = '1';
          svg.style.transform = 'scale(1)';
          setTimeout(() => {
            svg.style.opacity = '0';
            svg.style.transform = 'scale(80)';
          }, 50);
          setTimeout(() => {
            svg.style.visibility = 'hidden';
          }, 1500);
        }, index * 300);
      });
    }, 3000);
  }
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

// ===== FORCE EIGHT APPEAR =====
function forceEightAppear() {
  console.log('Memaksa eight muncul...');
  
  // Buat ulang elemen eight secara manual
  const eightContainer = document.querySelector('.eight');
  if (!eightContainer) {
    console.log('Eight tidak ditemukan, buat baru');
    const newEight = document.createElement('div');
    newEight.className = 'eight';
    newEight.style.position = 'fixed';
    newEight.style.top = '0';
    newEight.style.left = '0';
    newEight.style.width = '100%';
    newEight.style.height = '100%';
    newEight.style.zIndex = '999999';
    newEight.style.pointerEvents = 'none';
    
    // Buat 9 SVG
    const colors = ['#e8c97f', '#ff9fb2', '#8c7ae6', '#6fa8dc', '#f0b27a'];
    const positions = [
      { left: '5%', top: '7%' }, { left: '35%', top: '23%' },
      { left: '23%', top: '33%' }, { left: '57%', top: '43%' },
      { left: '7%', top: '68%' }, { left: '77%', top: '42%' },
      { left: '83%', top: '68%' }, { left: '37%', top: '86%' },
      { left: '87%', top: '94%' }
    ];
    
    for (let i = 0; i < 9; i++) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 40 40');
      svg.style.width = '25px';
      svg.style.height = '25px';
      svg.style.position = 'absolute';
      svg.style.left = positions[i].left;
      svg.style.top = positions[i].top;
      svg.style.fill = colors[i % colors.length];
      svg.style.opacity = '0';
      svg.style.visibility = 'visible';
      svg.style.zIndex = '999999';
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '20');
      circle.setAttribute('cy', '20');
      circle.setAttribute('r', '20');
      svg.appendChild(circle);
      newEight.appendChild(svg);
    }
    document.body.appendChild(newEight);
  }
  
  // Force munculin semua SVG
  setTimeout(() => {
    const allSvgs = document.querySelectorAll('.eight svg');
    console.log('Ditemukan', allSvgs.length, 'SVG');
    
    allSvgs.forEach((svg, index) => {
      svg.style.visibility = 'visible';
      svg.style.opacity = '1';
      svg.style.zIndex = '999999';
      
      // Animasi manual
      setInterval(() => {
        svg.style.transform = 'scale(1)';
        svg.style.opacity = '1';
        
        setTimeout(() => {
          svg.style.transform = 'scale(80)';
          svg.style.opacity = '0';
        }, 200);
        
        setTimeout(() => {
          svg.style.transform = 'scale(1)';
          svg.style.opacity = '1';
        }, 800);
      }, 2000 + (index * 200));
    });
  }, 1000);
}

// Panggil setelah halaman load
setTimeout(forceEightAppear, 5000);
