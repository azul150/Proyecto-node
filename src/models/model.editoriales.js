function modelEditoriales(dbController = null) {
    const { open, get: getOne, all, close } = dbController

    function getAll() {
        open()
        const query = "select * from editoriales;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from editoriales where id_editorial = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    return { getAll, get }
}

export default modelEditoriales;