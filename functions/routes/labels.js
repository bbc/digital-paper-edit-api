const cuid = require("cuid");

const {
  getCollection,
  getItem,
  deleteItem,
  updateItem,
  postItem
} = require("../db");
const data = require("../sample-data/labels.sample.json");

module.exports = app => {
  app.post("/api/projects/:projectId/labels", (req, res) => {
    const newLabel = req.body;
    newLabel.id = cuid();

    const projectId = req.params.projectId;
    data.labels.push(newLabel);

    console.log(`POST: Label ${newLabel.id} for project ${projectId}`);
    res.status(201).json({ status: "ok", labels: data.labels });
  });

  app.get("/api/projects/:projectId/labels", (req, res) => {
    const projectId = req.params.projectId;

    console.log(`GET: Labels for project ${projectId}`);
    res.status(200).json({ status: "ok", labels: data.labels });
  });

  app.get("/api/projects/:projectId/labels/:labelId", (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    const annotationIndex = data.labels.findIndex(item => item.id === labelId);
    const label = data.labels[annotationIndex];

    console.log(`GET: Label ${labelId} for project ${projectId}`);
    res.status(200).json({ label });
  });

  app.put("/api/projects/:projectId/labels/:labelId", (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    const updatedLabel = req.body;
    console.log(`PUT: Label ${labelId} for project ${projectId}`);

    const labelIndex = data.labels.findIndex(item => item.id === labelId);
    data.labels[labelIndex] = updatedLabel;

    console.log(`PUT: Edit label ${labelId} for project ${projectId}`);
    res.status(200).json({ status: "ok", labels: data.labels });
  });

  app.delete("/api/projects/:projectId/labels/:labelId", (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    data.labels = data.labels.filter(l => l.id !== labelId);

    console.log(`DELETE: Label ${labelId} for project ${projectId}`);
    res.status(200).json({ status: "ok", labels: data.labels });
  });
};
