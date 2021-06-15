// const cuid = require('cuid');
const logger = require('../lib/logger.js');

const db = require('../dbWrapper/index.js');
// const data = require('../sample-data/projects.sample.json');

module.exports = (app) => {
  app.post('/api/projects', (req, res) => {
    const projectData = {
      title: req.body.title,
      description: req.body.description,
      // ID created by the dbWrapper?
      // _id: cuid(),
      created: Date(),
    };
    const project = db.create('projects', projectData);
    // Temporary workaround.
    // otherwise would need to change all client side ids to be _id instead of id
    project.id = project._id;
    logger.info(`POST: New project ${ project._id }`);
    res.status(201).json({ status: 'ok', project });
  });

  app.get('/api/projects', (req, res) => {
    const data = {};
    data.projects = db.getAll('projects')
      // Temporary workaround.
      .map((project) => {
        project.id = project._id;

        return project;
      });
    // TODO: consider adding data to logs?
    logger.info('GET: Projects');
    res.status(200).json(data);
  });

  app.get('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const project = db.get('projects', { _id: projectId });
    // const project = data.projects.find(p => p._id === projectId);
    logger.info(`GET: Project id ${ req.params.projectId }`);
    res.status(200).json({ project });
  });

  app.put('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const newProject = {
      id: projectId,
      title: req.body.title,
      description: req.body.description,
    };

    db.update('projects', { _id: projectId }, newProject);

    logger.info(`PUT: Edit project id ${ req.params.projectId }`);
    res.status(200).json({ status: 'ok', project: newProject });
  });

  app.delete('/api/projects/:projectId/', (req, res) => {
    const projectId = req.params.projectId;

    db.delete('projects', { _id: projectId });

    logger.info(`DELETE: Project id ${ projectId }`);
    res.status(204).json({ status: 'ok', project: {} });
  });
};
