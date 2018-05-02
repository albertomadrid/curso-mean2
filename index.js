'use strict'


var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/curso_mean2';
var app = require("./app");
var port = process.env.port || 3977;

mongoose.connect(mongoDB, { useMongoClient: true  });
mongoose.Promise = global.Promise;

mongoose.createConnection(mongoDB,(err , res) =>
{
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("La base de datos está corriendo correctamente.");
        app.listen(port,function(){
            console.log("Servidor del API rest de musica escuchando en el http://localhost:" + port);
        }); 

    }
});