exports.seed = (knex) => {
  const dropForeignKeys = 'ALTER TABLE "Media" DROP CONSTRAINT IF EXISTS "Media_fk0";';

  knex.schema.raw(dropForeignKeys)
    .catch(err => console.error(err));

  return knex('Media').del()
    .then(() => knex('Media').insert([
      {
        id: 1,
        transcript_id: 1,
        url: 'http://fake-url-one.com',
        metadata: {},
        original_file_name: 'Transcript One Media',
        audio_preview_url: 'http://one-audio-preview.com',
        video_preview_url: 'http://one-video-preview.com',
      },
      {
        id: 2,
        transcript_id: 3,
        url: 'http://fake-url-two.com',
        metadata: {},
        original_file_name: 'Transcript Two Media',
        audio_preview_url: 'http://two-audio-preview.com',
        video_preview_url: 'http://two-video-preview.com',
      },
      {
        id: 3,
        transcript_id: 2,
        url: 'http://fake-url-three.com',
        metadata: {},
        original_file_name: 'Transcript Three Media',
        audio_preview_url: 'http://three-audio-preview.com',
        video_preview_url: 'http://three-video-preview.com',
      },
    ]));
};
