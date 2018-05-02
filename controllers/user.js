'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

var jwt = require('../services/jwt');

//Primera función de pruebas de Router
function pruebas(req,res){
    res.status(200).send({
       message : 'Probando una acción del controlador' 
    });
}

//Funcion Para Probar Login
function Login(req,res)
{
    res.status(200).send({ message : 'Probando Login' });
}

function saveUser(req,res)
{
    var params = req.body;

    if(params.password)
    {

        //Encriptar Contraseña
        bcrypt.hash(params.password,null,null,function(err,hash)
        {
            
            if(params.name != null && params.surname != null && params.email != null)
            {      
                
                var newUser = new User({
                    name : params.name,
                    surname : params.surname,
                    email  : params.email,
                    password : hash,
                    role : 'ROLE_USER',
                    image : 'NULL',
                    CualquierCampo : 'Lo que sea'
                });

                console.log("Guardando Datos");


                newUser.save( function ( err, userStored , rowsaffeted ) 
                {

                    console.log(rowsaffeted);

                    if(err)
                    {
                        console.log("Error");
                        res.status(500).send({ message : 'Error al guardar el usuario' });
                    }
                    else
                    {
                        if(!userStored)
                        {
                            console.log("No se ha registrado");
                            res.status(404).send({
                                message : 'No se ha registrado el usaurio'
                            });
                        }
                        else
                        {
                            console.log("Lo registro");
                            res.status(200).send({ user : userStored });
                        }
                    }
                });


            }
            else
            {
                res.status(200).send({
                    message : 'Rellene los campos'
                });    
            }
        });


    }
    else
    {
        res.status(500).send(
        {
           message : 'Introduce la contraseña' 
        });
    }

}

function LoginUser(req,res){
    
    var params = req.body;

    var email = params.email;
    var password = params.password;

    console.log('Por Aqui Paso LoginUser');

    User.findOne({ email :  email.toLowerCase()}, (err,user) => {

            if(err)
            {
                //Aquí pueden ser errores de conexión a la base de datos.
                res.status(500).send({ message : 'Error en la petición'});
            }
            else
            {
                if(!user)
                {
                    //No Encontró el usuario 
                    res.status(404).send({ message : 'El usuario no existe'});
                }
                else
                {
                    //Función de Bcrypt para comparar un campo no encriptado contra uno encriptado.
                    bcrypt.compare(password, user.password,function(err,check){
                            
                            if(check)
                            {
                                //Devolver los datos del usuario
                                if(params.gethash)
                                {
                                    //Devolver Token JWT

                                    res.status(200).send({token:jwt.createToken(user)});
                                }
                                else
                                {
                                    res.status(200).send({user});
                                }
                            }
                            else
                            {
                                res.status(404).send({ message : 'Favor de Revisar Usuario y Password'});
                            }
                    });
                }
            }

    });


}

module.exports = {
    pruebas,
    Login,
    saveUser,
    LoginUser
};