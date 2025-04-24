const axios = require('axios');
const { db, FieldValue } = require('../config/firebase-config');

const PYRHON_API_URL = 'http://localhost:5000';

async function recomendarCurso(tipoNegocio){
  const response = await axios.post(`${PYRHON_API}/recomendar`, { Tipo_negocio : tipoNegocio });
 return response.data.cursos; 
}

const tesseract = require('tesseract.js');
const { validateCURP } = require('../validations/cobrador');

// Procesar imagen para extraer CURP
exports.processImage = async (imageBuffer) => {
  try {
    const { data: { text } } = await tesseract.recognize(imageBuffer, 'spa', {
      logger: m => console.log(m)
    });
    return validateCURP(text);
  } catch (error) {
    console.error('Error en OCR:', error);
    return null;
  }
};

// Guardar CURP en Firestore
exports.saveCURP = async (data) => {
  try {
    const docRef = await firestore.collection('curps').add({
      ...data,
      fechaRegistro: new Date().toISOString()
    });
    return { id: docRef.id };
  } catch (error) {
    console.error('Error al guardar en Firestore:', error);
    throw error;
  }
};

//asignarPuntos Se mantendra igual

module.exports = { recomendarCurso,asignarPuntos };