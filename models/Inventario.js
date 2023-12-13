
const { Schema, model} = require('mongoose');

const InventarioSchema = Schema({
    serial: {type: String, required:true,unique: true},
    modelo: {type: String, required:true,unique:true},
    descripcion:{type: String, required:true},
    color:{type: String, required:true},
    foto:{type: String, required:true},
    fecheCompra:{type: Date, required:true},
    precio:{type: Number, required:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario',require:false},
    marca:  {type:Schema.Types.ObjectId, ref:'Marca',require:false},
    estadoEquipo: {type:Schema.Types.ObjectId, ref:'Estado',require:false},
    tipoEquipo:{type:Schema.Types.ObjectId, ref:'TipoEquipo',require:false},
    fechaCreacion:{type: Date, required:true},
    fechaActualizacion:{type: Date, required:true}

});

module.exports = model('Inventario',InventarioSchema);