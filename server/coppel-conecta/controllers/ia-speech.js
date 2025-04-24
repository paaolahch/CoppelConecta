// Este archivo contiene la lógica para generar un speech personalizado utilizando IA y TensorFlow.js
const tf = require('@tensorflow/tfjs-node');
const { db } = require('../config/firebase-config');

// Cargar modelo de TensorFlow (debe de estar  previamente entrenado)
let modelo;
(async function cargarModelo() {
  modelo = await tf.loadLayersModel('file://./modelos/speech-model/model.json');
})();

async function generarSpeech(cobradorId, tipoNegocio) {
  try {
    // Obtener datos del cobrador
    const cobradorDoc = await db.collection('cobradores').doc(cobradorId).get();
    if (!cobradorDoc.exists) {
      throw new Error('Cobrador no encontrado');
    }
    const cobrador = cobradorDoc.data();

    // Preprocesar datos para el modelo
    const inputTensor = tf.tensor2d([
      [/* características del cobrador y tipo de negocio */]
    ]);

    // Generar predicción
    const prediccion = modelo.predict(inputTensor);
    const resultado = prediccion.dataSync();

    // Plantilla base del speech
    let speech = `Hola, soy ${cobrador.nombre}, representante de Coppel Emprende. `;
    speech += `Noté que su negocio ${tipoNegocio} podría beneficiarse de nuestros programas...`;

    return {
      speech,
      sugerencias: resultado // Podemos usar esto para personalizar más el speech
    };
  } catch (error) {
    console.error('Error al generar speech:', error);
    throw error;
  }
}

module.exports = { generarSpeech };