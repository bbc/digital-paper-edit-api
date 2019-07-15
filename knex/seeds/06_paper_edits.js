exports.seed = (knex) => {
  const dropFk = 'ALTER TABLE "Paper_edits" DROP CONSTRAINT IF EXISTS "Paper_edits_fk0";';
  knex.schema.raw(dropFk)
    .then(res => console.log(res))
    .catch(err => console.error(err));

  return knex('Paper_edits').del()
    .then(() => knex('Paper_edits').insert([
      {
        id: 1,
        title: 'Paper Edit One',
        description: 'Description Paper Edit One',
        data: {},
        project_id: 1,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 2,
        title: 'Paper Edit Two',
        description: 'Description Paper Edit Two',
        data: {},
        project_id: 2,
        created_at: '2019-06-21 19:10:25-07',
        updated_at: '2019-06-22 09:10:25-07',
      },
      {
        id: 3,
        title: 'Paper Edit Three',
        description: 'Description Paper Edit Three',
        data: {},
        project_id: 3,
        created_at: '2019-06-20 09:10:25-07',
        updated_at: '2019-06-21 19:10:25-07',
      },
    ]));
};
