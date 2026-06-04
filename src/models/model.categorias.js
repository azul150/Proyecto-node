function modelCategorias(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

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

     // CREATE
    function create(categoria) {
        open()
        const query = "insert into categorias (nombre_categoria) values (?);"
        const resultado = run(query, [categoria.nombre_categoria])
        close()
        return { 
            id_categoria: resultado.lastID, 
            nombre_categoria: categoria.nombre_categoria 
        }
    }

    return { getAll, get, create }
}

export default modelCategorias;