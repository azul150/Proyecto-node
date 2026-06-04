function modelMultas(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

    function getAll() {
        open()
        const query = "select * from multas;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from multas where id_multa = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    function getByPrestamo(id_prestamo) {
        open()
        const query = "select * from multas where id_prestamo = ?;"
        const registros = all(query, [id_prestamo])
        close()
        return registros
    }

    function getMultasCompletas() {
        open()
        const query = `
            SELECT m.id_multa, m.monto, p.id_prestamo, p.fecha_salida, u.nombre as usuario, u.correo
            FROM multas m
            LEFT JOIN prestamos p ON m.id_prestamo = p.id_prestamo
            LEFT JOIN usuarios u ON p.id_usuario = u.id_usuario
        `
        const registros = all(query)
        close()
        return registros
    }

    // CREATE
    function create(multa) {
        open()
        const query = "insert into multas (id_prestamo, monto) values (?, ?);"
        const resultado = run(query, [multa.id_prestamo, multa.monto])
        close()
        return { 
            id_multa: resultado.lastID, 
            id_prestamo: multa.id_prestamo,
            monto: multa.monto
        }
    }

    return { getAll, get, getByPrestamo, getMultasCompletas, create }
}

export default modelMultas;