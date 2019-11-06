const cuid = require("cuid");
const { getCollection, getItem } = require("../db");
const data = require("../sample-data/projects.sample.json");

COLLECTION = "projects";

module.exports = app => {
  app.post("/api/projects", async (req, res) => {
    const project = {
      title: req.body.title,
      description: req.body.description,
      id: cuid(),
      created: Date()
    };

    data.projects.push(project);

    console.log(`POST: New project ${project.id}`);
    res.status(201).json({ status: "ok", project });
  });

  app.get("/api/projects", async (req, res) => {
    let response = await getCollection(COLLECTION);
    return res.status(200).send(response);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const projectId = req.params.id;
    const project = await getItem(COLLECTION, projectId);
    res.status(200).json({ project });
  });

  app.put("/api/projects/:projectId", (req, res) => {
    const projectId = req.params.projectId;

    const newProject = {
      id: projectId,
      title: req.body.title,
      description: req.body.description
    };

    const projectIndex = data.projects.findIndex(item => item.id === projectId);
    data.projects[projectIndex] = newProject;

    console.log(`PUT: Edit project id ${req.params.projectId}`);
    res.status(200).json({ status: "ok", project: newProject });
  });

  app.delete("/api/projects/:projectId/", (req, res) => {
    const projectId = req.params.projectId;

    const projectToDelete = data.projects.find(p => p.id === projectId);
    data.projects = data.projects.filter(p => p.id !== projectToDelete.id);

    console.log(`DELETE: Project id ${projectId}`);
    res.status(204).json({ status: "ok" });
  });
};
