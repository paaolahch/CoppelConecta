//Rutas de Monitoreo y Registro de Visitas
// coppelConecta/routes/tracking.js
const express = require('express');
const router = express.Router();
const { db, FieldValue } = require('../config/firebase-config');

// Registrar visita a negocio
router.post('/visita', async (req, res) => {
  const { cobradorId, negocioId, tipoNegocio } = req.body;

  try {
    // 1. Registrar visita
    await db.collection('registros').add({
      cobradorId,
      negocioId,
      fecha: FieldValue.serverTimestamp(),
      tipoNegocio
    });

    // 2. Actualizar stats del cobrador
    await db.collection('cobradores').doc(cobradorId).update({
      registros: FieldValue.arrayUnion(negocioId)
    });

    // 3. Recomendar curso
    const cursos = await recomendarCurso(tipoNegocio);

    res.json({ 
      success: true,
      cursosRecomendados: cursos 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dashboard de métricas
router.get('/metricas/:cobradorId', async (req, res) => {
  const { cobradorId } = req.params;

  try {
    const cobradorRef = await db.collection('cobradores').doc(cobradorId).get();
    const registrosSnapshot = await db.collection('registros')
      .where('cobradorId', '==', cobradorId)
      .get();

    const metricas = {
      perfil: cobradorRef.data(),
      totalVisitas: registrosSnapshot.size,
      ultimasVisitas: registrosSnapshot.docs.map(doc => doc.data())
    };

    res.json(metricas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;