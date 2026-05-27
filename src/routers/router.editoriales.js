import express from 'express';
import modelEditoriales from '../models/model.editoriales.js';

const getRouterEditoriales = (controllerDB = null) => {
    const model = modelEditoriales(controllerDB);
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

export default getRouterEditoriales;