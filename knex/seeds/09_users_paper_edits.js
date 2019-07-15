exports.seed = (knex) => {
  knex.schema.table('users_paper_edits', (table) => {
    table.dropForeign([ 'users_paper_edits_fk0', 'users_paper_edits_fk1' ]);
  });

  return knex('users_paper_edits').del()
    .then(() => knex('users_paper_edits').insert([
      {
        id: 1,
        user_id: 'nigel@email.com',
        paper_edit_id: 1,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 2,
        user_id: 'jaywon@email.com',
        paper_edit_id: 2,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 3,
        user_id: 'nakaz@email.com',
        paper_edit_id: 3,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
    ]));
};
