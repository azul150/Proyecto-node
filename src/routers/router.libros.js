import express from 'express';
import modelLibros from '../models/model.libros.js';

const getRouterLibros = (controllerDB = null) => {
    const model = modelLibros(controllerDB);
    const router = express.Router();

    router.get('/completos', (req, res) => {
        const resp = model.getLibrosCompletos()
        res.send(resp);
    });

    router.get('/autor/:id_autor', (req, res) => {
        const id_autor = req.params.id_autor;
        const resp = model.getByAutor(id_autor)
        res.send(resp);
    });

    router.get('/editorial/:id_editorial', (req, res) => {
        const id_editorial = req.params.id_editorial;
        const resp = model.getByEditorial(id_editorial)
        res.send(resp);
    });

    router.get('/categoria/:id_categoria', (req, res) => {
        const id_categoria = req.params.id_categoria;
        const resp = model.getByCategoria(id_categoria)
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
        const { titulo, id_autor, id_editorial, id_categoria } = req.body;
        const nuevoLibro = model.create({ titulo, id_autor, id_editorial, id_categoria });
        res.status(201).json(nuevoLibro);
    });

    return router;
}

export default getRouterLibros;