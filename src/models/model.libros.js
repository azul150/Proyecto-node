function modelLibros(dbController = null) {
    const { open, get: getOne, all, run, close } = dbController

    function getAll() {
        open()
        const query = "select * from libros;"
        const registros = all(query)
        close()
        return registros
    }

    function get(id) {
        open()
        const query = "select * from libros where id_libro = ?;"
        const registro = getOne(query, [id])
        close()
        return registro
    }

    function getByAutor(id_autor) {
        open()
        const query = "select * from libros where id_autor = ?;"
        const registros = all(query, [id_autor])
        close()
        return registros
    }

    function getByEditorial(id_editorial) {
        open()
        const query = "select * from libros where id_editorial = ?;"
        const registros = all(query, [id_editorial])
        close()
        return registros
    }

    function getByCategoria(id_categoria) {
        open()
        const query = "select * from libros where id_categoria = ?;"
        const registros = all(query, [id_categoria])
        close()
        return registros
    }

    function getLibrosCompletos() {
        open()
        const query = `
            SELECT l.id_libro, l.titulo, a.nombre as autor, e.nombre as editorial, c.nombre_categoria as categoria
            FROM libros l
            LEFT JOIN autores a ON l.id_autor = a.id_autor
            LEFT JOIN editoriales e ON l.id_editorial = e.id_editorial
            LEFT JOIN categorias c ON l.id_categoria = c.id_categoria
        `
        const registros = all(query)
        close()
        return registros
    }

     // CREATE
    function create(libro) {
        open()
        const query = "insert into libros (titulo, id_autor, id_editorial, id_categoria) values (?, ?, ?, ?);"
        const resultado = run(query, [libro.titulo, libro.id_autor, libro.id_editorial, libro.id_categoria])
        close()
        return { 
            id_libro: resultado.lastID, 
            titulo: libro.titulo,
            id_autor: libro.id_autor,
            id_editorial: libro.id_editorial,
            id_categoria: libro.id_categoria
        }
    }

    return { getAll, get, getByAutor, getByEditorial, getByCategoria, getLibrosCompletos, create }
}

export default modelLibros;