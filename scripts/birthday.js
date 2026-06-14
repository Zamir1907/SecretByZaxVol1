// ============================================================
//  Birthday JS - Fixed: musik, .eight svg, Instagram support
// ============================================================

// ===== AUDIO =====
const bgMusic = document.getElementById('bgMusic');
let musicPlayed    = false;
let animStarted    = false;
let tl             = null;

// Deteksi Instagram / Facebook WebView
const isInstagram = () => {
  const ua = navigator.userAgent || '';
  return /Instagram|FBAN|FBAV/.test(ua);
};

function playMusic() {
  if (!bgMusic || musicPlayed) return;
  bgMusic.load();
  bgMusic.volume = 1.0;
  bgMusic.play()
    .then(() => { musicPlayed = true; })
    .catch(err => {
      console.log('Audio blocked:', err.message);
      // Instagram kadang perlu retry sekali
      if (isInstagram()) {
        setTimeout(() => bgMusic.play().catch(() => {}), 600);
      }
    });
}

// ===== OVERLAY: tap to begin =====
// Dipanggil saat user klik/tap overlay
function startEverything() {
  if (animStarted) return;
  animStarted = true;

  playMusic();

  const overlay = document.getElementById('startOverlay');
  if (overlay) overlay.classList.add('hide');

  // Resume timeline yang paused
  if (tl) tl.resume();
}

// ===== TOMBOL KIRIM UCAPAN =====
function setupWishButton() {
  const btn = document.getElementById('wishButton');
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (!musicPlayed) playMusic();
    Swal.fire({
      title: '✨ Untuk Kamu ✨',
      text: 'Semoga semua impianmu tercapai tahun ini. Bahagia selalu!',
      icon: 'success',
      confirmButtonText: 'Terima kasih 💫',
      background: '#fff9f0',
      confirmButtonColor: '#e8c97f',
    });
  });
}

// ===== ANIMATION TIMELINE =====
function animationTimeline() {
  // Split karakter untuk chatbox dan wish-hbd
  const chatbox = document.querySelector('.hbd-chatbox');
  const hbd     = document.querySelector('.wish-hbd');

  if (chatbox) {
    chatbox.innerHTML = '<span>' +
      chatbox.innerHTML.split('').join('</span><span>') +
      '</span>';
  }
  if (hbd) {
    hbd.innerHTML = '<span>' +
      hbd.innerHTML.split('').join('</span><span>') +
      '</span>';
  }

  const inTrans  = { opacity: 0, y: -20, rotationX: 5,  skewX:  '15deg' };
  const outTrans = { opacity: 0, y:  20, rotationY: 5,  skewY: '-15deg' };

  // FIX: paused:true — timeline baru jalan setelah startEverything() dipanggil
  tl = new TimelineMax({ paused: true });

  tl
    .to('.container', 0.6, { visibility: 'visible' })

    // --- Hai, Nama ---
    .from('.one', 0.7, { opacity: 0, y: 10 })
    .from('.two', 0.4, { opacity: 0, y: 10 })
    .to('.one',  0.7, { opacity: 0, y: 10 }, '+=3.4')
    .to('.two',  0.7, { opacity: 0, y: 10 }, '-=1')

    // --- Selamat ulang tahun ---
    .from('.three', 0.7, { opacity: 0, y: 10 })
    .to('.three',   0.7, { opacity: 0, y: 10 }, '+=3.3')

    // --- Chatbox ---
    .from('.four', 0.7, { scale: 0.2, opacity: 0 })
    .from('.fake-btn', 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo('.hbd-chatbox span', 1.5, { visibility: 'visible' }, 0.05)
    .to('.fake-btn', 0.1, { backgroundColor: '#e8c97f', color: '#1a1a1a' }, '+=1.5')
    .to('.four', 0.5, { scale: 0.2, opacity: 0, y: -150 }, '+=1')

    // --- Teks narasi ---
    .from('.idea-1', 0.7, inTrans)
    .to('.idea-1',   0.7, outTrans, '+=2.8')
    .from('.idea-2', 0.7, inTrans)
    .to('.idea-2',   0.7, outTrans, '+=2.8')
    .from('.idea-3', 0.7, inTrans)
    .to('.idea-3 strong', 0.5, { scale: 1.1, x: 10, backgroundColor: '#e8c97f', color: '#1a1a1a' })
    .to('.idea-3',   0.7, outTrans, '+=2.8')
    .from('.idea-4', 0.7, inTrans)
    .to('.idea-4',   0.7, outTrans, '+=2.8')
    .from('.idea-5', 0.7, { rotationX: 15, rotationZ: -10, skewY: '-5deg', y: 50, z: 10, opacity: 0 }, '+=2')
    .to('.idea-5 span', 0.7, { rotation: 90, x: 8 }, '+=2')
    .to('.idea-5', 0.7, { scale: 0.2, opacity: 0 }, '+=2.5')

    // --- J A D I ---
    .staggerFrom('.idea-6 span', 0.8, { scale: 3, opacity: 0, rotation:  15, ease: Expo.easeOut }, 0.2)
    .staggerTo(  '.idea-6 span', 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, '+=2.5')

    // --- Balon naik, foto & topi muncul ---
    .staggerFromTo('.ballons img', 2.5,
      { opacity: 0.9, y: 1400 },
      { opacity: 1,   y: -1000 },
      0.2
    )
    .from('.profile-picture', 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, '-=2')
    .from('.hat', 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })

    // --- HAPPY BIRTHDAY! ---
    .staggerFrom('.wish-hbd span', 0.7,
      { opacity: 0, y: -50, rotation: 150, skewX: '30deg', ease: Elastic.easeOut.config(1, 0.5) },
      0.1
    )
    .staggerFromTo('.wish-hbd span', 0.7,
      { scale: 1.4, rotationY: 150 },
      { scale: 1,   rotationY: 0,   color: '#ff69b4', ease: Expo.easeOut },
      0.1, 'party'
    )
    .from('.wish h5', 0.5, { opacity: 0, y: 10, skewX: '-15deg' }, 'party')

    // --- FIX .eight svg: z-index sudah diperbaiki di CSS,
    //     ini yang memunculkan lingkaran confetti ---
    .staggerTo('.eight svg', 1.5,
      { visibility: 'visible', opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 },
      0.3
    );

  // Tombol replay
  const replayBtn = document.getElementById('replay');
  if (replayBtn) {
    replayBtn.addEventListener('click', () => {
      musicPlayed = false;
      if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.play().catch(() => {});
        musicPlayed = true;
      }
      tl.restart();
    });
  }
}

// ===== INIT =====
window.addEventListener('load', () => {
  animationTimeline();
  setupWishButton();

  // Pasang listener ke overlay
  const overlay = document.getElementById('startOverlay');
  if (overlay) {
    overlay.addEventListener('click',      startEverything);
    overlay.addEventListener('touchstart', startEverything, { passive: true });
    overlay.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') startEverything();
    });
  }

  // Bersihkan flag login jika ada
  try { localStorage.removeItem('loginSuccess'); } catch(e) {}
});

// Disable klik kanan & double klik
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dblclick',    e => e.preventDefault());
