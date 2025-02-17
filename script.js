// Fungsi untuk validasi format email
function isValidEmail(email) {
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Fungsi untuk menampilkan form pendaftaran
function showRegisterForm() {
  document.querySelector(".login-container").style.display = "none";
  document.getElementById("register-container").style.display = "block";
}

// Fungsi untuk menampilkan form login
function showLoginForm() {
  document.querySelector(".login-container").style.display = "block";
  document.getElementById("register-container").style.display = "none";
}

// Fungsi untuk mendaftarkan akun
function register(event) {
  event.preventDefault(); // Mencegah halaman refresh

  var firstName = document.getElementById("first-name").value.trim();
  var lastName = document.getElementById("last-name").value.trim();
  var email = document.getElementById("register-email").value.trim();
  var password = document.getElementById("register-password").value.trim();
  var school = document.getElementById("school").value.trim();
  var graduationYear = parseInt(
    document.getElementById("graduation-year").value
  );

  var currentYear = new Date().getFullYear();

  // Validasi input
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !school ||
    !graduationYear
  ) {
    alert("Harap isi semua kolom!");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Masukkan email yang valid!");
    document.getElementById("register-email").focus();
    return;
  }

  if (password.length < 6) {
    alert("Kata sandi harus minimal 6 karakter!");
    document.getElementById("register-password").focus();
    return;
  }

  if (graduationYear < 1900 || graduationYear > currentYear) {
    alert("Masukkan tahun lulusan yang valid!");
    document.getElementById("graduation-year").focus();
    return;
  }

  // Cek apakah email sudah terdaftar
  var existingUser = localStorage.getItem(email);
  if (existingUser) {
    alert("Email sudah terdaftar! Silakan login.");
    showLoginForm();
    return;
  }

  // ⚠️ Sebaiknya gunakan hashing untuk password (gunakan bcrypt.js atau metode lain)
  var userData = {
    firstName,
    lastName,
    email,
    password, // ⚠️ Jangan simpan password dalam bentuk plain text
    school,
    graduationYear,
  };

  localStorage.setItem(email, JSON.stringify(userData)); // Simpan berdasarkan email

  alert("Akun berhasil dibuat! Silakan login.");
  showLoginForm();
}

// Fungsi untuk login
function login(event) {
  event.preventDefault(); // Mencegah halaman refresh

  var email = document.getElementById("email").value.trim();
  var password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Harap isi email dan kata sandi!");
    return;
  }

  var storedUser = localStorage.getItem(email);
  if (!storedUser) {
    alert("Email belum terdaftar! Silakan daftar terlebih dahulu.");
    document.getElementById("email").focus();
    return;
  }

  storedUser = JSON.parse(storedUser);

  if (storedUser.password !== password) {
    alert("Email atau kata sandi salah!");
    document.getElementById("password").focus();
    return;
  }

  alert("Login berhasil!");
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("loggedInUser", email); // Simpan user yang sedang login
  window.location.href = "dashboard.html"; // Redirect ke dashboard
}

// Fungsi untuk logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInUser");
  alert("Anda telah logout.");
  window.location.href = "index.html"; // Redirect ke halaman login
}

// Fungsi untuk mengecek status login saat halaman dimuat
function checkLoginStatus() {
  if (localStorage.getItem("isLoggedIn") === "true") {
    alert("Anda sudah login!");
    window.location.href = "dashboard.html";
  }
}

// Fungsi untuk memuat data user di dashboard
function loadUserData() {
  var isLoggedIn = localStorage.getItem("isLoggedIn");
  var userEmail = localStorage.getItem("loggedInUser");

  if (!isLoggedIn || !userEmail) {
    window.location.href = "index.html"; // Redirect ke halaman login jika tidak login
    return;
  }

  var userData = JSON.parse(localStorage.getItem(userEmail));
  if (!userData) {
    alert("Terjadi kesalahan! Silakan login kembali.");
    logout();
    return;
  }

  document.getElementById("user-name").innerText =
    userData.firstName + " " + userData.lastName;
}

// Jalankan saat halaman login dimuat
checkLoginStatus();
