import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDXz1OzOKDnNOdATAvJUYp_YP0L93OF75c",
  authDomain: "coppel-conecta-hackathon.firebaseapp.com",
  projectId: "coppel-conecta-hackathon",
  storageBucket: "coppel-conecta-hackathon.firebasestorage.app",
  messagingSenderId: "912623813304",
  appId: "1:912623813304:web:3202eacee354c28a7a6a4d",
  measurementId: "G-6RRBTKQ14E"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 👇 Aplica long polling SOLO si aún no se ha inicializado
try {
  initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch (e) {
  // Firebase lanza error si ya fue inicializado. Lo ignoramos de forma segura.
  console.warn("Firestore ya fue inicializado.");
}

// Obtenemos la instancia ya configurada
import { getFirestore as getFirestoreInstance } from 'firebase/firestore';
const db = getFirestoreInstance(app);

export { auth, db };
