const cuid = require('cuid');

const knex = require('../knex/knex');
const logger = require('../lib/logger');
const date = require('../lib/utils').postgresDate;

const TABLE = 'Annotations';

module.exports = (app) => {
  app.post('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res, next) => {
    const newAnnotation = req.body;
    newAnnotation.id = cuid();

    knex(TABLE)
      .insert(newAnnotation)
      .then(() => {
        logger.info(`POST: New annotation ${ newAnnotation.id }`);
        res.status(201).json({ status: 'OK', newAnnotation });
      }).catch((err) => {
        logger.error(`DB error - annotations - ${ err }`);

        return next(err);
      });
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    logger.info(`GET: Annotations for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({
      ...data,
    });
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;

    const annotationIndex = data.annotations.findIndex(item => item.id === annotationId);
    const annotation = data.annotations[annotationIndex];

    logger.info(`GET: Annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json( { annotation });
  });

  app.put('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    const updatedAnnotation = req.body;

    const annotationIndex = data.annotations.findIndex(item => item.id === annotationId);
    data.annotations[annotationIndex] = updatedAnnotation;

    logger.info(`PUT: Edit annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({ status: 'ok', annotation: updatedAnnotation });
  });

  app.delete('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;

    data.annotations = data.annotations.filter(item => item.id !== annotationId);

    logger.info(`DELETE: Annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({ status: 'ok' });
  });
};
