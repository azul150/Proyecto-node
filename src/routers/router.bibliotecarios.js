import express from 'express';
import modelBibliotecarios from '../models/model.bibliotecarios.js';

const getRouterBibliotecarios = (controllerDB = null) => {
    const model = modelBibliotecarios(controllerDB);
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

    return router;
}

export default getRouterBibliotecarios;