
'use strict'
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Router_ = express.Router();

//----------express - app-----------
var app = express();

//----------Esquema de modelo---------------
const personaSchema = new mongoose.Schema({
    nombre:String,
    edad:Number,
    comentario:String,
    fecha:{dia:Number,mes:Number,año:Number} 
});

//--------------Modelo-----(esquema)--------------
var Model_ = mongoose.model('usuario',personaSchema);

//--------------- controlador ---(modelo)------------
var getPersona = async function(req,res){
    var nombre_ = req.params.nombre;
    await Model_.findOne({'nombre':nombre_,'edad':'32'},function(err,user_){
        console.log(user_);
        res.send(            
            user_.get('nombre') + 
            '<br/>'+         
            user_.get('edad')
            );
    });    
}

//------ruta---(controlador)--------------------
var ruta_ = Router_.get('/Persona/:nombre', getPersona);

//-------Express App ----(ruta)--------------
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/api', ruta_);

//----------mongoose Connect-(app express listen)------------
var port = 5000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/Persona', {useNewUrlParser: true}).then( async function(err,client){
    app.listen(port, () => {
        console.log("servidor corriendo en http://localhost:5000");
    });    
}).catch(err => console.log(err));