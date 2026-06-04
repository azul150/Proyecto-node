function modelBibliotecarios(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

    function getAll() {
        open()
        const query = "select * from bibliotecarios;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from bibliotecarios where id_bibliotecario = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    // CREATE
    function create(bibliotecario) {
        open()
        const query = "insert into bibliotecarios (nombre, turno) values (?, ?);"
        const resultado = run(query, [bibliotecario.nombre, bibliotecario.turno])
        close()
        return { 
            id_bibliotecario: resultado.lastID, 
            nombre: bibliotecario.nombre, 
            turno: bibliotecario.turno
        }
    }

    return { getAll, get, create }
}

export default modelBibliotecarios;