// validacion de los datos de los cobradores para el login
//tracking y el login de los cobradores
//controllers/cobradores.js
const { db, FieldValue } = require('../config/firebase-config');

// Registro con tracking automático
const registrarCobrador = async (req, res) => {
  const { nombre, email, ruta, zona } = req.body;
  
  try {
    // Generar ID de 6 dígitos
    const cobradorId = Math.floor(100000 + Math.random() * 900000).toString();
    
    await db.collection('cobradores').doc(cobradorId).set({
      nombre,
      email,
      cobradorId, // <- ID único
      ruta,
      zona,
      puntos: 0,
      registros: [],
      ultimoLogin: FieldValue.serverTimestamp()
    });

    res.status(201).json({ cobradorId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener registros del cobrador
const obtenerRegistros = async (req, res) => {
  const { cobradorId } = req.params;

  try {
    const snapshot = await db.collection('registros')
      .where('cobradorId', '==', cobradorId)
      .get();

    const registros = snapshot.docs.map(doc => doc.data());
    res.json(registros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registrarCobrador, obtenerRegistros };