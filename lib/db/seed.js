const { knex, runQuery } = require('./');

const sampleProjects = require('../../sample-data/projects.sample.json');

const projects = () => knex('Users')
  .insert({
    name: 'Louis Theroux',
    email: 'test.email@bbc.co.uk',
  })
  .then(res => console.log(res))
  .catch((err) => { console.log(err); throw err; });

const query = `
  SELECT * FROM users
`;

// projects();
// runQuery(query);

// knex.from('Users').select('*')
//   .then(res => console.log(res));
