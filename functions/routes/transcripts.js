const path = require("path");
const cuid = require("cuid");
const formidable = require("formidable");

const data = require("../sample-data/transcripts.sample.json");

const sampleTranscriptKate = require("../sample-data/transcripts/kate.transcript.sample.json");
const sampleTranscriptMorgan = require("../sample-data/transcripts/morgan.transcript.sample.json");
const sampleTranscriptIvan = require("../sample-data/transcripts/ivan.transcript.sample.json");
const sampleTranscriptInProgress = require("../sample-data/transcripts/in-progress.transcript.sample.json");

const sampleTranscripts = [
  sampleTranscriptKate,
  sampleTranscriptMorgan,
  sampleTranscriptIvan,
  sampleTranscriptInProgress
];

module.exports = app => {
  app.post("/api/projects/:projectId/transcripts", (req, res, next) => {
    const projectId = req.params.projectId;
    const newTranscriptId = cuid();

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "..", "tmpMedia");
    form.keepExtensions = true;
    form.keepFilenames = true; // TODO: this `keepFilenames` does not seem to work, flag in that issue?
    form.type = "multipart";

    form
      .on("fileBegin", (name, file) => {
        file.path = path.join(form.uploadDir, file.name);
      })
      .on("error", err => {
        console.error(`Job failed: project ${projectId}, due to ${err}`);

        return next(err);
      })
      .on("aborted", err => {
        console.error(`Aborted job for project ${projectId}, due to ${err}`);

        return next(err);
      });

    form.parse(req, (err, fields) => {
      if (err) {
        console.error(err);
      }

      console.log(`INFO: Fields: ${fields}`);

      const newTranscript = {
        title: fields.title,
        description: fields.description,
        id: newTranscriptId,
        status: "in-progress"
      };

      data.transcripts.push(newTranscript);
      console.log(
        `POST: transcript ${newTranscriptId} for project ${projectId}`
      );
      res.status(201).json({ status: "ok", transcript: newTranscript });
    });
  });

  app.get("/api/projects/:projectId/transcripts", (req, res) => {
    const projectId = req.params.projectId;
    console.log(`GET: transcripts for project ${projectId}`);
    res.status(200).json(data);
  });

  app.get(
    "/api/projects/:projectId/transcripts/:transcriptId",
    (req, res, next) => {
      const projectId = req.params.projectId;
      const transcriptId = req.params.transcriptId;

      const transcript = sampleTranscripts.find(t => t.id === transcriptId);

      if (!transcript) {
        const err = new Error("No transcript found");
        err.statusCode = 404;
        console.error(
          `${err.statusCode}: Transcript ${transcriptId} not found for project ${projectId}`
        );

        return next(err);
      }

      console.log(`GET — Transcript ${transcriptId} from project ${projectId}`);

      return res.status(200).json(transcript);
    }
  );

  app.put("/api/projects/:projectId/transcripts/:transcriptId", (req, res) => {
    const projectId = req.params.projectId;
    const transcriptId = req.params.transcriptId;

    const updatedTranscript = {
      id: projectId,
      title: req.body.title,
      description: req.body.description
    };

    const transcriptIndex = data.transcripts.findIndex(
      item => item.id === transcriptId
    );
    data.transcripts[transcriptIndex] = updatedTranscript;

    console.log(
      `PUT — New Transcript ${transcriptId} for project ${projectId}`
    );
    res.status(200).json({ transcript: updatedTranscript });
  });

  app.delete(
    "/api/projects/:projectId/transcripts/:transcriptId",
    (req, res) => {
      const projectId = req.params.projectId;
      const transcriptId = req.params.transcriptId;

      data.transcripts = data.transcripts.filter(t => t.id !== transcriptId);

      console.log(
        `DELETE - Transcript ${transcriptId} from project ${projectId}`
      );
      res.status(204).json({ message: `DELETE: transcript ${transcriptId}` });
    }
  );
};
