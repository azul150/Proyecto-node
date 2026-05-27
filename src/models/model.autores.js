function modelAutores(dbController = null) {
    const { open, get: getOne, all, close } = dbController

    function getAll() {
        open()
        const query = "select * from autores;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from autores where id_autor = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    return { getAll, get }
}

export default modelAutores;