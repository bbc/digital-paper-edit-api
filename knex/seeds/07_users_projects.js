exports.seed = (knex) => {
  knex.schema.table('users_projects', (table) => {
    table.dropForeign([ 'users_projects_fk0', 'users_projects_fk1' ]);
  });

  return knex('users_projects').del()
    .then(() => knex('users_projects').insert([
      {
        id: 1,
        user_id: 'nigel@email.com',
        project_id: 1,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 2,
        user_id: 'jaywon@email.com',
        project_id: 2,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 3,
        user_id: 'nakaz@email.com',
        project_id: 3,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
    ]));
};
