import express from 'express';
import modelAutores from '../models/model.autores.js';

const getRouterAutores = (controllerDB = null) => {
    const model = modelAutores(controllerDB);
    const router = express.Router();

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
        const { nombre } = req.body;
        const nuevoAutor = model.create({ nombre });
        res.status(201).json(nuevoAutor);
    });

    return router;
}

export default getRouterAutores;