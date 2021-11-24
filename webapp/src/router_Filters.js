// router_filters.
// routing handler for Filters module.

const express = require('express');
const router = express.Router();
const Logger = require('./logger');
const path = require('path');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

const logger = new Logger();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  logger.Log('Request Filters: ' + req.url);
  next()
});


// define the home page route
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/Filters/main.html'));
})


// define BLANCIO FILTERS routes
router.get('/controller', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/Filters/BLancio_controller.js'));
});
router.get('/model', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/Filters/BLancio_model.js'));
});

// define BASE routes (from Common)
router.get('/model_base', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/Common/base_model.js'));
});
router.get('/controller_base', function (req, res) {
    res.sendFile(path.join(__dirname, '/js/Common/base_controller.js'));
});



router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/templates/Filters/404.html'));
  });

module.exports = router