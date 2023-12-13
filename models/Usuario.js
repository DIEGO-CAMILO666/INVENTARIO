const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {type: String, required:true},
    email: {type: String, required:true,unique:true},
    estado:{type: String, required:true,emun:['Activo','Inactivo']},
    password:{type: String, required:true},
    rol:{type: String, required:true,emun:['Administrador','Docente']},
    fechaCreacion:{type: Date, required:true},
    fechaActualizacion:{type: Date, required:true}

});

module.exports = model('Ususario',UsuarioSchema);