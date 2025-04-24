const { processImage } = require('../services/firebaseService');
const { validateCURP } = require('../validations/curp');

exports.detectCURP = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Procesar imagen con Tesseract
    const text = await processImage(req.file.buffer);
    
    // Validar y extraer CURP
    const curp = validateCURP(text);
    
    if (!curp) {
      return res.status(400).json({ error: 'No valid CURP found in image' });
    }

    res.json({ curp });
  } catch (error) {
    console.error('Error detecting CURP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.saveCURP = async (req, res) => {
  try {
    const { curp, userId, additionalData } = req.body;
    
    if (!curp || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Guardar en Firebase
    const result = await saveToFirebase('curps', {
      curp,
      userId,
      ...additionalData,
      timestamp: new Date().toISOString()
    });

    res.json({ success: true, id: result.id });
  } catch (error) {
    console.error('Error saving CURP:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};