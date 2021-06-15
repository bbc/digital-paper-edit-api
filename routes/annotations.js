const logger = require('../lib/logger.js');
const db = require('../dbWrapper/index.js');

module.exports = (app) => {
  app.post('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const newAnnotationData = {
      projectId,
      transcriptId,
      ...req.body,
    };

    const newAnnotation = db.create('annotations', newAnnotationData);
    newAnnotation.id = newAnnotation._id;

    logger.info({ status: 201, request: 'POST', message: `New annotation ${ newAnnotation.id } created for transcript ${ req.params.transcriptId } in project ${ req.params.projectId }` });
    res.status(201).json({ status: 'ok', annotation: newAnnotation });
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    let annotations = db.getAll('annotations', { projectId, transcriptId });
    console.log(annotations);
    if (annotations) {
      annotations = annotations
      // Temporary workaround.
        .map((annotation) => {
          annotation.id = annotation._id;

          return annotation;
        });
    } else {
      annotations = [];
    }
    logger.info(`GET: Annotations for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({ annotations });
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;

    const annotation = db.get('annotations', { _id: annotationId, projectId, transcriptId });//
    console.log('annotation', annotation);
    if (!annotation) {
      const err = new Error('No annotation found');
      err.statusCode = 404;

      return next(err);
    }
    logger.info(`GET: Annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json( { annotation });
  });

  app.put('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;
    const annotationData = {
      _id: annotationId,
      transcriptId,
      projectId,
      ...req.body,
    };

    db.update('annotations', { _id: annotationId, projectId, transcriptId }, annotationData);

    logger.info(`PUT: Edit annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({ status: 'ok', annotation: annotationData });
  });

  app.delete('/api/projects/:projectId/transcripts/:transcriptId/annotations/:annotationId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    const annotationId = req.params.annotationId;

    db.delete('annotations', { _id: annotationId, projectId, transcriptId });

    logger.info(`DELETE: Annotation ${ annotationId } for transcript ${ transcriptId } in project ${ projectId }`);
    res.status(200).json({ status: 'ok' });
  });
};
