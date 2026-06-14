// ========== BIRTHDAY JS - VERSI FINAL ==========
const bgMusic = document.getElementById('bgMusic');
let musicPlayed = false;

// === 1. Cek status login, tapi tidak otomatis play ===
const everLoggedIn = localStorage.getItem('loginSuccess') === 'true';
if (everLoggedIn) localStorage.removeItem('loginSuccess');

// === 2. FUNGSI PLAY YANG HANDAL ===
function playMusic() {
  if (!bgMusic || musicPlayed) return;
  bgMusic.play().then(() => {
    musicPlayed = true;
    console.log('Musik berjalan');
  }).catch(e => {
    console.warn('Gagal play:', e);
  });
}

// === 3. INI KUNCI UNTUK INSTAGRAM ===
// Pakai "first tap" — user harus tap/klik di halaman ini minimal sekali (Instagram WAJIB)
function installTapToPlay() {
  const handler = () => {
    if (everLoggedIn && !musicPlayed) {
      playMusic();
    }
    // Setelah user tap, hapus listener supaya ga ganggu
    document.removeEventListener('click', handler);
    document.removeEventListener('touchstart', handler);
  };
  document.addEventListener('click', handler);
  document.addEventListener('touchstart', handler);
}

// === 4. PERBAIKAN REFRESH ===
// Simpan status "lagu pernah diputar" supaya di refresh tidak mati
window.addEventListener('beforeunload', () => {
  if (musicPlayed) sessionStorage.setItem('musicWasPlaying', 'true');
});

window.addEventListener('load', () => {
  // Kalau sebelumnya sudah diputar, coba lanjutkan
  if (sessionStorage.getItem('musicWasPlaying') === 'true' && bgMusic && !musicPlayed) {
    bgMusic.currentTime = 0;
    playMusic();
  }
  installTapToPlay();
  animationTimeline();
  setupWishButton();
});

// === 5. FUNGSI LAIN (wish, replay, animasi) ===
function setupWishButton() {
  const wishBtn = document.getElementById('wishButton');
  if (wishBtn) {
    wishBtn.addEventListener('click', () => {
      playMusic();
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
}

function animationTimeline() {
  // ... (kode GSAP animasimu yang sudah kamu punya sebelumnya, taruh di sini utuh)
}
