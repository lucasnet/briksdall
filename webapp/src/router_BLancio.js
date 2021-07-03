const express = require('express');
const router = express.Router();
const Logger = require('./logger');
const path = require('path');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

const logger = new Logger();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  logger.Log('Request BLancio: ' + req.url);
  next()
});


// define the home page route
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/main.html'));
})


// define the GRUPPI route
router.get('/gruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/gruppi.html'));
});
// define the SOTTOGRUPPI route
router.get('/sottogruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/sottogruppi.html'));
});
// define the SUPERMERCATI route
router.get('/supermercati', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/supermercati.html'));
});
// define the RISORSE route
router.get('/risorse', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/risorse.html'));
});
// define the SETUP PREVISIONE route
router.get('/previsione_setup', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/previsione_setup.html'));
});

router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/templates/BLancio/404.html'));
  });

module.exports = router