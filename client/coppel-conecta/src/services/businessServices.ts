import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';

export async function registerBusiness(data: {
  name: string;
  location: string;
  giro: string;
  ingreso: string;
  fechaApertura: string;
  telefono: string;
  propietario: string;
}) {
  try {
    const docRef = await addDoc(collection(db, 'negocios'), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('❌ Error al guardar el negocio:', error);
    throw new Error('No se pudo registrar el negocio.');
  }
}
