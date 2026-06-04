import express from 'express';
import modelMultas from '../models/model.multas.js';

const getRouterMultas = (controllerDB = null) => {
    const model = modelMultas(controllerDB);
    const router = express.Router();

    router.get('/completas', (req, res) => {
        const resp = model.getMultasCompletas()
        res.send(resp);
    });

    router.get('/prestamo/:id_prestamo', (req, res) => {
        const id_prestamo = req.params.id_prestamo;
        const resp = model.getByPrestamo(id_prestamo)
        res.send(resp);
    });

    router.get('/:id', (req, res) => {
        const id = req.params.id;
        const registro = model.get(id)
        res.send(registro);
    });

    router.get('/', (req, res) => {
        const resp = model.getAll()
        res.send(resp);
    });

        // POST
    router.post('/', (req, res) => {
        const { id_prestamo, monto } = req.body;
        const nuevaMulta = model.create({ id_prestamo, monto });
        res.status(201).json(nuevaMulta);
    });

    return router;
}

export default getRouterMultas;