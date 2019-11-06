const db = require("../db");

module.exports = app => {
  app.get("/status", (req, res) => {
    res.sendStatus(200);
  });

  app.get("/all", (req, res) =>
    (async () => {
      try {
        let query = db.collection("items");
        let response = [];
        await query.get().then(querySnapshot => {
          let docs = querySnapshot.docs;
          for (let doc of docs) {
            const selectedItem = {
              id: doc.id,
              item: doc.data().item
            };
            response.push(selectedItem);
          }
        });
        return res.status(200).send(response);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    })()
  );
};
