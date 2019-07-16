exports.seed = (knex) => {
  const dropForeignKeys = `ALTER TABLE "users_transcripts" DROP CONSTRAINT IF EXISTS "users_transcripts_fk0"; 
  ALTER TABLE "users_transcripts" DROP CONSTRAINT IF EXISTS "users_transcripts_fk1";`;

  knex.schema.raw(dropForeignKeys)
    .catch(err => console.error(err));

  return knex('users_transcripts').del()
    .then(() => knex('users_transcripts').insert([
      {
        id: 1,
        user_id: 'nigel@email.com',
        transcript_id: 1,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 2,
        user_id: 'jaywon@email.com',
        transcript_id: 2,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
      {
        id: 3,
        user_id: 'nakaz@email.com',
        transcript_id: 3,
        created_at: '2019-06-22 19:10:25-07',
        updated_at: '2019-06-23 09:10:25-07',
      },
    ]));
};
