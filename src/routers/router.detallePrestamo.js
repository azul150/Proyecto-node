import express from 'express';
import modelDetallePrestamo from '../models/model.detallePrestamo.js';

const getRouterDetallePrestamo = (controllerDB = null) => {
    const model = modelDetallePrestamo(controllerDB);
    const router = express.Router();

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
        const { id_prestamo, id_libro } = req.body;
        const nuevoDetalle = model.create({ id_prestamo, id_libro });
        res.status(201).json(nuevoDetalle);
    });

    return router;
}

export default getRouterDetallePrestamo;