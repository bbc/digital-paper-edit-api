exports.seed = (knex) => {
  knex.schema.table('Annotations', (table) => {
    table.dropForeign([ 'Annotations_fk0', 'Annotations_fk1', 'Annotations_fk2' ]);
  });

  return knex('Annotations').del()
    .then(() => knex('Annotations').insert([
      {
        id: 1,
        user_id: 'nigel@email.com',
        transcript_id: 1,
        label_id: 1,
        time_start: 12.05,
        time_end: 15.02,
        description: 'Description Annotation One',
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 2,
        user_id: 'nigel@email.com',
        transcript_id: 2,
        label_id: 2,
        time_start: 17.05,
        time_end: 25.02,
        description: 'Description Annotation Two',
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 3,
        user_id: 'nakaz@email.com',
        transcript_id: 3,
        label_id: 1,
        time_start: 12.05,
        time_end: 15.02,
        description: 'Description Annotation Three',
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
    ]));
};
