const { Router } = require('express');
const router = Router();
const conection = require('../DB/db');
const arreroFecha = require('../helpers/arregloFecha');

// Select
router.get('/vehiculo', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT * FROM vehiculo');
        const result = arreroFecha(rows);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

// Insert
router.post('/vehiculo', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT * FROM vehiculo WHERE placa = ?', [req.body.placa]);
        if (rows.length === 0) {
            const fields = Object.keys(req.body);
            await conection.query(`INSERT INTO vehiculo (${fields.join()}) VALUES (?, ?, ?, ?, ?)`, Object.values(req.body))
            const lastDate = await conection.query('SELECT * FROM vehiculo WHERE placa = ?', [req.body.placa]);
            res.status(200).json(lastDate[0]);
        } else {
            res.status(400).json({ "Error": `El vehiculo con ${req.body.placa} placa ya existe` });
        }
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
});

// Update
router.put('/vehiculo/:placa', async (req, res) => {
    try {
        const { placa } = req.params;
        const { modelo, fv_seguro, fv_tecnicomecanica, id_linea } = req.body;
        if (placa && modelo && fv_seguro && fv_tecnicomecanica && id_linea) {
            const fields = Object.keys(req.body);
            const fieldsQuery = fields.map(field => {
                return `${field} = "${req.body[field]}"`
            })
            const result = await conection.query(`UPDATE vehiculo SET ${fieldsQuery.join()} WHERE placa = '${placa}'`)
            res.status(200).json(result);
        } else {
            res.status(400).json({ "Error": "Faltan datos" });
        }
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

// Update
router.patch('/vehiculo/:placa', async (req, res) => {
    try {
        const { placa } = req.params;
        const fields = Object.keys(req.body);
        const fieldsQuery = fields.map(field => {
            return `${field} = "${req.body[field]}"`
        })
        const result = await conection.query(`UPDATE vehiculo SET ${fieldsQuery.join()} WHERE placa = '${placa}'`)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

// Delete
router.delete('/vehiculo/:placa', async (req, res) => {
    try {
        const { placa } = req.params;
        const result = await conection.query('DELETE FROM vehiculo WHERE placa = ?', [placa]);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})
// Mayor y modelo minimo
router.get('/vehiculo/MinMax', async (req, res) => {
    try {
        const [rows_modelo_max] = await conection.query('SELECT MAX(modelo) Modelo_max  FROM vehiculo;');
        const Modelo_max = rows_modelo_max[0].Modelo_max;
        const [rows_modelo_min] = await conection.query('SELECT MIN(modelo) Modelo_min  FROM vehiculo;');
        const Modelo_min = rows_modelo_min[0].Modelo_min;
        res.status(200).json({ Modelo_max, Modelo_min });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

// Consulta por un rango de fecha
router.post('/vehiculo/fechaSeguro', async (req, res) => {
    try {
        const { fecha_inicio, fecha_fin } = req.body;
        const [rows] = await conection.query(`SELECT * FROM vehiculo WHERE fv_seguro BETWEEN '${fecha_inicio}' AND '${fecha_fin}'`);
        const result = arreroFecha(rows);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

// Sumar modelos
router.get('/vehiculo/sumarModelo', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT SUM(modelo) Modelo_sum  FROM vehiculo;');
        const modelo = rows[0].Modelo_sum;
        res.status(200).json(modelo);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

// Promediar modelos
router.get('/vehiculo/promediarModelo', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT AVG(modelo) Modelo_prom  FROM vehiculo;');
        const modelo = rows[0].Modelo_prom;
        res.status(200).json(modelo);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

module.exports = router;