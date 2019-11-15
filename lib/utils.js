const moment = require('moment');

const postgresDate = () => moment().format('YYYY-MM-DD HH:mm:ss');

module.exports = { postgresDate };
