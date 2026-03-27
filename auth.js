import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

  // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhlGBYlqSRRq6ib20WlufcHQMt5vaXve8",
  authDomain: "ventas-app-b92b7.firebaseapp.com",
  projectId: "ventas-app-b92b7",
  storageBucket: "ventas-app-b92b7.firebasestorage.app",
  messagingSenderId: "356700421917",
  appId: "1:356700421917:web:1560c2facfd2bd7208abf4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// REGISTRO
window.registrar = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Usuario registrado correctamente");
    window.location.href = "login.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
};

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login exitoso");
    window.location.href = "index.html"; // redirige al CRUD
  } catch (error) {
    alert("Error: " + error.message);
  }
};