const cuid = require('cuid');
const moment = require('moment');
const logger = require('../lib/logger.js');
const knex = require('../knex/knex');

const TABLE = 'Projects';

module.exports = (app) => {
  app.post('/api/projects', (req, res, next) => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(date);

    const project = {
      // id: cuid(),
      title: req.body.title,
      description: req.body.description,
      created_at: date,
      updated_at: date,
    };

    knex(TABLE)
      .insert(project)
      .then(() => {
        logger.info(`POST: New project ${ project.id }`);
        res.status(201).json({ status: 'ok', project });
      }).catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        return next(err);
      });
  });

  app.get('/api/projects', (req, res) => {
    logger.info('GET: Projects');

    knex(TABLE)
      .select('*')
      .then((data) => {
        res.status(200).json(data);
      }).catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        return next(err);
      });
  });

  app.get('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    knex(TABLE)
      .where('id', '=', projectId)
      .then((data) => {
        logger.info(`GET: Project id ${ req.params.projectId }`);
        res.status(200).json(data);
      }).catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        return next(err);
      });
  });

  app.put('/api/projects/:projectId', (req, res) => {
    const projectId = req.params.projectId;

    const newProject = {
      id: projectId,
      title: req.body.title,
      description: req.body.description,
    };

    knex(TABLE)
      .where('id', '=', projectId)
      .update(newProject)
      .then(() => {
        logger.info(`PUT: Edit project id ${ req.params.projectId }`);
        res.status(200).json({ status: 'ok', project: newProject });
      })
      .catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        return next(err);
      });
  });

  app.delete('/api/projects/:projectId/', (req, res) => {
    const projectId = req.params.projectId;

    knex(TABLE)
      .where('id', '=', projectId)
      .del()
      .then(() => {
        logger.info(`DELETE: Project id ${ projectId }`);
        res.status(204).json({ status: 'ok' });
      })
      .catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        return next(err);
      });
  });
};
