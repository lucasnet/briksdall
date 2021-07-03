const express = require('express');
const app = express();
const port = 3000;
const Logger = require('./src/logger'); 
const logger = new Logger();
const Routing_M1 = require('./src/router_m1');
const Routing_M2 = require('./src/router_m2');
const Routing_BLancio = require('./src/router_BLancio.js');
const path = require('path');


app.use(express.static(__dirname + '/public'));

app.use('/BLancio', Routing_BLancio);
app.use('/M1',Routing_M1);
app.use('/M2',Routing_M2);

app.get('/', (req, res) => {
    logger.Log('Request -> Index'); 
    res.sendFile(path.join(__dirname, '/src/pages/index.html'));
  });

  app.get('/adminlte', (req, res) => {
    logger.Log('Request -> Admin LTE'); 
    res.sendFile(path.join(__dirname, '/src/pages/adminlte.html'));
  });

  app.get('/gentelella', (req, res) => {
    logger.Log('Request -> Gentelella'); 
    res.sendFile(path.join(__dirname, '/src/pages/gentelella.html'));
  });

app.get('/root', (req, res) => {
  logger.Log('Request -> Root'); 
  res.sendFile(path.join(__dirname, '/src/templates/root.html'));
});

app.get('/pippo', function (req, res) {
    logger.Log('Request -> Pippo');
    res.sendFile(path.join(__dirname, '/src/templates/pippo.html'));
  });

  // app.get('/gruppi', function (req, res) {
  //   logger.Log('Request -> Gruppi');
  //   res.sendFile(path.join(__dirname, '/src/templates/gruppi.html'));
  // });

app.listen(port, () => {
  logger.Log(`Test app listening at http://localhost:${port}`);
})

