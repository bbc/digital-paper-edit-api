const admin = require("firebase-admin");
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://digital-paper-edit.firebaseio.com"
});

const db = admin.firestore();
module.exports = db;
