import express from 'express';
import { getVariablesDB, getVariablesEntorno } from './src/helpers/getVariablesEntorno.js';
import controllerDbFactory from './src/models/factory.controller.db.js';
import getRouterAutores from './src/routers/router.autores.js';
import getRouterEditoriales from './src/routers/router.editoriales.js';
import getRouterCategorias from './src/routers/router.categorias.js';
import getRouterUsuarios from './src/routers/router.usuarios.js';
import getRouterBibliotecarios from './src/routers/router.bibliotecarios.js';
import getRouterLibros from './src/routers/router.libros.js';
import getRouterPrestamos from './src/routers/router.prestamos.js';
import getRouterDetallePrestamo from './src/routers/router.detallePrestamo.js';
import getRouterMultas from './src/routers/router.multas.js';

const { PORT, HOST } = getVariablesEntorno();
const controllerDB = controllerDbFactory(getVariablesDB())

const routerAutores = getRouterAutores(controllerDB);
const routerEditoriales = getRouterEditoriales(controllerDB);
const routerCategorias = getRouterCategorias(controllerDB);
const routerUsuarios = getRouterUsuarios(controllerDB);
const routerBibliotecarios = getRouterBibliotecarios(controllerDB);
const routerLibros = getRouterLibros(controllerDB);
const routerPrestamos = getRouterPrestamos(controllerDB);
const routerDetallePrestamo = getRouterDetallePrestamo(controllerDB);
const routerMultas = getRouterMultas(controllerDB);

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
  res.send("Bienvenido a la API de Biblioteca");
});

app.use('/autores', routerAutores);
app.use('/editoriales', routerEditoriales);
app.use('/categorias', routerCategorias);
app.use('/usuarios', routerUsuarios);
app.use('/bibliotecarios', routerBibliotecarios);
app.use('/libros', routerLibros);
app.use('/prestamos', routerPrestamos);
app.use('/detalle-prestamo', routerDetallePrestamo);
app.use('/multas', routerMultas);

app.use((_, res) => {
  res.status(404).send("404 página no encontrada");
});

app.listen(PORT, () => {
  console.log(`Servidor en http://${HOST}:${PORT}`);
});