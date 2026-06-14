// Login page scripts

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  validateForm();
});

function validateForm() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Validasi username dan password (sesuaikan sesuai keinginan)
  const validUsername = "zaxganteng";
  const validPassword = "zaxganteng";

  if (username === validUsername && password === validPassword) {
  // Simpan status login ke localStorage
  localStorage.setItem('loginSuccess', 'true');
  
  Swal.fire({
    icon: "success",
    title: "Berhasil masuk",
    text: "Selamat datang!",
    showConfirmButton: false,
    timer: 1500,
    background: "#181b24",
    color: "#f4f1ea",
    iconColor: "#e8c97f",
    customClass: { popup: "swal-dark" },
  }).then(function () {
    window.location.href = "birthday.html";
  });
} else {
    Swal.fire({
      icon: "error",
      title: "Gagal masuk",
      text: "Periksa kembali username dan password Anda.",
      confirmButtonText: "Coba lagi",
      confirmButtonColor: "#e8c97f",
      background: "#181b24",
      color: "#f4f1ea",
       customClass: { 
    popup: "swal-dark",
    confirmButton: "swal-button-dark"  // <-- TAMBAHKAN INI
  },
    });
  }
}
