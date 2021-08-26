const express = require('express');
const router = express.Router();
const Logger = require('./logger');
const path = require('path');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

const logger = new Logger();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  logger.Log('Request Common: ' + req.url);
  next()
});


//// define the home page route
//router.get('/', function (req, res) {
//    res.sendFile(path.join(__dirname, '/common/modals/main.html'));
//})


// define the MODALS routes
router.get('/modal_confirm', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/common/modals/confirm.html'));
});
router.get('/modal_ok', function (req, res) {
  res.sendFile(path.join(__dirname, '/templates/common/modals/ok.html'));
});
router.get('/modal_error', function (req, res) {
  res.sendFile(path.join(__dirname, '/templates/common/modals/error.html'));
});


router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/templates/BLancio/404.html'));
  });

module.exports = router