function modelPrestamos(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

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

     // CREATE
    function create(prestamo) {
        open()
        const query = "insert into prestamos (id_usuario, id_bibliotecario, fecha_salida) values (?, ?, ?);"
        const resultado = run(query, [prestamo.id_usuario, prestamo.id_bibliotecario, prestamo.fecha_salida])
        close()
        return { 
            id_prestamo: resultado.lastID, 
            id_usuario: prestamo.id_usuario,
            id_bibliotecario: prestamo.id_bibliotecario,
            fecha_salida: prestamo.fecha_salida
        }
    }

    return { getAll, get, getByUsuario, getByBibliotecario, getPrestamosCompletos, create }
}

export default modelPrestamos;