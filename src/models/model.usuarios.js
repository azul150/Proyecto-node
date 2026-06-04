function modelUsuarios(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

    function getAll() {
        open()
        const query = "select * from usuarios;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from usuarios where id_usuario = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    // CREATE
    function create(usuarios) {
        open()
        const query = "insert into usuarios (nombre, correo) values (?, ?);"
        const resultado = run(query, [usuarios.nombre, usuarios.correo])
        close()
        return { 
            id_usuario: resultado.lastID, 
            nombre: usuarios.nombre,
            correo: usuarios.correo
        }
    }

    return { getAll, get, create }
}

export default modelUsuarios;