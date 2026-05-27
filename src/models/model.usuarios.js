function modelUsuarios(dbController = null) {
    const { open, get: getOne, all, close } = dbController

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

    return { getAll, get }
}

export default modelUsuarios;