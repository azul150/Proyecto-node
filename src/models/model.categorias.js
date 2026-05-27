function modelCategorias(dbController = null) {
    const { open, get: getOne, all, close } = dbController

    function getAll() {
        open()
        const query = "select * from categorias;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from categorias where id_categoria = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    return { getAll, get }
}

export default modelCategorias;