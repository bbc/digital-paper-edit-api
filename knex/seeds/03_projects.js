exports.seed = function (knex, Promise) {
  return knex('Projects').del()
    .then(() =>
      knex('Projects').insert([
        {
          id: 1,
          title: 'Project One',
          description: 'Description Project One',
          created_at: '2019-06-22 19:10:25-07',
          updated_at: '2019-06-23 09:10:25-07',
        },
        {
          id: 2,
          title: 'Project Two',
          description: 'Description Project Two',
          created_at: '2019-06-21 19:10:25-07',
          updated_at: '2019-06-22 09:10:25-07',
        },
        {
          id: 3,
          title: 'Project Three',
          description: 'Description Project Three',
          created_at: '2019-06-20 09:10:25-07',
          updated_at: '2019-06-21 19:10:25-07',
        },
      ]));
};