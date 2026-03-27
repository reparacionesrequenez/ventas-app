import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

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

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function obtenerCampos() {
  const email = document.getElementById("email")?.value.trim() || "";
  const password = document.getElementById("password")?.value || "";
  return { email, password };
}

function mostrarMensaje(texto, tipo = "info") {
  const caja = document.getElementById("mensaje");
  if (!caja) {
    alert(texto);
    return;
  }
  caja.textContent = texto;
  caja.className = `mensaje mensaje-${tipo}`;
}

function traducirError(codigo) {
  const errores = {
    "auth/email-already-in-use": "Ese correo ya está registrado.",
    "auth/invalid-email": "El correo no es válido.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "Ese usuario no existe.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/missing-password": "Falta la contraseña.",
    "auth/network-request-failed": "Error de red. Revisa tu conexión."
  };
  return errores[codigo] || `Ocurrió un error: ${codigo}`;
}

window.registrar = async () => {
  const { email, password } = obtenerCampos();

  if (!email || !password) {
    mostrarMensaje("Completa correo y contraseña.", "error");
    return;
  }

  if (!validarEmail(email)) {
    mostrarMensaje("Ingresa un correo válido.", "error");
    return;
  }

  if (password.length < 6) {
    mostrarMensaje("La contraseña debe tener al menos 6 caracteres.", "error");
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    mostrarMensaje("Usuario registrado correctamente. Redirigiendo...", "ok");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  } catch (error) {
    mostrarMensaje(traducirError(error.code), "error");
  }
};

window.login = async () => {
  const { email, password } = obtenerCampos();

  if (!email || !password) {
    mostrarMensaje("Completa correo y contraseña.", "error");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    mostrarMensaje("Inicio de sesión correcto. Entrando...", "ok");
    setTimeout(() => {
      window.location.href = "ventas.html";
    }, 900);
  } catch (error) {
    mostrarMensaje(traducirError(error.code), "error");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const password = document.getElementById("password");
  if (password) {
    password.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (document.title.toLowerCase().includes("login")) {
          window.login();
        } else if (document.title.toLowerCase().includes("registro")) {
          window.registrar();
        }
      }
    });
  }
});