exports.seed = (knex) => {
  const foreignKeys = 'ALTER TABLE "Annotations" DROP CONSTRAINT IF EXISTS "Annotations_fk2";';

  knex.schema.raw(foreignKeys)
    .catch(err => console.error(err));

  knex('Labels').del()
    .then(() => knex('Labels').insert([
      {
        id: 1,
        title: 'default',
        colour: 'orange',
        description: 'A default label',
      },
      {
        id: 2,
        title: 'economics',
        colour: 'brown',
        description: 'Test description 1',
      },
      {
        id: 3,
        title: 'Introduction',
        colour: 'darkblue',
        description: 'Test description 2',
      },
      {
        id: 4,
        title: 'Brexit',
        colour: '#FF5630',
        description: 'Brexit description',
      },
    ]));
};
