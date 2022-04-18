const { Router } = require('express');
const router = Router();
const conection = require('../DB/db');

router.get('/linea', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT * FROM linea');
        return res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

router.post('/linea', async (req, res) => {
    try {
        const { activa, descripcion_linea, nombre_linea } = req.body;
        if (activa === 'si' || activa === 'no') {
            if (descripcion_linea.length < 100 && nombre_linea.length < 50) {
                const fields = Object.keys(req.body);
                await conection.query(`INSERT INTO linea (${fields.join()}) VALUES (?, ?, ?, ?)`, Object.values(req.body))
                const [rows] = await conection.query(`SELECT * FROM linea WHERE nombre_linea = '${nombre_linea}'`)
                res.status(200).json(rows);
            } else {
                res.status(400).json({ "Error": "La descripcion o el nombre de la marca es muy largo" });
            }
        } else {
            res.status(400).json({ "Error": "El campo activa solo puede ser si o no" });
        }
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

router.put('/linea/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { activa, descripcion_linea, nombre_linea } = req.body;
        if (activa === 'si' || activa === 'no') {
            if (descripcion_linea.length < 100 && nombre_linea.length < 50) {
                const fields = Object.keys(req.body);
                const fieldsQuery = fields.map(field => {
                    return `${field} = "${req.body[field]}"`
                })
                const result = await conection.query(`UPDATE linea SET ${fieldsQuery.join()} WHERE id_linea = ${id}`)
                res.status(200).json(result);
            } else {
                res.status(400).json({ "Error": "La descripcion o el nombre de la marca es muy largo" });
            }
        } else {
            res.status(400).json({ "Error": "El campo activa solo puede ser si o no" });
        }
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
});

router.patch('/linea/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fields = Object.keys(req.body);
        const fieldsQuery = fields.map(field => {
            return `${field} = "${req.body[field]}"`
        })
        const result = await conection.query(`UPDATE linea SET ${fieldsQuery.join()} WHERE id_marca = ${id}`)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

router.delete('/linea/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await conection.query(`DELETE FROM linea WHERE id_linea = ${id}`)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

// Cuenta las lineas que estan activas e inactivas
router.get('/linea/actividad', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT COUNT(*) FROM linea WHERE activa = "si"');
        const [rows2] = await conection.query('SELECT COUNT(*) FROM linea WHERE activa = "no"');
        const inactiva = rows2[0]['COUNT(*)'];
        const activa = rows[0]['COUNT(*)'];
        const result = {
            "activa": activa,
            "inactiva": inactiva
        }
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})


module.exports = router;