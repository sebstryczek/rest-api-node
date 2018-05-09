const config = require('./config');
const dbInit = require('./db/index.db');
const routes = require('./routes');
const errorHandler = require('./middleware/error-handler');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

(async () => {
  /*
  const http = require('http');
  const url = require('url');

  http.createServer(function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});

    const purl = url.parse(req.url, true);
    if(purl.pathname=='/test') {
      res.end('Test');
      // response.end('text') == response.write('text'); then response.end();
    } else {
      res.end('Hello World\n');
    }

  }).listen(1337, '127.0.0.1');
  console.log('Server running at http://127.0.0.1:1337/');
  */
  
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
