// routes/ia.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/speech', async (req, res) => {
  try {
    const { cobradorId, tipoNegocio } = req.query;
    const response = await axios.get('http://localhost:5000/generate-speech', {
      params: { cobradorId, tipoNegocio }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const { processImage, saveCURP } = require('../services/ia-cursos');

// Endpoint para detectar CURP
router.post('/detect-curp', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó imagen' });
    }

    const curp = await processImage(req.file.buffer);
    if (!curp) {
      return res.status(400).json({ error: 'No se detectó CURP válida' });
    }

    res.json({ curp });
  } catch (error) {
    console.error('Error al procesar CURP:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para guardar CURP
router.post('/save-curp', async (req, res) => {
  try {
    const { curp, userId, nombre } = req.body;
    
    if (!curp || !userId || !nombre) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const result = await saveCURP({ curp, userId, nombre });
    res.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Error al guardar CURP:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;