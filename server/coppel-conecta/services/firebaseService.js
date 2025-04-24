const admin = require('firebase-admin');
const tesseract = require('tesseract.js');

// Inicializar Firebase
const serviceAccount = require('../config/firebase-config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project.firebaseio.com'
});

const db = admin.firestore();

exports.processImage = async (imageBuffer) => {
  const result = await tesseract.recognize(imageBuffer, 'spa', {
    logger: m => console.log(m)
  });
  return result.data.text;
};

exports.saveToFirebase = async (collection, data) => {
  const docRef = await db.collection(collection).add(data);
  return { id: docRef.id };
};

exports.getUserCURPs = async (userId) => {
  const snapshot = await db.collection('curps')
    .where('userId', '==', userId)
    .get();
  
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};