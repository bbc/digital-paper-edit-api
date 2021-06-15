// const cuid = require('cuid');

const logger = require('../lib/logger.js');
const db = require('../dbWrapper/index.js');

module.exports = (app) => {
  app.post('/api/projects/:projectId/labels', (req, res) => {
    const projectId = req.params.projectId;
    // const newLabelData = req.body;
    const newLabelData = {
      ...req.body,
      projectId,
    };
    // newLabelData.projectId = projectId;
    delete newLabelData.id;
    const newLabel = db.create('labels', newLabelData);
    const labelId = newLabel._id;
    newLabel.id = labelId;
    // temporary workaround to update the id
    const updated = db.update('labels', { _id: labelId, projectId }, newLabelData);
    // TODO: clint requires to send all the ids back
    // when a new one is created - this should be refactored
    const labels = db.getAll('labels', { projectId });

    // Adds default label
    const defaultLabel = db.get('labels', { _id: 'default' });
    labels.unshift(defaultLabel);

    logger.info(`POST: Label ${ newLabel.id } for project ${ projectId }`);
    // TODO: does the post labels need to return all the labels?
    // does the client side logic needs to be adjusted?
    res.status(201).json({ status: 'ok', labels });
  });

  app.get('/api/projects/:projectId/labels', (req, res) => {
    const projectId = req.params.projectId;

    let labels = db.getAll('labels', { projectId });
    // if (labels) {
    //   // Temporary workaround.
    //   labels.map((label) => {
    //     label.id = label._id;

    //     return label;
    //   });
    // } else {
    //   labels = [];
    // }
    if (!labels) {
      labels = [];
    }
    // Adds default label
    const defaultLabel = db.get('labels', { _id: 'default' });
    labels.unshift(defaultLabel);
    console.log(labels);
    logger.info(`GET: Labels for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels });
  });

  app.get('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    const label = db.get('labels', { _id: labelId, projectId });

    logger.info(`GET: Label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ label });
  });

  app.put('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    const labelData = req.body;
    logger.info(`PUT: Label ${ labelId } for project ${ projectId }`);

    const updated = db.update('labels', { _id: labelId, projectId }, labelData);
    console.log(updated);
    const labels = db.getAll('labels', { projectId });

    // Adds default label
    const defaultLabel = db.get('labels', { _id: 'default' });
    labels.unshift(defaultLabel);

    logger.info(`PUT: Edit label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels });
  });

  app.delete('/api/projects/:projectId/labels/:labelId', (req, res) => {
    const projectId = req.params.projectId;
    const labelId = req.params.labelId;

    // data.labels = data.labels.filter(l => l.id !== labelId);
    db.delete('labels', { _id: labelId, projectId });

    const labels = db.getAll('labels', { projectId });
    // Adds default label
    const defaultLabel = db.get('labels', { _id: 'default' });
    labels.unshift(defaultLabel);

    logger.info(`DELETE: Label ${ labelId } for project ${ projectId }`);
    res.status(200).json({ status: 'ok', labels });
  });
};
