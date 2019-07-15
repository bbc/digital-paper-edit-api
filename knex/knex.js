const environment = process.env.MODE_ENV || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
