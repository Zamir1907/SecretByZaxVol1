// Birthday page scripts - INSTAGRAM OPTIMIZED VERSION

const startBtn = document.getElementById('startMusicBtn');
if (startBtn) {
  startBtn.addEventListener('click', () => {
    if (bgMusic) {
      bgMusic.load();
      bgMusic.play().then(() => {
        musicPlayed = true;
        startBtn.style.display = 'none';
        console.log('Music started by button');
      }).catch(e => console.log('Button play error:', e));
    }
  });
  
  // Hide after music starts
  const checkMusicInterval = setInterval(() => {
    if (musicPlayed && startBtn) {
      startBtn.style.display = 'none';
      clearInterval(checkMusicInterval);
    }
  }, 500);
}

// ===== SETUP MUSIK =====
const bgMusic = document.getElementById('bgMusic');
let musicPlayed = false;
let instagramUnlockAttempts = 0;

// Deteksi Instagram browser
const isInstagram = () => {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return (ua.indexOf('Instagram') > -1) || (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1);
};

// ===== FORCE PLAY UNTUK INSTAGRAM =====
function forcePlayForInstagram() {
  if (!isInstagram()) return false;
  
  console.log('Instagram detected, applying special fixes...');
  
  // Method 1: Create new audio context (hack untuk Instagram)
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    
    // Resume audio context
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().then(() => {
        console.log('AudioContext resumed for Instagram');
      });
    }
  } catch(e) {
    console.log('AudioContext not supported');
  }
  
  // Method 2: Force play dengan berbagai cara
  setTimeout(() => {
    if (!musicPlayed && bgMusic) {
      // Reset audio
      bgMusic.load();
      bgMusic.volume = 1.0;
      
      // Coba play dengan promise
      const playPromise = bgMusic.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          musicPlayed = true;
          console.log('Instagram music playing!');
        }).catch(error => {
          console.log('Instagram play failed:', error);
          // Retry setelah 1 detik
          setTimeout(() => retryPlayForInstagram(), 1000);
        });
      }
    }
  }, 500);
  
  return true;
}

function retryPlayForInstagram() {
  if (musicPlayed || instagramUnlockAttempts > 5) return;
  
  instagramUnlockAttempts++;
  console.log(`Retry attempt ${instagramUnlockAttempts} for Instagram`);
  
  if (bgMusic) {
    bgMusic.load();
    bgMusic.play().then(() => {
      musicPlayed = true;
      console.log('Instagram music success on retry!');
    }).catch(e => {
      console.log(`Retry ${instagramUnlockAttempts} failed`);
      if (instagramUnlockAttempts < 5) {
        setTimeout(() => retryPlayForInstagram(), 1500);
      }
    });
  }
}

// ===== UNIVERSAL UNLOCK UNTUK SEMUA PLATFORM =====
function setupMusicUnlock() {
  const isIg = isInstagram();
  
  // Untuk Instagram: lebih agresif
  const events = isIg ? 
    ['click', 'touchstart', 'touchend', 'scroll', 'visibilitychange'] :
    ['click', 'touchstart'];
  
  let unlocked = false;
  
  function unlockMusic() {
    if (unlocked || !bgMusic) return;
    
    console.log('User interaction detected, trying to play music...');
    
    // Coba play dengan force
    bgMusic.load();
    
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        musicPlayed = true;
        unlocked = true;
        console.log('Music unlocked successfully!');
        
        // Hapus semua listener
        events.forEach(evt => {
          document.removeEventListener(evt, unlockMusic);
        });
      }).catch(error => {
        console.log('Play failed on interaction:', error);
        
        // Untuk Instagram, coba lagi dengan delay
        if (isIg && !unlocked) {
          setTimeout(() => {
            if (!musicPlayed) {
              bgMusic.play().catch(e => console.log('Still failing:', e));
            }
          }, 100);
        }
      });
    }
  }
  
  // Pasang listener
  events.forEach(evt => {
    document.addEventListener(evt, unlockMusic);
    console.log(`Listener added for: ${evt}`);
  });
  
  // Untuk Instagram: coba play otomatis dengan delay
  if (isIg) {
    console.log('Instagram mode: aggressive auto-play attempts');
    
    // Attempt 1: After page load
    setTimeout(() => {
      if (!musicPlayed) {
        bgMusic.load();
        bgMusic.play().catch(e => console.log('Auto attempt 1 failed'));
      }
    }, 1000);
    
    // Attempt 2: After 2 seconds
    setTimeout(() => {
      if (!musicPlayed) {
        bgMusic.play().catch(e => console.log('Auto attempt 2 failed'));
        forcePlayForInstagram();
      }
    }, 2000);
    
    // Attempt 3: Simulate click on body
    setTimeout(() => {
      if (!musicPlayed) {
        document.body.click();
      }
    }, 3000);
  } else {
    // Untuk browser biasa, coba auto-play
    if (bgMusic) {
      bgMusic.play().then(() => {
        musicPlayed = true;
        console.log('Auto-play success on browser');
      }).catch(e => console.log('Auto-play blocked, waiting for interaction'));
    }
  }
}

// ===== SETUP TOMBOL WISH =====
const setupWishButton = () => {
  const wishBtn = document.getElementById("wishButton");
  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      // Pastikan musik diputar
      if (!musicPlayed && bgMusic) {
        bgMusic.load();
        bgMusic.play().then(() => {
          musicPlayed = true;
          console.log('Music played from wish button');
        }).catch(e => {
          console.log('Wish button play error:', e);
          // Last resort for Instagram
          if (isInstagram()) {
            window.location.reload(); // Force reload as last resort
          }
        });
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
        bgMusic.load();
        bgMusic.currentTime = 0;
        bgMusic.play().then(() => {
          musicPlayed = true;
          console.log('Replay music');
        }).catch(e => console.log('Replay error:', e));
      }
      tl.restart();
    });
  }
};

// ===== VISIBILITY API UNTUK INSTAGRAM =====
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && isInstagram() && !musicPlayed && bgMusic) {
    console.log('Page visible again, trying to play');
    bgMusic.play().catch(e => console.log('Visibility play failed'));
  }
});

// ===== LOAD =====
window.addEventListener("load", () => {
  console.log('Page loaded, platform:', isInstagram() ? 'Instagram' : 'Browser');
  
  animationTimeline();
  setupWishButton();
  setupMusicUnlock();
});

// Prevent context menu & double click
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('dblclick', e => e.preventDefault());
