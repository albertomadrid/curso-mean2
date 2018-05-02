'use strict'

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.get('/', function(req, res){
  res.send("Root API");
  console.log("Esta recibiendo una peticion por un cliente");
});


// Cargar Rutas
var user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

//Configurar Cabeceras HTTP

// Rutas Base
app.use('/api/v1', user_routes);
//app.use('/api/v2', user_routesothers);


//app.get('/pruebas',function(req,res){
  //  res.status(200).send({message: 'Bienvenido a la pagina'});
//});


module.exports = app;