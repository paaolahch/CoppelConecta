// config/firebase-config.js <- es la carpeta y el acomodo
var admin = require("firebase-admin");

var serviceAccount = require("./coppel-conecta-hackathon-firebase-adminsdk-fbsvc-feb1ad795d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coppelconecta.firebase.com"
});

const db = admin.firestore();
const auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

module.exports = { db, auth, FieldValue };