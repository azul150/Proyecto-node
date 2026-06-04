import express from 'express';
import modelCategorias from '../models/model.categorias.js';

const getRouterCategorias = (controllerDB = null) => {
    const model = modelCategorias(controllerDB);
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
        const { nombre_categoria } = req.body;
        const nuevaCategoria = model.create({ nombre_categoria });
        res.status(201).json(nuevaCategoria);
    });

    return router;
}

export default getRouterCategorias;