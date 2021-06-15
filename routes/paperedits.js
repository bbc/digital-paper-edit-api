const logger = require('../lib/logger.js');
const db = require('../dbWrapper/index.js');

module.exports = (app) => {
  app.post('/api/projects/:projectId/paperedits', (req, res) => {
    const projectId = req.params.projectId;
    const newPaperedtData = {
      projectId,
      title: req.body.title,
      description: req.body.description,
      elements: [],
      created: Date(),
    };

    const newPaperedt = db.create('paperedits', newPaperedtData);
    newPaperedt.id = newPaperedt._id;
    logger.info(`POST: Paper edits for project ${ req.params.projectId }`);
    res.status(201).json({ status: 'ok', paperedit: newPaperedt });
  });

  app.get('/api/projects/:projectId/paperedits', (req, res) => {
    const projectId = req.params.projectId;
    const data = {};
    data.paperedits = db.getAll('paperedits', { projectId });

    if (data.paperedits) {
      data.paperedits = data.paperedits
      // Temporary workaround.
        .map((paperedit) => {
          paperedit.id = paperedit._id;

          return paperedit;
        });
    } else {
      data.paperedits = [];
    }
    res.status(200).json({ status: 'ok', paperedits: data.paperedits });
  });

  app.get('/api/projects/:projectId/paperedits/:paperEditId', (req, res, next) => {
    const projectId = req.params.projectId;
    const paperEditId = req.params.paperEditId;

    const paperEdit = db.get('paperedits', { _id: paperEditId, projectId });
    if (!paperEdit) {
      const err = new Error('No paper edit found');
      err.statusCode = 404;

      return next(err);
    }

    logger.info(`GET: Paper edits for project ${ req.params.projectId }`);
    console.log(paperEdit);

    return res.status(200).json({ status: 'ok', programmeScript: paperEdit });
  });

  app.put('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
    const projectId = req.params.projectId;
    const paperEditId = req.params.paperEditId;

    const paperEditData = {
      id: paperEditId,
      title: req.body.title,
      description: req.body.description,
    };

    if (req.body.elements) {
      paperEditData.elements = req.body.elements;
    }

    const updated = db.update('paperedits', { _id: paperEditId, projectId }, paperEditData);
    console.log('updated', updated);
    logger.info(`PUT: Modify paper edit ${ req.params.paperEditId } for project ${ req.params.projectId }`);
    res.status(200).json({ status: 'ok', paperedit: paperEditData });
  });

  app.delete('/api/projects/:projectId/paperedits/:paperEditId', (req, res) => {
    const projectId = req.params.projectId;
    const paperEditId = req.params.paperEditId;

    db.delete('paperedits', { _id: paperEditId, projectId });

    logger.info(`DELETE: Paper edit ${ paperEditId } for project ${ req.params.projectId }`);
    res.status(204).json({ status: 'ok' });
  });
};
