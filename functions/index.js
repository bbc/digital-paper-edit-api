const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
require("./db");

const app = express();
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: "50MB" }));
app.use(bodyParser.urlencoded({ extended: true }));

// const routePath = "./routes/";

// const routes = fs
// .readdirSync(routePath)
// .filter(file => /.js$/.test(file))
// .forEach(route => require(`${routePath}${route}`)(app));

require(`./routes/annotations`)(app);
require(`./routes/labels`)(app);
require(`./routes/paperedits`)(app);
require(`./routes/projects`)(app);
require(`./routes/status`)(app);
require(`./routes/transcripts`)(app);
require(`./routes/index`)(app);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Something went wrong!";
  console.error(`Error: ${statusCode} — ${errorMessage}`);
  res.status(statusCode).json({
    status: statusCode,
    message: errorMessage
  });
});

exports.app = functions.https.onRequest(app);
