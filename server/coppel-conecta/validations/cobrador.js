// controllers/cobradores.js
const { db, auth } = require('./config/firebase-config');
const validarCobrador = require('./validations/cobrador');

const cobradoresController = {
  registrar: async (req, res) => {
    try {
      const datos = req.body;
      
      // Validar datos
      const errores = await validarCobrador.registro(datos);
      if (errores) return res.status(400).json({ errores });
      
      // Crear usuario en Firebase Auth
      const usuario = await auth.createUser({
        email: datos.email,
        password: datos.password || 'tempPassword123',
        displayName: datos.nombre
      });
      
      // Guardar en Firestore
      const cobradorRef = await db.collection('cobradores').doc(usuario.uid).set({
        ...datos,
        fechaRegistro: new Date(),
        activo: true
      });
      
      res.status(201).json({ id: usuario.uid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  obtenerPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const doc = await db.collection('cobradores').doc(id).get();
      
      if (!doc.exists) {
        return res.status(404).json({ error: 'Cobrador no encontrado' });
      }
      
      res.json({ id: doc.id, ...doc.data() });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = cobradoresController;
//para validar el curp
const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]{2}$/;

exports.validateCURP = (text) => {
  const candidates = text.match(/[A-Z0-9]{18}/g) || [];
  const validCURP = candidates.find(c => CURP_REGEX.test(c));
  return validCURP ? validCURP.toUpperCase() : null;
};

module.exports = {
  ...require('./cobrador'),
  validateCURP
};