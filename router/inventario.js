const{ Router } = require('express');
const Inventario = require('../models/inventario');
const bycript = require('bcryptjs');
const {validationResult,check} = require('express-validator');

const router = Router();

router.post('/',[
    check('serial','invalid.serial').not().isEmpty(),
    check('modelo','invalid.modelo').not().isEmpty(),
    check('descripcion','invalid.descripcion').not().isEmpty(),
    check('color','invalid.color').not().isEmpty(),
    check('foto','invalid.foto').not().isEmpty(),
    check('fechaCompra','invalid.fechaCompra').not().isEmpty(),
    check('precio','invalid.precio').not().not().isEmpty().isFloat({ min:0}),
    check('usuario','invalid.usuario').not().isEmpty(),
    check('marca','invalid.marca').not().isEmpty(),
    check('estadoEquipo','invalid.estadoEquipo').not().isEmpty(),
    check('tipoEquipo','invalid.tipoEquipo').not().isEmpty(),

], async function(req, res){
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array})
        }

        const existeInventario = await Inventario.findOne({serial: req.body.serial});
        if(existeInventario){
          return res.status(400).send(' ya existe ese serial en el inventario');  
        }

        let inventario = new Inventario();
        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.color = req.body.color;
        inventario.foto = req.body.foto;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario_id;
        inventario.marca = req.body.marca_id;
        inventario.estadoEquipo = req.body.estadoEquipo_id;
        inventario.tipoEquipo = req.body.tipoEquipo_id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();

        inventario = await inventario.save();
        res.send(inventario);

    } catch (error) {
        console.log(error);
    }
});

router.get('/', async function(req,res){
    try {
        const inventarios = await Inventario.find().populate([
           {
                path:'usuario', select:'nombre email estado'
           },
           {
                path:'marca', select:'nombre estado'
           },
           {
                path:'estadoEquipo', select:'nombre estado'
             
           },
           {
                path:'tipoEquipo', select:'nombre estado'
           }
        ]);
        res.send(inventarios);
    } catch (error) {
        console.log(error);
        res.status(500).send('error en el servidor');
    }
});

module.exports = router;