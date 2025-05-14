// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAr7Hv2ApKtNTxF11MhT5cuWeg_Dgsh0TY",
  authDomain: "smart-burme-app.firebaseapp.com",
  projectId: "smart-burme-app",
  storageBucket: "smart-burme-app.appspot.com",
  messagingSenderId: "851502425686",
  appId: "1:851502425686:web:f29e0e1dfa84794b4abdf7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth reference
const auth = firebase.auth();

// -------------------------
// Login Function
// -------------------------
function loginUser(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      window.location.href = "mail.html"; // Redirect after login
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// -------------------------
// Register Function
// -------------------------
function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Registered Successfully!");
      window.location.href = "mail.html";
    })
    .catch((error) => {
      alert("Register failed: " + error.message);
    });
}

// -------------------------
// Reset Password Function
// -------------------------
function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// -------------------------
// Logout Function
// -------------------------
function logoutUser() {
  auth.signOut()
    .then(() => {
      window.location.href = "login.html";
    });
}
