const express = require('express');
const router = express.Router();
const Logger = require('./logger');
const path = require('path');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
const { request } = require('http');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const logger = new Logger();

const urlWebAPI = 'http://192.168.1.33:81/ws';

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  logger.Log('Request webapi: ' + req.url);
  next()
});


router.all("/blancio.asmx/Gruppi_Elenco", function(req, res) {    
    apiProxy.web(req, res, {target: urlWebAPI});
});

//others
router.get('*', function(req, res){
    res.sendFile(path.join(__dirname, '/templates/404.html'));
});

module.exports = router