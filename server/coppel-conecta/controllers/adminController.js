const { db } = require('../config/firebase-config');

// Obtener todos los cobradores por sucursal
const getCobradoresBySucursal = async (sucursal) => {
  const snapshot = await db.collection('cobradores')
    .where('sucursal', '==', sucursal)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener emprendimientos por cobrador
const getEmprendimientosByCobrador = async (cobradorId) => {
  const snapshot = await db.collection('emprendimientos')
    .where('referidoPor', '==', cobradorId)
    .get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Obtener estadísticas de un cobrador
const getStatsCobrador = async (cobradorId) => {
  const emprendimientos = await getEmprendimientosByCobrador(cobradorId);
  const cobradorDoc = await db.collection('cobradores').doc(cobradorId).get();
  const cobrador = cobradorDoc.data();

  return {
    nombre: cobrador.nombre,
    puntos: cobrador.puntos || 0,
    totalEmprendimientos: emprendimientos.length,
    progresoPremios: (cobrador.puntos / 1000) * 100, // Ejemplo: 1000 pts = 100%
    sucursal: cobrador.sucursal
  };
};

// Obtener detalle de emprendedor
const getEmprendedorDetail = async (emprendedorId) => {
  const doc = await db.collection('emprendimientos').doc(emprendedorId).get();
  const cursosSnapshot = await db.collection('cursosCompletados')
    .where('emprendedorId', '==', emprendedorId)
    .get();

  return {
    ...doc.data(),
    cursosCompletados: cursosSnapshot.docs.map(doc => doc.data().nombreCurso),
    progreso: cursosSnapshot.size / 5 * 100 // Ejemplo: 5 cursos = 100%
  };
};

module.exports = {
  getCobradoresBySucursal,
  getEmprendimientosByCobrador,
  getStatsCobrador,
  getEmprendedorDetail
};