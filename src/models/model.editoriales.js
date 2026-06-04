function modelEditoriales(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

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

     // CREATE
    function create(editorial) {
        open()
        const query = "insert into editoriales (nombre) values (?);"
        const resultado = run(query, [editorial.nombre])
        close()
        return { 
            id_editorial: resultado.lastID, 
            nombre: editorial.nombre 
        }
        }

    return { getAll, get, create }
}

export default modelEditoriales;