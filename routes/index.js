const url = require('url');
const logger = require('../lib/logger.js');

module.exports = (app) => {
  app.get('/', (req, res) => {
    const fullUrl = `${ req.protocol }://${ req.get('host') }${ req.originalUrl }`;
    logger.info(`Full url: ${ fullUrl }`);
    const results = [];
    app._router.stack.forEach((r) => {
      if (r.route && r.route.path) {
        results.push({
          path: r.route.path,
          url: url.resolve(fullUrl, r.route.path),
          methods: r.route.methods,
        });
      }
    });
    res.json({ response: results });
  });
};
