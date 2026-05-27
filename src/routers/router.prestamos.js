import express from 'express';
import modelPrestamos from '../models/model.prestamos.js';

const getRouterPrestamos = (controllerDB = null) => {
    const model = modelPrestamos(controllerDB);
    const router = express.Router();

    router.get('/completos', (req, res) => {
        const resp = model.getPrestamosCompletos()
        res.send(resp);
    });

    router.get('/usuario/:id_usuario', (req, res) => {
        const id_usuario = req.params.id_usuario;
        const resp = model.getByUsuario(id_usuario)
        res.send(resp);
    });

    router.get('/bibliotecario/:id_bibliotecario', (req, res) => {
        const id_bibliotecario = req.params.id_bibliotecario;
        const resp = model.getByBibliotecario(id_bibliotecario)
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

    return router;
}

export default getRouterPrestamos;