// const cuid = require('cuid');

const logger = require('../lib/logger.js');
const knex = require('../knex/knex');
const date = require('../lib/utils').postgresDate;

const TABLE = 'Projects';

module.exports = (app) => {
  app.post('/api/projects', (req, res, next) => {
    const project = {
      // id: cuid(),
      title: req.body.title,
      description: req.body.description,
      created_at: date(),
      updated_at: date(),
    };

    knex(TABLE)
      .insert(project)
      .then(() => {
        logger.info(`POST: New project ${ project.id }`);
        res.status(201).json({ status: 'OK', project });
      }).catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        return next(err);
      });
  });

  app.get('/api/projects', (req, res, next) => {
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

  app.get('/api/projects/:projectId', (req, res, next) => {
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

  app.put('/api/projects/:projectId', (req, res, next) => {
    const projectId = req.params.projectId;

    knex(TABLE)
      .where('id', '=', projectId)
      .update({
        title: req.body.title,
        description: req.body.description,
        updated_at: date(),
      })
      .then(() => {
        logger.info(`PUT: Edit project id ${ req.params.projectId }`);
        res.status(200).json({ status: 'OK' });
      })
      .catch((err) => {
        logger.error(`DB error - projects - ${ err }`);

        return next(err);
      });
  });

  app.delete('/api/projects/:projectId/', (req, res, next) => {
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
