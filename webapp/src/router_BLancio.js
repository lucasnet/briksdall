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


// define the GRUPPI routes
router.get('/gruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/gruppi.html'));
});
router.get('/gruppo', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/gruppo.html'));
});
router.get('/cgruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/gruppi_controller.js'));
});
router.get('/cgruppo', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/gruppo_controller.js'));
});
router.get('/mgruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/gruppi_model.js'));
});
router.get('/pgruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/gruppi_presenter.js'));
});
router.get('/model_base', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/base_model.js'));
});
router.get('/controller_base', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/base_controller.js'));
});


// define the SOTTOGRUPPI route
router.get('/sottogruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/sottogruppi.html'));
});
router.get('/sottogruppo', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/sottogruppo.html'));
});
router.get('/csottogruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/sottogruppi_controller.js'));
});
router.get('/csottogruppo', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/sottogruppo_controller.js'));
});
router.get('/msottogruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/sottogruppi_model.js'));
});
router.get('/psottogruppi', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/sottogruppi_presenter.js'));
});



// define the SUPERMERCATI route
router.get('/supermercati', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/supermercati.html'));
});
router.get('/supermercato', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/supermercato.html'));
});
router.get('/csupermercati', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/supermercati_controller.js'));
});
router.get('/csupermercato', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/supermercato_controller.js'));
});
router.get('/msupermercati', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/supermercati_model.js'));
});
router.get('/psupermercati', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/supermercati_presenter.js'));
});



// define the RISORSE route
router.get('/risorse', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/risorse.html'));
});
router.get('/risorsa', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/risorsa.html'));
});
router.get('/crisorse', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/risorse_controller.js'));
});
router.get('/crisorsa', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/risorsa_controller.js'));
});
router.get('/mrisorse', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/risorse_model.js'));
});
router.get('/prisorse', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/risorse_presenter.js'));
});


// define the SETUP PREVISIONE route
router.get('/previsione_setup', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/BLancio/previsione_setup.html'));
});
router.get('/cPrevisioneSetup', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/previsionesetup_controller.js'));
});
router.get('/pPrevisioneSetup', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/BLancio/previsionesetup_presenter.js'));
});


router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/templates/BLancio/404.html'));
  });

module.exports = router