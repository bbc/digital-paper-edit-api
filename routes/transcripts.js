const path = require('path');
const cuid = require('cuid');
const formidable = require('formidable');
const logger = require('../lib/logger.js');

const db = require('../dbWrapper/index.js');

// const data = require('../sample-data/transcripts.sample.json');

// const sampleTranscriptKate = require('../sample-data/transcripts/kate.transcript.sample.json');
// const sampleTranscriptMorgan = require('../sample-data/transcripts/morgan.transcript.sample.json');
// const sampleTranscriptIvan = require('../sample-data/transcripts/ivan.transcript.sample.json');
// const sampleTranscriptInProgress = require('../sample-data/transcripts/in-progress.transcript.sample.json');

// const sampleTranscripts = [ sampleTranscriptKate, sampleTranscriptMorgan, sampleTranscriptIvan, sampleTranscriptInProgress ];

module.exports = (app) => {
  app.post('/api/projects/:projectId/transcripts', (req, res, next) => {
    const projectId = req.params.projectId;
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '..', 'tmpMedia');
    form.keepExtensions = true;
    form.keepFilenames = true; // TODO: this `keepFilenames` does not seem to work, flag in that issue?
    form.type = 'multipart';

    form
      .on('fileBegin', (name, file) => {
        file.path = path.join(form.uploadDir, file.name);
      })
      .on('error', (err) => {
        logger.error(`Job failed: project ${ projectId }, due to ${ err }`);

        return next(err);
      })
      .on('aborted', (err) => {
        logger.error(`Aborted job for project ${ projectId }, due to ${ err }`);

        return next(err);
      });

    form.parse(req, (err, fields) => {
      logger.info(`INFO: Fields: ${ fields }`);

      const newTranscriptData = {
        projectId,
        title: fields.title,
        description: fields.description,
        // id: newTranscriptId,
        url: null,
        status: 'in-progress',
      };

      const newTranscript = db.create('transcripts', newTranscriptData);
      const newTranscriptId = newTranscript._id;
      newTranscript.id = newTranscriptId;
      logger.info(`POST: transcript ${ newTranscriptId } for project ${ projectId }`);
      res.status(201).json({ status: 'ok', transcript: newTranscript });
    });
  });

  app.get('/api/projects/:projectId/transcripts', (req, res) => {
    const projectId = req.params.projectId;
    const data = {};

    data.transcripts = db.getAll('transcripts', { projectId });

    console.log('data.transcripts', data.transcripts);
    if (data.transcripts) {
      // data.transcripts = [ data.transcripts ];
      data.transcripts = data.transcripts
      // Temporary workaround.
        .map((transcript) => {
          transcript.id = transcript._id;

          return transcript;
        });
    } else {
      data.transcripts = [];
    }
    logger.info(`GET: transcripts for project ${ projectId }`);
    res.status(200).json(data);
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    // const transcript = sampleTranscripts.find(t => t.id === transcriptId);
    const transcript = db.get('transcripts', { _id: transcriptId, projectId });

    if (!transcript) {
      const err = new Error('No transcript found');
      err.statusCode = 404;
      logger.error(`${ err.statusCode }: Transcript ${ transcriptId } not found for project ${ projectId }`);

      return next(err);
    }

    transcript.id = transcript._id;

    logger.info(`GET — Transcript ${ transcriptId } from project ${ projectId }`);

    return res.status(200).json(transcript);
  });

  app.put('/api/projects/:projectId/transcripts/:transcriptId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    console.log('app.put', req.body);
    const updatedTranscript = {
      // projectId,
      title: req.body.title,
      description: req.body.description,
    };
    if (req.body.words) {
      updatedTranscript.transcript = {};
      updatedTranscript.transcript.words = req.body.words;
      if (req.body.paragraphs) {
        updatedTranscript.transcript.paragraphs = req.body.paragraphs;
      }
    }

    const updated = db.update('transcripts', { _id: transcriptId }, updatedTranscript);
    console.log(updated);
    console.log('updatedTranscript', updatedTranscript);
    updatedTranscript.id = updatedTranscript._id;
    logger.info(`PUT — Update Transcript ${ transcriptId } for project ${ projectId }`);
    res.status(200).json({ transcript: updatedTranscript });
  });

  app.delete('/api/projects/:projectId/transcripts/:transcriptId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    // data.transcripts = data.transcripts.filter(t => t.id !== transcriptId);
    db.delete('transcripts', { _id: transcriptId, projectId });
    logger.info(`DELETE - Transcript ${ transcriptId } from project ${ projectId }`);
    res.status(204).json({ status: 'ok', message: `DELETE: transcript ${ transcriptId }` });
  });
};
