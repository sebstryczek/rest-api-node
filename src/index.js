const config = require('./config');
const dbInit = require('./db/index.db');
const errorHandler = require('./middleware/error-handler');
const routes = require('./routes');

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

(async () => {
  const app = express();
  const server  = http.createServer(app);

  const db = await dbInit(config);
  app.use((req, res, next) => {
    req.db = db;
    next();
  });
  
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(routes());
  app.use(errorHandler);

  server.listen(process.env.PORT || config.appPort, () => {
    console.log(`Started on port ${server.address().port}`);
  });
})();
