// Login page scripts — Secret by Zax

const VALID_USERNAME = "zaxganteng";
const VALID_PASSWORD = "ayamcoding";

const form     = document.getElementById("loginForm");
const card     = document.getElementById("loginCard");
const errorEl  = document.getElementById("formError");
const togglePw = document.getElementById("togglePw");
const pwInput  = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");

// ===== ANIMASI MASUK =====
if (window.gsap) {
  gsap.to(card, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: 0.1 });
}

// ===== TOGGLE SHOW/HIDE PASSWORD (tanpa efek stroke) =====
if (togglePw && pwInput) {
  togglePw.addEventListener("click", (e) => {
    e.preventDefault();
    const isHidden = pwInput.type === "password";
    pwInput.type   = isHidden ? "text" : "password";
    togglePw.textContent = isHidden ? "🙈" : "👁";
    pwInput.focus();
  });
  
  // Touch device: mencegah outline jelek
  togglePw.addEventListener("touchstart", (e) => {
    e.preventDefault();
    togglePw.click();
  });
}

// ===== ERROR HANDLING =====
["username", "password"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", clearError);
});

function showError(msg) {
  ["username", "password"].forEach(id => {
    document.getElementById(id)?.classList.add("error");
  });
  errorEl.textContent = msg || "username atau password salah.";
  errorEl.classList.add("visible");
  if (window.gsap) {
    gsap.fromTo(errorEl, { x: -5 }, { x: 0, duration: 0.3, ease: "elastic.out(1,0.4)" });
  }
}

function clearError() {
  ["username", "password"].forEach(id => {
    document.getElementById(id)?.classList.remove("error");
  });
  errorEl.classList.remove("visible");
}

// ===== VALIDASI & LOGIN =====
function validateForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password) {
    showError("isi dulu semua kolom ya.");
    return;
  }

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    loginBtn.disabled = true;
    loginBtn.textContent = "masuk...";
    localStorage.setItem("loginSuccess", "true");

    Swal.fire({
      icon: "success",
      title: "berhasil!",
      text: "selamat datang 🎉",
      showConfirmButton: false,
      timer: 1400,
      background: "#12121c",
      color: "#ece8df",
      iconColor: "#e8c97f",
      customClass: { popup: "swal-dark" },
    }).then(() => {
      window.location.href = "birthday.html";
    });

  } else {
    showError("username atau password salah.");
    if (window.gsap) {
      gsap.fromTo(card, { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(1,0.3)" });
    }
  }
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm();
  });
}

// ===== HINT POPOVER =====
const hintTrigger = document.getElementById("hintTrigger");
const hintPopover = document.getElementById("hintPopover");
const copyToast   = document.getElementById("copyToast");
let popoverOpen   = false;
let toastTimer    = null;

function togglePopover() {
  popoverOpen = !popoverOpen;
  hintPopover.classList.toggle("open", popoverOpen);
  hintTrigger.textContent = popoverOpen ? "tutup ←" : "butuh bantuan? →";
}

function closePopover() {
  popoverOpen = false;
  hintPopover.classList.remove("open");
  hintTrigger.textContent = "butuh bantuan? →";
}

if (hintTrigger) {
  hintTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePopover();
  });
  
  hintTrigger.addEventListener("touchstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
    togglePopover();
  });
}

// tutup kalau klik di luar
document.addEventListener("click", (e) => {
  if (popoverOpen && hintPopover && hintTrigger) {
    if (!hintPopover.contains(e.target) && e.target !== hintTrigger) {
      closePopover();
    }
  }
});

document.addEventListener("touchstart", (e) => {
  if (popoverOpen && hintPopover && hintTrigger) {
    if (!hintPopover.contains(e.target) && e.target !== hintTrigger) {
      closePopover();
    }
  }
});

// ===== TOAST NOTIFICATION =====
function showToast(msg) {
  clearTimeout(toastTimer);
  copyToast.textContent = msg;
  copyToast.classList.add("show");
  toastTimer = setTimeout(() => copyToast.classList.remove("show"), 1600);
}

// ===== KLIK BARIS HINT: auto-isi + copy =====
document.querySelectorAll(".hint-row").forEach(row => {
  row.addEventListener("click", (e) => {
    e.stopPropagation();
    const field = row.dataset.field;
    const value = row.dataset.value;

    const input = document.getElementById(field);
    if (input) {
      input.value = value;
      if (field === "password" && pwInput) pwInput.type = "password";
      input.style.borderColor = "rgba(232,201,127,0.8)";
      input.style.boxShadow = "0 0 0 2px rgba(232,201,127,0.2)";
      setTimeout(() => {
        input.style.borderColor = "";
        input.style.boxShadow = "";
      }, 400);
    }

    navigator.clipboard.writeText(value)
      .then(() => showToast(`✓ ${field} tersalin`))
      .catch(() => showToast(`✓ ${field} diisi`));

    if (window.gsap) {
      gsap.fromTo(row, { scale: 0.98 }, { scale: 1, duration: 0.2, ease: "power2.out" });
    }
    
    setTimeout(() => {
      if (popoverOpen) closePopover();
    }, 300);
  });
  
  row.addEventListener("touchstart", (e) => {
    e.preventDefault();
    row.click();
  });
});

// bersihin error saat input difokus
const usernameInput = document.getElementById("username");
if (usernameInput) {
  usernameInput.addEventListener("focus", clearError);
}
if (pwInput) {
  pwInput.addEventListener("focus", clearError);
}

 document.addEventListener("contextmenu", e => e.preventDefault());
        document.addEventListener("dragstart", e => e.preventDefault());
