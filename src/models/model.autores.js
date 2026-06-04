function modelAutores(dbController = null) {
    const { open, get: getOne, all, run, close} = dbController

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

    // CREATE
    function create(autor) {
        open()
        const query = "insert into autores (nombre) values (?);"
        const resultado = run(query, [autor.nombre])
        close()
        return { 
            id_autor: resultado.lastID, 
            nombre: autor.nombre 
        }
    }

    return { getAll, get, create }
}

export default modelAutores;