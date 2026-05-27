import express from 'express';
import modelUsuarios from '../models/model.usuarios.js';

const getRouterUsuarios = (controllerDB = null) => {
    const model = modelUsuarios(controllerDB);
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

export default getRouterUsuarios;