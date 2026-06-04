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

    // POST
    router.post('/', (req, res) => {
        const { nombre, correo } = req.body;
        const nuevoUsuario = model.create({ nombre, correo });
        res.status(201).json(nuevoUsuario);
    });

    return router;
}

export default getRouterUsuarios;