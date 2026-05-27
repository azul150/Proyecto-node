function modelPrestamos(dbController = null) {
    const { open, get: getOne, all, close } = dbController

    function getAll() {
        open()
        const query = "select * from prestamos;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from prestamos where id_prestamo = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    function getByUsuario(id_usuario) {
        open()
        const query = "select * from prestamos where id_usuario = ?;"
        const registros = all(query, [id_usuario])
        close()
        return registros
    }

    function getByBibliotecario(id_bibliotecario) {
        open()
        const query = "select * from prestamos where id_bibliotecario = ?;"
        const registros = all(query, [id_bibliotecario])
        close()
        return registros
    }

    function getPrestamosCompletos() {
        open()
        const query = `
            SELECT p.id_prestamo, u.nombre as usuario, u.correo, b.nombre as bibliotecario, b.turno, p.fecha_salida,
            (SELECT GROUP_CONCAT(l.titulo, ', ') FROM detalle_prestamo dp LEFT JOIN libros l ON dp.id_libro = l.id_libro WHERE dp.id_prestamo = p.id_prestamo) as libros_prestados
            FROM prestamos p
            LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
            LEFT JOIN bibliotecarios b ON p.id_bibliotecario = b.id_bibliotecario
        `
        const registros = all(query)
        close()
        return registros
    }

    return { getAll, get, getByUsuario, getByBibliotecario, getPrestamosCompletos }
}

export default modelPrestamos;