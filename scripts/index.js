// Login page scripts — Secret by Zax

const VALID_USERNAME = "zaxganteng";
const VALID_PASSWORD = "zaxganteng";

const form      = document.getElementById("loginForm");
const card      = document.getElementById("loginCard");
const errorEl   = document.getElementById("formError");
const togglePw  = document.getElementById("togglePw");
const pwInput   = document.getElementById("password");
const loginBtn  = document.getElementById("loginBtn");

// ===== ANIMASI MASUK =====
if (window.gsap) {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    duration: 0.65,
    ease: "power3.out",
    delay: 0.1,
  });
}

// ===== TOGGLE SHOW/HIDE PASSWORD =====
if (togglePw) {
  togglePw.addEventListener("click", () => {
    const isHidden = pwInput.type === "password";
    pwInput.type = isHidden ? "text" : "password";
    togglePw.textContent = isHidden ? "🙈" : "👁";
  });
}

// ===== CLEAR ERROR SAAT USER MULAI NGETIK =====
["username", "password"].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener("input", clearError);
});

function showError(msg) {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");
  if (usernameEl) usernameEl.classList.add("error");
  if (passwordEl) passwordEl.classList.add("error");
  errorEl.textContent = msg || "username atau password salah.";
  errorEl.classList.add("visible");

  if (window.gsap) {
    gsap.fromTo(errorEl, { x: -6 }, { x: 0, duration: 0.3, ease: "elastic.out(1,0.4)" });
  }
}

function clearError() {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");
  if (usernameEl) usernameEl.classList.remove("error");
  if (passwordEl) passwordEl.classList.remove("error");
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
      gsap.fromTo(card,
        { x: -8 },
        { x: 0, duration: 0.4, ease: "elastic.out(1,0.3)" }
      );
    }
  }
}

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm();
  });
}
