exports.seed = (knex) => {
  const dropForeignKeys = `ALTER TABLE "users_projects" DROP CONSTRAINT IF EXISTS "users_projects_fk0"; 
  ALTER TABLE "Annotations" DROP CONSTRAINT IF EXISTS "Annotations_fk0"; 
  ALTER TABLE "users_transcripts" DROP CONSTRAINT IF EXISTS "users_transcripts_fk0";'`;

  knex.schema.raw(dropForeignKeys)
    .catch(err => console.error(err));

  knex('Users').del()
    .then(() => knex('Users').insert([
      {
        email: 'nigel@email.com',
        name: 'Nigel One',
      },
      {
        email: 'nakaz@email.com',
        name: 'Nakaz Two',
      },
      {
        email: 'jaywon@email.com',
        name: 'Jaywon Three',
      },
    ]));
};
