//sistema de puntos 
// services/gamificacion.js

const { db, FieldValue } = require('../config/firebase-config');

const PUNTOS_POR_ACCION = {
  REGISTRO_NEGOCIO: 20,
  CURSO_COMPLETADO: 30,
  REFERENCIA_EXITOSA: 50
};

async function actualizarPuntos(cobradorId, accion) {
  const puntos = PUNTOS_POR_ACCION[accion] || 10;

  await db.collection('cobradores').doc(cobradorId).update({
    puntos: FieldValue.increment(puntos),
    [`estadisticas.${accion}`]: FieldValue.increment(1)
  });
}

// Leaderboard
async function obtenerRanking() {
  const snapshot = await db.collection('cobradores')
    .orderBy('puntos', 'desc')
    .limit(10)
    .get();

  return snapshot.docs.map(doc => doc.data());
}

module.exports = { actualizarPuntos, obtenerRanking };