import {
    collection,
    getDocs,
    query,
    where,
    updateDoc,
    addDoc,
    serverTimestamp,
    doc,
    GeoPoint,
  } from 'firebase/firestore';
  import { db } from './firebase/firebaseConfig';
  
  type GeoUbicacion = {
    latitude: number;
    longitude: number;
  };
  
  type RouteData = {
    id_cobrador: string;
    lista_ubicaciones: GeoUbicacion[]; // recibimos array de coordenadas
    zona?: string;
  };

  type RutaExistente = {
    id: string;
    zona?: string;
    fechas_visita?: any[]; // puedes poner Date[] si sabes que serán timestamps o ajustar según el caso
  };
  
  // Convierte { latitude, longitude } => new GeoPoint()
  function toGeoPoints(coords: GeoUbicacion[]): GeoPoint[] {
    return coords.map(({ latitude, longitude }) => new GeoPoint(latitude, longitude));
  }
  
  // Busca si ya existe una ruta para el cobrador
  export async function getRutaPorCobrador(idCobrador: string) {
    const rutasRef = collection(db, 'rutas');
    const q = query(rutasRef, where('id_cobrador', '==', idCobrador));
    const snapshot = await getDocs(q);
  
    if (snapshot.empty) return null;
  
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
  
  // Guarda una nueva ruta o actualiza si ya existe
  export async function guardarRuta(data: RouteData) {
    const geoPoints = toGeoPoints(data.lista_ubicaciones);
    const rutaExistente = await getRutaPorCobrador(data.id_cobrador) as RutaExistente;
    if (rutaExistente) {
      // Si ya existe, actualizamos las ubicaciones
      const rutaRef = doc(db, 'rutas', rutaExistente.id);
      await updateDoc(rutaRef, {
        lista_ubicaciones: geoPoints,
        zona: data.zona || rutaExistente.zona,
        fechas_visita: [...(rutaExistente.fechas_visita || []), serverTimestamp()],
      });
      return rutaRef.id;
    } else {
      // Si no existe, creamos una nueva
      const docRef = await addDoc(collection(db, 'rutas'), {
        id_cobrador: data.id_cobrador,
        lista_ubicaciones: geoPoints,
        zona: data.zona || '',
        fechas_visita: [serverTimestamp()],
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    }
  }
  