function modelDetallePrestamo(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

    function getAll() {
        open()
        const query = "select * from detalle_prestamo;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from detalle_prestamo where id_detalle = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    function getByPrestamo(id_prestamo) {
        open()
        const query = `SELECT dp.*, l.titulo as libro_titulo FROM detalle_prestamo dp LEFT JOIN libros l ON dp.id_libro = l.id_libro WHERE dp.id_prestamo = ?;`
        const registros = all(query, [id_prestamo])
        close()
        return registros
    }

    // CREATE
    function create(detalle) {
        open()
        const query = "insert into detalle_prestamo (id_prestamo, id_libro) values (?, ?);"
        const resultado = run(query, [detalle.id_prestamo, detalle.id_libro])
        close()
        return { 
            id_detalle: resultado.lastID, 
            id_prestamo: detalle.id_prestamo,
            id_libro: detalle.id_libro
        }
    }

    return { getAll, get, getByPrestamo, create }
}

export default modelDetallePrestamo;