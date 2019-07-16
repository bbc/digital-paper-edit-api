const fs = require('fs');

exports.up = async (knex) => {
  const createSchema = fs.readFileSync('sql/createSchema.sql').toString();

  knex.schema.raw(createSchema)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};

exports.down = async (knex) => {
  const dropSchema = fs.readFileSync('sql/dropSchema.sql').toString();

  knex.schema.raw(dropSchema)
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
