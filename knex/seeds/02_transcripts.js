const fs = require('fs');

exports.seed = async (knex) => {
  const kateTranscript = JSON.parse(fs.readFileSync('./sample-data/transcripts/kate.transcript.sample.json'));
  const ivanTranscript = JSON.parse(fs.readFileSync('./sample-data/transcripts/ivan.transcript.sample.json'));
  const morganTranscript = JSON.parse(fs.readFileSync('./sample-data/transcripts/morgan.transcript.sample.json'));
  const dropForeignKeys = `ALTER TABLE "Transcripts" DROP CONSTRAINT IF EXISTS "Transcripts_fk0"; 
  ALTER TABLE "users_projects" DROP CONSTRAINT IF EXISTS "users_projects_fk1"; 
  ALTER TABLE "Annotations" DROP CONSTRAINT IF EXISTS "Annotations_fk1"; 
  ALTER TABLE "users_transcripts" DROP CONSTRAINT IF EXISTS "users_transcripts_fk1";'`;

  return knex.schema.raw(dropForeignKeys)
    .catch(err => console.error(err))
    .then(() => knex('Transcripts').del()
      .then(() => knex('Transcripts').insert([
        {
          id: 1,
          title: 'Transcript One — Morgan Vague Ted Talk',
          description: 'Description Transcript One — Morgan Vague Ted Talk',
          data: morganTranscript.transcript,
          speakers: {},
          project_id: 1,
          created_at: '2019-06-22 19:10:25-07',
          updated_at: '2019-06-23 09:10:25-07',
        },
        {
          id: 2,
          title: 'Transcript Two — Kate Darling Ted Talk',
          description: 'Description Transcript Two — Kate Darling Ted Talk',
          data: kateTranscript.transcript,
          speakers: {},
          project_id: 1,
          created_at: '2019-06-21 19:10:25-07',
          updated_at: '2019-06-22 09:10:25-07',
        },
        {
          id: 3,
          title: 'Transcript Three — Ivan Poupyrev Ted Talk',
          description: 'Description Transcript Three - Ivan Poupyrev Ted Talk',
          data: ivanTranscript.transcript,
          speakers: {},
          project_id: 2,
          created_at: '2019-06-20 09:10:25-07',
          updated_at: '2019-06-21 19:10:25-07',
        },
      ])));
};
