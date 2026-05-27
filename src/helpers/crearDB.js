import Database from "better-sqlite3";

export function crearDB(){
    const raiz = process.cwd();
    const mydb = `${raiz}/app.db`
    const db = new Database(mydb)
    db.exec("PRAGMA foreign_keys = ON;");

    const createTables = `
    CREATE TABLE IF NOT EXISTS autores (
        id_autor INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre VARCHAR(100)
    );
    CREATE TABLE IF NOT EXISTS editoriales (
        id_editorial INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre VARCHAR(100)
    );
    CREATE TABLE IF NOT EXISTS categorias (
        id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre_categoria VARCHAR(50)
    );
    CREATE TABLE IF NOT EXISTS usuarios (
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre VARCHAR(100), 
        correo VARCHAR(100) UNIQUE
    );
    CREATE TABLE IF NOT EXISTS bibliotecarios (
        id_bibliotecario INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre VARCHAR(100), 
        turno VARCHAR(20)
    );
    CREATE TABLE IF NOT EXISTS libros (
        id_libro INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo VARCHAR(150),
        id_autor INT,
        id_editorial INT,
        id_categoria INT,
        FOREIGN KEY (id_autor) REFERENCES autores(id_autor),
        FOREIGN KEY (id_editorial) REFERENCES editoriales(id_editorial),
        FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
    );
    CREATE TABLE IF NOT EXISTS prestamos (
        id_prestamo INTEGER PRIMARY KEY AUTOINCREMENT,
        id_usuario INT,
        id_bibliotecario INT,
        fecha_salida DATE,
        FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
        FOREIGN KEY (id_bibliotecario) REFERENCES bibliotecarios(id_bibliotecario)
    );
    CREATE TABLE IF NOT EXISTS detalle_prestamo (
        id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
        id_prestamo INT,
        id_libro INT,
        FOREIGN KEY (id_prestamo) REFERENCES prestamos(id_prestamo),
        FOREIGN KEY (id_libro) REFERENCES libros(id_libro)
    );
    CREATE TABLE IF NOT EXISTS multas (
        id_multa INTEGER PRIMARY KEY AUTOINCREMENT,
        id_prestamo INT,
        monto DECIMAL(10,2),
        FOREIGN KEY (id_prestamo) REFERENCES prestamos(id_prestamo)
    );
    `;
    db.exec(createTables);

    // Usuarios
    const usuarios = [
        {nombre: "ana", correo: "an1@gmail.com"},
        {nombre: "luis", correo: "lu2@gmail.com"},
        {nombre: "maria", correo: "ma3@gmail.com"},
        {nombre: "juan", correo: "ju4@gmail.com"},
        {nombre: "carlos", correo: "ca5@gmail.com"}
    ]
    const insertUsuario = db.prepare(`insert into usuarios(nombre, correo) values(?,?)`)
    usuarios.forEach(user => insertUsuario.run(user.nombre, user.correo))

    // Autores
    const autores = [
        {nombre: "Gabriel García Márquez"},
        {nombre: "J.K. Rowling"},
        {nombre: "George Orwell"},
        {nombre: "Isabel Allende"},
        {nombre: "Miguel de Cervantes"}
    ];
    const insertAutor = db.prepare(`insert into autores(nombre) values(?)`);
    autores.forEach(autor => insertAutor.run(autor.nombre));

    // Editoriales
    const editoriales = [
        {nombre: "Planeta"},
        {nombre: "Salamandra"},
        {nombre: "Debolsillo"},
        {nombre: "Penguin Random House"},
        {nombre: "Alfaguara"}
    ];
    const insertEditorial = db.prepare(`insert into editoriales(nombre) values(?)`);
    editoriales.forEach(editorial => insertEditorial.run(editorial.nombre));

    // Categorias
    const categorias = [
        {nombre_categoria: "Novela"},
        {nombre_categoria: "Fantasía"},
        {nombre_categoria: "Ciencia Ficción"},
        {nombre_categoria: "Poesía"},
        {nombre_categoria: "Historia"}
    ];
    const insertCategoria = db.prepare(`insert into categorias(nombre_categoria) values(?)`);
    categorias.forEach(categoria => insertCategoria.run(categoria.nombre_categoria));

    // Bibliotecarios
    const bibliotecarios = [
        {nombre: "Carlos Pérez", turno: "Matutino"},
        {nombre: "Laura Gómez", turno: "Vespertino"},
        {nombre: "Roberto Díaz", turno: "Matutino"},
        {nombre: "Ana Martínez", turno: "Nocturno"},
        {nombre: "Javier López", turno: "Vespertino"}
    ];
    const insertBibliotecario = db.prepare(`insert into bibliotecarios(nombre, turno) values(?,?)`);
    bibliotecarios.forEach(bib => insertBibliotecario.run(bib.nombre, bib.turno));

    // Libros
    const libros = [
        {titulo: "Cien años de soledad", id_autor: 1, id_editorial: 1, id_categoria: 1},
        {titulo: "Harry Potter y la piedra filosofal", id_autor: 2, id_editorial: 2, id_categoria: 2},
        {titulo: "1984", id_autor: 3, id_editorial: 3, id_categoria: 3},
        {titulo: "La casa de los espíritus", id_autor: 4, id_editorial: 4, id_categoria: 1},
        {titulo: "Don Quijote de la Mancha", id_autor: 5, id_editorial: 5, id_categoria: 1}
    ];
    const insertLibro = db.prepare(`insert into libros(titulo, id_autor, id_editorial, id_categoria) values(?,?,?,?)`);
    libros.forEach(libro => insertLibro.run(libro.titulo, libro.id_autor, libro.id_editorial, libro.id_categoria));

    // Prestamos
    const prestamos = [
        {id_usuario: 1, id_bibliotecario: 1, fecha_salida: "2024-01-15"},
        {id_usuario: 2, id_bibliotecario: 2, fecha_salida: "2024-01-20"},
        {id_usuario: 3, id_bibliotecario: 1, fecha_salida: "2024-02-01"},
        {id_usuario: 1, id_bibliotecario: 3, fecha_salida: "2024-02-10"},
        {id_usuario: 2, id_bibliotecario: 2, fecha_salida: "2024-02-15"}
    ];
    const insertPrestamo = db.prepare(`insert into prestamos(id_usuario, id_bibliotecario, fecha_salida) values(?,?,?)`);
    prestamos.forEach(prestamo => insertPrestamo.run(prestamo.id_usuario, prestamo.id_bibliotecario, prestamo.fecha_salida));

    // Detalle Prestamo
    const detalles = [
        {id_prestamo: 1, id_libro: 1},
        {id_prestamo: 1, id_libro: 2},
        {id_prestamo: 2, id_libro: 3},
        {id_prestamo: 3, id_libro: 4},
        {id_prestamo: 4, id_libro: 5}
    ];
    const insertDetalle = db.prepare(`insert into detalle_prestamo(id_prestamo, id_libro) values(?,?)`);
    detalles.forEach(detalle => insertDetalle.run(detalle.id_prestamo, detalle.id_libro));

    // Multas
    const multas = [
        {id_prestamo: 1, monto: 50.00},
        {id_prestamo: 2, monto: 30.50},
        {id_prestamo: 3, monto: 0.00},
        {id_prestamo: 4, monto: 75.25},
        {id_prestamo: 5, monto: 20.00}
    ];
    const insertMulta = db.prepare(`insert into multas(id_prestamo, monto) values(?,?)`);
    multas.forEach(multa => insertMulta.run(multa.id_prestamo, multa.monto));

    db.close()
}