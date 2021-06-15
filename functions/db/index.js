const admin = require("firebase-admin");
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://digital-paper-edit.firebaseio.com"
});

const db = admin.firestore();

const getCollection = async collection => {
  let query = db.collection(collection);
  const querySnapshot = await query.get();
  let docs = querySnapshot.docs;
  return docs.map(doc => {
    let data = doc.data();
    data.id = doc.id;
    return data;
  });
};

const getItem = async (collection, id) => {
  const document = db.collection(collection).doc(id);
  let item = await document.get();
  return item.data();
};

const postItem = async (collection, data) => {
  await db
    .collection(collection)
    .doc("/" + cuid() + "/")
    .create(data);
};

const putItem = async (collection, id, data) => {
  await db
    .collection(collection)
    .doc(id)
    .update(data);
};

const deleteItem = async (collection, id) => {
  await db
    .collection(collection)
    .doc(id)
    .delete();
};

module.exports = {
  db,
  getCollection,
  getItem,
  postItem,
  putItem,
  deleteItem
};
