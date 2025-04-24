//conexion a la API de Google Maps para buscar negocios cercanos
const express = require('express');
const router = express.Router();
const { buscarNegociosCercanos } = require('../services/maps');

router.get('/cercanos', async (req, res) => {
  try {
    const { latitud, longitud, radio } = req.query;
    const negocios = await buscarNegociosCercanos(
      parseFloat(latitud),
      parseFloat(longitud),
      parseInt(radio) || 500
    );
    res.json(negocios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;