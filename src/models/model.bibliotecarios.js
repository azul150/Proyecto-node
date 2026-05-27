function modelBibliotecarios(dbController = null) {
    const { open, get: getOne, all, close } = dbController

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

    return { getAll, get }
}

export default modelBibliotecarios;