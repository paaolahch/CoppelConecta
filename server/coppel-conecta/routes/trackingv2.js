const express = require('express');
const router = express.Router();
const { db, FieldValue } = require('../config/firebase-config');
const { recomendarCurso } = require('../controllers/ia-cursos');

// Ruta para registrar una visita de un cobrador
router.post('/visita', async (req, res) => {
  try {
    const { cobradorId, negocioId } = req.body;

    await db.collection('visitas').add({
      cobradorId,
      negocioId,
      timestamp: FieldValue.serverTimestamp()
    });

    const cursoRecomendado = await recomendarCurso(cobradorId, negocioId);

    res.json({ mensaje: 'Visita registrada', cursoRecomendado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar visita' });
  }
});

// Ruta para obtener métricas del cobrador
router.get('/metricas/:cobradorId', async (req, res) => {
  try {
    const cobradorId = req.params.cobradorId;
    const snapshot = await db.collection('visitas').where('cobradorId', '==', cobradorId).get();

    res.json({ totalVisitas: snapshot.size });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener métricas' });
  }
});

module.exports = router;
