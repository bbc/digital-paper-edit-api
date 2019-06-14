// Dummy data to mock the server
const path = require('path');
const cuid = require('cuid');
const sampleTranscriptsIndex = require('../sample-data/transcripts/transcripts.sample.json');

const sampleTranscript = require('../sample-data/transcripts/transcript.sample.json');

const sampleTranscriptKate = require('../sample-data/transcripts/kate.transcript.sample.json');
const sampleTranscriptMorgan = require('../sample-data/transcripts/morgan.transcript.sample.json');
const sampleTranscriptIvan = require('../sample-data/transcripts/ivan.transcript.sample.json');
const sampleTranscriptInProgress = require('../sample-data/transcripts/in-progress.transcript.sample.json');
// const sampleTranscriptError = require('../sample-data/transcripts/in-progress.transcript.sample.json');

const sampleTranscriptsList = [ sampleTranscriptKate, sampleTranscriptMorgan, sampleTranscriptIvan, sampleTranscriptInProgress];

const IncomingForm = require('formidable').IncomingForm;
/**
 * Transcripts
 */
module.exports = (app) => {
  // New - Create a new project
  // https://malcoded.com/posts/react-file-upload/
  // TODO: once uploaded and info/metadata saved to db
  // the file should be moved to S3
  app.post('/api/projects/:projectId/transcripts', (req, res) => {
    // TODO: get file name from react
    const form = new IncomingForm();
    // form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname, '..','tmpMedia');
    // If you want the files written to form.uploadDir to include the extensions of the original files, set this property to true.
    form.keepExtensions = true;
    // https://github.com/felixge/node-formidable/pull/488
    // TODO: this `keepFilenames` does not seem to work, flag in that issue?
    form.keepFilenames = true;
    // Either 'multipart' or 'urlencoded' depending on the incoming request.
    form.type = 'multipart';
    // Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 200MB.
    form.maxFileSize = 200 * 1024 * 1024;
    // If you want checksums calculated for incoming files, set this to either 'sha1' or 'md5' otherwise to false.
    // form.hash = false;

    // TODO: save to db + return ID
    // TODO: create video and audio preview
    // TODO: get transcription
    const projectId = req.params.projectId;
    // TODO: send project ID?
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202

    // Just  a mock for testing purposes, when connecting to DB, ids are unique and immutable
    // const lasTranscriptPositionIndex = sampleTranscriptsIndex.transcripts.length === 0 ? 0 : sampleTranscriptsIndex.transcripts.length - 1;
    // const lastTranscriptId = sampleTranscriptsIndex.transcripts.length.length === 0 ? 0 : sampleTranscriptsIndex.transcripts[lasTranscriptPositionIndex].id;
    const newTranscriptId = cuid();

    // Workaround for `form.keepFilenames` not working
    // Issue, is if file with same name already in `form.uploadDir`
    // then it returns error
    // https://stackoverflow.com/questions/8359902/how-to-rename-files-parsed-by-formidable
    form.on('fileBegin', function(name, file) {
      // rename the incoming file to the file's name
      // TODO: escape file names?
      // Or let formidable rename with has, and save in db, with name of original as well?
      file.path = path.join(form.uploadDir, file.name);
    })
      .on('error', function(err) {
        // TODO: res with appropriate code
        console.error('error:err:: ', err);
      })
      .on('aborted', function(err) {
        // TODO: res with appropriate code
        console.error('aborted:err:: ', err);
      });
    // Parses an incoming node.js request containing form data.
    // If cb is provided, all fields and files are collected and passed to the callback
    form.parse(req, function(err, fields, file) {
      console.log('fields::', fields);
      const newTranscript = {
        title: fields.title,
        description: fields.description,
        id: newTranscriptId,
        status: 'in-progress'
      }
      sampleTranscriptsIndex.transcripts.push(newTranscript);
      console.log('transcripts', 'new', `/api/projects/${ projectId }/transcripts`, newTranscriptId);
      res.status(201).json({ status:'ok', transcript: newTranscript });
    });

  });
  // Index
  app.get('/api/projects/:projectId/transcripts', (req, res) => {
    const projectId = req.params.projectId;
    // TODO: change in the SDK for this to be made as separate call to Projects end point using projectId
    // and join results there
    sampleTranscriptsIndex.projectTitle = 'Sample Project';
    console.log(sampleTranscriptsIndex)
    // 204 - no content if transcript not ready?
    console.log('transcripts', 'get', `/api/projects/${ projectId }/transcripts`);
    res.status(200).json(sampleTranscriptsIndex);
  });

  // show
  // exposes route + one query param option to get transcript data without transcript json
  // http://localhost:7080/api/projects/1/transcripts/1
  // http://localhost:7080/api/projects/1/transcripts/1?transcriptJson=false
  app.get('/api/projects/:projectId/transcripts/:transcriptId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    let tmpTranscript = sampleTranscriptsList.find((t) => {
      return t.id === transcriptId;
    });

    // tmp workaround for testing, when requesting transcript that doesn't match id
    if(!tmpTranscript){
      // TODO: move these info in sample transcript
      tmpTranscript =  {
        id: transcriptId,
        // TODO: make separate call to projects in SDK to remove this info here
        // and then aggregate there
        // projectTitle: 'Sample Project',
        status: 'error',
        title: 'Ted Talk Kate',
        description: 'some optional description',
        transcript: sampleTranscript,
        url: 'https://download.ted.com/talks/KateDarling_2018S-950k.mp4'
      };
    }

    // `transcriptJson=false` doesn't return the transcriptJson
    // if param is set to true or not specified then it returns it
    if (req.query.transcriptJson && req.query.transcriptJson.toString() === 'false') {
      // console.log('true', req.query.transcriptJson);
      // TODO: get title of transcript from DB
      // delete sampleTranscript2.transcript;
    }
    // TODO: change this
    console.log('transcripts', 'get', `/api/projects/${ projectId }/transcripts/${ transcriptId }`);
    res.status(200).json(tmpTranscript);

  });

  // edit
  app.put('/api/projects/:projectId/transcripts/:transcriptId', (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;
    
    const updatedTranscript = {
      "id": projectId,
      "title": req.body.title,
      "description":req.body.description
    }
    // TODO: handle query params, if updating transcriptJson 
    // or just updating title/description etc..
    const transcriptIndex =  sampleTranscriptsIndex.transcripts.findIndex(item => item.id === transcriptId);
    sampleTranscriptsIndex.transcripts[transcriptIndex] = updatedTranscript;
    console.log('transcripts', 'edit', `/api/projects/${ projectId }/transcripts/${ transcriptId }`, req.body);
    console.log(updatedTranscript)
    res.status(200).json({ status:'ok' , transcript: updatedTranscript});
  });

  // delete
  app.delete('/api/projects/:projectId/transcripts/:transcriptId', function (req, res) {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    delete sampleTranscriptsIndex.transcripts[transcriptId];

    sampleTranscriptsIndex.transcripts = sampleTranscriptsIndex.transcripts.filter((t) => {
      return t.id !== transcriptId;
    });

    console.log('transcripts', 'deleted', `(/api/projects/${ projectId }/transcripts/${ transcriptId }`);
    res.status(200).json({ status:'ok' });
  });
};