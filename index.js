require('./config');

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json( { limit: '50MB' } ));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// Import routes folder
const routePath = './routes/';
const routes = fs.readdirSync(routePath).filter(file => (/.js$/).test(file));

// eslint-disable-next-line global-require, import/no-dynamic-require
routes.forEach(route => require(routePath + route)(app));

app.use((err, req, res, next) => {
  console.log('err');
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Something went wrong!';

  res.status(statusCode)
    .json({
      status: statusCode,
      message: errorMessage,
    });
});

app.listen(port, () => console.log(`App listening on port ${ port }!`));

module.exports = app;
