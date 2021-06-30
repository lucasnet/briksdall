const express = require('express');
const router = express.Router();
const Logger = require('./logger');
const path = require('path');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

const logger = new Logger();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  logger.Log('Request M1: ' + req.url);
  next()
});


// define the home page route
router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/m1/root.html'));
})
// define the about route
router.get('/about', function (req, res) {
    res.sendFile(path.join(__dirname, '/templates/m1/about.html'));
})

router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/templates/m1/404.html'));
  });

module.exports = router