// services/authServices.ts

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from './firebase/firebaseConfig';

type UserData = {
  name: string;
  numEmployee: string;
  sucursal: string;
  email: string;
  password: string;
  confirmPassword: string; // este no se guarda
  postalCode: string;
  phoneNumber: string;
  acceptedTerms: boolean;
};

// Registro de usuario
export async function registerUserWithData(userData: UserData): Promise<string> {
  const {
    email,
    password,
    numEmployee,
    confirmPassword, // omitimos este campo
    name,
    sucursal,
    postalCode,
    phoneNumber,
    acceptedTerms,
  } = userData;

  try {
    console.log("🚀 Iniciando registro con email:", email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    console.log("✅ Usuario creado en Auth con UID:", uid);

    const userDataToSave = {
      uid,
      email,
      employeeNum: numEmployee,
      name,
      sucursal,
      postalCode,
      phoneNumber,
      acceptedTerms,
      createdAt: new Date(),
    };

    console.log("📤 Datos a guardar en Firestore:", userDataToSave);

    const docRef = await addDoc(collection(db, 'users'), userDataToSave);
    console.log("📦 Documento Firestore creado con ID:", docRef.id);

    return uid;

  } catch (error: any) {
    console.error("❌ Error en registerUserWithData:", error);

    if (error.code === 'auth/email-already-in-use') {
      throw new Error("El correo ya está registrado.");
    }

    if (error.code === 'auth/weak-password') {
      throw new Error("La contraseña debe tener al menos 6 caracteres.");
    }

    throw new Error("No se pudo completar el registro.");
  }
}

// Inicio de sesión por número de empleado
export async function loginWithEmployeeNum(employeeNum: string, password: string): Promise<string> {
  try {
    const q = query(collection(db, 'users'), where('employeeNum', '==', employeeNum));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("No se encontró un usuario con ese número de empleado.");
    }

    const userDoc = querySnapshot.docs[0];
    const email = userDoc.data().email;

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("✅ Inicio de sesión exitoso con UID:", userCredential.user.uid);
    return userCredential.user.uid;

  } catch (error: any) {
    console.error("❌ Error en loginWithEmployeeNum:", error);

    if (error.code === 'auth/wrong-password') {
      throw new Error("Contraseña incorrecta.");
    }

    if (error.code === 'auth/user-not-found') {
      throw new Error("Usuario no encontrado.");
    }

    throw new Error("No se pudo iniciar sesión.");
  }
}

// Cierre de sesión
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
    console.log("👋 Sesión cerrada correctamente.");
  } catch (error: any) {
    console.error("❌ Error al cerrar sesión:", error);
    throw new Error("Error al cerrar sesión.");
  }
}
