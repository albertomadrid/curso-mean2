'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middleware/authentificacion');

api.get('/probando', md_auth.ensureAuth ,UserController.pruebas);
api.get('/Login', UserController.Login);

api.post('/register', UserController.saveUser);
api.post('/loginUser', UserController.LoginUser);

module.exports = api;