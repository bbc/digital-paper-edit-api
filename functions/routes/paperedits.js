const cuid = require("cuid");

const {
  getCollection,
  getItem,
  deleteItem,
  putItem,
  postItem
} = require("../db");
const data = require("../sample-data/paper-edits.sample.json");
const samplePaperEdit = require("../sample-data/programme-script.sample.json");

module.exports = app => {
  app.post("/api/projects/:projectId/paperedits", (req, res) => {
    const paperedit = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date()
    };

    data.paperedits.push(paperedit);

    console.log(`POST: Paper edits for project ${req.params.projectId}`);
    res.status(201).json({
      status: "ok",
      paperedit
    });
  });

  app.get("/api/projects/:projectId/paperedits", (req, res) => {
    res.status(200).json({
      status: "ok",
      paperedits: data.paperedits
    });
  });

  app.get(
    "/api/projects/:projectId/paperedits/:paperEditId",
    (req, res, next) => {
      const paperEditId = req.params.paperEditId;

      const paperEdit = data.paperedits.find(p => p.id === paperEditId);

      if (!paperEdit) {
        const err = new Error("No paper edit found");
        err.statusCode = 404;

        return next(err);
      }

      console.log(`GET: Paper edits for project ${req.params.projectId}`);

      return res.status(200).json({
        status: "ok",
        programmeScript: samplePaperEdit.programmeScript
      });
    }
  );

  app.put("/api/projects/:projectId/paperedits/:paperEditId", (req, res) => {
    const paperEditId = req.params.paperEditId;

    const paperEdit = {
      id: paperEditId,
      title: req.body.title,
      description: req.body.description
    };

    const paperEditIndex = data.paperedits.findIndex(
      item => item.id === paperEditId
    );
    data.paperedits[paperEditIndex] = paperEdit;

    console.log(
      `PUT: Modify paper edit ${req.params.paperEditId} for project ${req.params.projectId}`
    );
    res.status(200).json({
      status: "ok",
      paperedit: paperEdit
    });
  });

  app.delete("/api/projects/:projectId/paperedits/:paperEditId", (req, res) => {
    const paperEditId = req.params.paperEditId;

    const paperEditToDelete = data.paperedits.find(p => p.id === paperEditId);
    data.paperedits = data.paperedits.filter(
      p => p.id !== paperEditToDelete.id
    );

    console.log(
      `DELETE: Paper edit ${paperEditId} for project ${req.params.projectId}`
    );
    res.status(204).json({ status: "ok" });
  });
};
