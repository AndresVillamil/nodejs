//console.log("Hola mundo desde Nodejs")

//Importar require
const express = require('express');
const mongoose = require('mongoose');
//Importar Schema
const TareaSchema = require('./modelos/Tarea.js');

const app = express();
//Ruta
const router = express.Router();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Conexión a base de datos desde NodeJS 
mongoose.connect("mongodb+srv://prog_web:1234@clusterprogramacionweb.pz9qz.mongodb.net/ActividadesDB?retryWrites=true&w=majority");

//Operaciones CRUD
router.get('/', (req, res) => {
    res.send("El inicio de mi API");
})

router.get('/tarea', (req, res) => {
    TareaSchema.find(function(err,datos){
        if(err){
            console.log("Error leyendo las tareas");
        }else{
            res.send(datos);
        }
    })
});

router.post('/tarea', (req, res) => {
    let nuevaTarea =new TareaSchema({
        idTarea: req.body.id,
        nombreTarea: req.body.nombre,
        detalleTarea: req.body.detalle
    });

    nuevaTarea.save(function(err, datos){
        if(err){
            console.log(err);
        }
        res.send("Tarea almacenada correctamente");
    })
});

//Prueba API Rest

app.use(router);
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000")
});