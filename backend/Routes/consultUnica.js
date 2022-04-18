const { Router } = require('express');
const router = Router();
const conection = require('../DB/db');
const arreroFecha = require('../helpers/arregloFecha');

router.get('/consultaUnica', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT placa, modelo, descripcion_linea, descripcion_marca FROM vehiculo INNER JOIN linea ON vehiculo.id_linea = linea.id_linea INNER JOIN marca ON linea.id_marca = marca.id_marca;');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

router.get('/vehiculoLineaActiva', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT * FROM linea INNER JOIN vehiculo ON linea.id_linea = vehiculo.id_linea WHERE linea.activa = "si"')
        const result = arreroFecha(rows);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

module.exports = router;