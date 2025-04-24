const Tesseract = require('tesseract.js');
const { validateCURP } = require('./validations');

exports.processImage = async (imageBuffer) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imageBuffer, 'spa', {
      logger: m => console.log(m)
    });
    return validateCURP(text);
  } catch (error) {
    console.error('OCR Error:', error);
    return null;
  }
};