const express = require('express');
const router = express.Router();
const Logger = require('./logger');
const path = require('path'); 
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const logger = new Logger();

const urlWebAPI = 'http://192.168.1.33:81/ws';


// proxy error handler
apiProxy.on('error', function (err, req, res) {

  logger.Log('ERROR: ' + req.url + ' ' + err);

  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.\r\n' + err);
});

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  logger.Log('Request webapi: ' + req.url);
  next()
});


// BLancio -> Gruppi
router.all("/blancio.asmx/Gruppi_Elenco", function(req, res) {    
    apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Gruppo_Dettaglio_GET", function(req, res) {    
    apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Gruppo_Dettaglio_SET", function(req, res) {    
    apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Gruppo_Dettaglio_DEL", function(req, res) {    
    apiProxy.web(req, res, {target: urlWebAPI});
});

// BLancio -> Sottogruppi
router.all("/blancio.asmx/Sottogruppi_Elenco", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Sottogruppi_Dettaglio_GET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Sottogruppi_Dettaglio_SET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Sottogruppi_Dettaglio_DEL", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});

// BLancio -> Supermercati
router.all("/blancio.asmx/Supermercati_Elenco", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Supermercato_Dettaglio_GET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Supermercato_Dettaglio_SET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Supermercato_Dettaglio_DEL", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});

// BLancio -> Risorse
router.all("/blancio.asmx/RisorseEconomiche_Elenco", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/RisorseEconomiche_Dettaglio_GET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/RisorseEconomiche_Dettaglio_SET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});

// BLancio -> Previsione Setup
router.all("/blancio.asmx/PrevisioneConfigurazione_Elenco", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/PrevisioneConfigurazione_Dettaglio_SET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/PrevisioneConfigurazione_Dettaglio_DEL", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/PrevisioneConfigurazione_Genera", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});

// BLancio -> Registrazioni
router.all("/blancio.asmx/Registrazioni_Elenco", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Registrazione_Dettaglio_GET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Registrazione_Dettaglio_SET", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});
router.all("/blancio.asmx/Registrazione_Dettaglio_DEL", function(req, res) {    
  apiProxy.web(req, res, {target: urlWebAPI});
});




//others
router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/templates/404.html'));
});

module.exports = router