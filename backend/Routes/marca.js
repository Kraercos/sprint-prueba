const { Router } = require('express');
const router = Router();
const conection = require('../DB/db');

router.get('/marca', async (req, res) => {
    try {
        const [rows] = await conection.query('SELECT * FROM marca');
        return res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

router.post('/marca', async (req, res) => {
    try {
        const { activa, descripcion_marca, nombre_marca } = req.body;
        if (activa === "si" || activa === "no") {
            if (descripcion_marca.length < 100 && nombre_marca.length < 50) {
                const fields = Object.keys(req.body);
                await conection.query(`INSERT INTO marca (${fields.join()}) VALUES (?, ?, ?)`, Object.values(req.body))
                const [rows] = await conection.query(`SELECT * FROM marca WHERE nombre_marca = '${nombre_marca}'`)
                return res.status(200).json(rows);
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

router.patch('/marca/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const fields = Object.keys(req.body);
        const fieldsQuery = fields.map(field => {
            return `${field} = "${req.body[field]}"`
        })
        const result = await conection.query(`UPDATE marca SET ${fieldsQuery.join()} WHERE id_marca = ${id}`)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

router.put('/marca/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { activa, descripcion_marca, nombre_marca } = req.body;
        if (activa === "si" || activa === "no") {
            if (descripcion_marca.length < 100 && nombre_marca.length < 50) {
                const fields = Object.keys(req.body);
                const fieldsQuery = fields.map(field => {
                    return `${field} = "${req.body[field]}"`
                })
                const result = await conection.query(`UPDATE marca SET ${fieldsQuery.join()} WHERE id_marca = ${id}`)
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
})

router.delete('/marca/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await conection.query(`DELETE FROM marca WHERE id_marca = ${id}`);
        res.status(200).json({ "Mensaje": "Marca eliminada" });
    } catch (error) {
        res.status(500).json({ "Error": "Error en el servidor" });
    }
})

module.exports = router;