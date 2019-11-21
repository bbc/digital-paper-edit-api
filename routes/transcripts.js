const path = require('path');
const cuid = require('cuid');
const formidable = require('formidable');

const logger = require('../lib/logger');
const knex = require('../knex/knex');
const date = require('../lib/utils').postgresDate;

const data = require('../sample-data/transcripts.sample.json');

const sampleTranscriptKate = require('../sample-data/transcripts/kate.transcript.sample.json');
const sampleTranscriptMorgan = require('../sample-data/transcripts/morgan.transcript.sample.json');
const sampleTranscriptIvan = require('../sample-data/transcripts/ivan.transcript.sample.json');
const sampleTranscriptInProgress = require('../sample-data/transcripts/in-progress.transcript.sample.json');

const sampleTranscripts = [ sampleTranscriptKate, sampleTranscriptMorgan, sampleTranscriptIvan, sampleTranscriptInProgress ];

const TABLE = 'Transcripts';

module.exports = (app) => {
  app.post('/api/projects/:projectId/transcripts', (req, res, next) => {
    const newTranscript = {
      id: cuid(),
      title: req.body.title,
      description: req.body.description,
      status: 'in-progress',
      project_id: req.params.projectId,
      data: {},
      speakers: {},
      created_at: date(),
      updated_at: date(),
    };

    knex(TABLE)
      .insert(newTranscript)
      .then(() => {
        logger.info('POST: New transcript', { newTranscript });

        res.status(201).json({ status: 'OK', newTranscript });
      }).catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        next(err);
      });
  });

  app.get('/api/projects/:projectId/transcripts', (req, res) => {
    const projectId = req.params.projectId;
    logger.info(`GET: transcripts for project ${ projectId }`);
    res.status(200).json(data);
  });

  app.get('/api/projects/:projectId/transcripts/:transcriptId', (req, res, next) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    const transcript = sampleTranscripts.find(t => t.id === transcriptId);

    if (!transcript) {
      const err = new Error('No transcript found');
      err.statusCode = 404;
      logger.error(`${ err.statusCode }: Transcript ${ transcriptId } not found for project ${ projectId }`);

      return next(err);
    }

    logger.info(`GET — Transcript ${ transcriptId } from project ${ projectId }`);

    return res.status(200).json(transcript);
  });

  app.put('/api/projects/:projectId/transcripts/:transcriptId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    const updatedTranscript = {
      id: projectId,
      title: req.body.title,
      description: req.body.description,
    };

    const transcriptIndex = data.transcripts.findIndex(item => item.id === transcriptId);
    data.transcripts[transcriptIndex] = updatedTranscript;

    logger.info(`PUT — New Transcript ${ transcriptId } for project ${ projectId }`);
    res.status(200).json({ transcript: updatedTranscript });
  });

  app.delete('/api/projects/:projectId/transcripts/:transcriptId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    data.transcripts = data.transcripts.filter(t => t.id !== transcriptId);

    logger.info(`DELETE - Transcript ${ transcriptId } from project ${ projectId }`);
    res.status(204).json({ message: `DELETE: transcript ${ transcriptId }` });
  });
};
