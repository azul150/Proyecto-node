# Biblioteca API

## Materia: Aplicaciones con base de datos

## Profesor: Jesus Alejandro Flores Hernandez

## Integrantes del equipo
- Iván Enrique Cruz Acosta (210690) Rol: Desarrollador
- Nery Enrique Lopez Mendoza (210361) Rol: QA
- Fredier Antonio Sanchez Estrada (184099) Rol: Desarrollador

## Carrera: ISC

## Índice
1. [Planteamiento del Problema](#planteamiento-del-problema)
2. [Instalación](#instalación)
3. [Crear la base de datos](#crear-la-base-de-datos)
4. [Ejecutar el servidor](#ejecutar-el-servidor)
5. [Base de datos (explicación)](#base-de-datos-explicación)
6. [Tablas SQL y datos de ejemplo](#tablas-sql-y-datos-de-ejemplo)

## Planteamiento del Problema
Los métodos tradicionales y manuales de gestión bibliotecaria suelen generar inconsistencias, pérdida de registros en los préstamos físicos y complicaciones al calcular sanciones por entregas extemporáneas. Esta API soluciona estas deficiencias centralizando el inventario, los usuarios y el control de penalizaciones mediante un modelo relacional estricto que asegura la integridad de los datos.

## Instalación
Para instalar las dependencias necesarias para la aplicación ejecute este comando en Git Bash
```bash
npm install
```

## Crear la base de datos
Para crear la base de datos ejecute el siguiente comando en Git Bash
```bash
node crearDB.js
``` 
Este mismo comando hace que la base de datos se llene con datos de ejemplo

## Ejecutar el servidor
Una vez creada la base de datos ejecute el siguiente comando en Git Bash para iniciar la aplicación
```bash
node server.js
```
Una vez hecho todos estos pasos se pueden hacer consultas en el archivo consultas.http y si desea agregar un nuevo registro a alguna tabla puede realizarlo desde agregar.http

## Base de datos (explicación)
La base de datos está compuesta por nueve tablas que permiten organizar la información en diferentes entidades y establecer relaciones entre ellas mediante llaves primarias (PRIMARY KEY) y llaves foráneas (FOREIGN KEY).
* Autores.
* Editoriales.
* Categorías.
* Usuarios.
* Bibliotecarios.
* Libros
* Préstamos.
* Detalle_Préstamos.
* Multas

I. La Estructura del Conocimiento (Catálogo de Libros)
El corazón del sistema es la tabla de Libros, pero esta no funciona de forma aislada. Para evitar la redundancia de datos (un error común en registros físicos donde el nombre de un autor se escribe de cinco formas distintas), el sistema desglosa la información en entidades maestras: Autores, Editoriales y Categorías.

Al registrar un nuevo ejemplar, el bibliotecario no escribe el nombre del autor; lo selecciona de un catálogo preexistente vinculado mediante llaves foráneas. Esto permite que, con un solo clic, el sistema pueda generar reportes exhaustivos como: "Listar todos los libros de la categoría 'Ciencia Ficción' publicados por la 'Editorial Alfaguara' cuyos autores sean de origen latinoamericano".

Esta arquitectura garantiza que, si se decide corregir el nombre de una editorial, el cambio se refleje automáticamente en los miles de libros asociados a ella, manteniendo la integridad de la base de datos de manera global.

II. Gestión de Actores y Responsabilidades
El sistema reconoce dos tipos de actores humanos con roles claramente diferenciados:

Usuarios: Son los clientes o lectores. El sistema almacena su información personal para permitir su identificación unívoca. Cada usuario posee un historial que lo sigue: libros leídos, frecuencia de visitas y, lo más importante, su estatus de solvencia (si tiene multas pendientes o no).

Bibliotecarios: Son los administradores del sistema. La narrativa del software establece que ninguna acción de préstamo ocurre en el vacío; cada transacción debe ser autorizada por un bibliotecario registrado. Esto crea una cadena de custodia y responsabilidad, permitiendo auditar quién aprobó la salida de un libro valioso en una fecha determinada.

III. El Ciclo de Vida del Préstamo y Detalle
La operación más crítica del sistema es el proceso de salida de material. A diferencia de un cuaderno de bitácora, el sistema separa el préstamo en dos niveles para maximizar la precisión:

La Tabla Préstamos: Registra la cabecera de la transacción (quién se lleva los libros, qué bibliotecario autoriza y en qué fecha se realiza la operación).

La Tabla Detalle_Préstamos: Esta es una tabla de ruptura que permite que un usuario se lleve varios libros bajo un mismo folio de préstamo. Aquí se especifica exactamente qué títulos salieron de los estantes.
Esta separación permite que el sistema detecte errores lógicos: si un bibliotecario intenta prestar un libro que ya está marcado como "fuera de stock" o "en préstamo", el sistema genera una alerta inmediata, impidiendo la duplicidad de la transacción, algo que en papel solo se descubriría tras una revisión exhaustiva y tardía.

IV. Régimen de Control y Sanciones (Multas)
Para asegurar el retorno oportuno de los ejemplares, el sistema integra un módulo de Multas. Esta entidad está directamente vinculada a la tabla de préstamos. La narrativa del sistema establece que la base de datos es capaz de calcular, basándose en la fecha de devolución esperada vs. la fecha real, si un usuario ha incurrido en una falta.
El registro de multas permite llevar un control contable de los montos generados, los montos pagados y los saldos pendientes. Un usuario con multas activas puede ser restringido automáticamente por el sistema para nuevos préstamos, forzando así una cultura de responsabilidad y cuidado del material bibliográfico.

V. Ventajas Competitivas de la Automatización
Finalmente, la narrativa del sistema destaca la facilidad de recuperación de información. Mientras que en un sistema físico buscar un libro por "Categoría" obligaría al personal a recorrer los pasillos o revisar ficheros por horas, en este sistema digital basta con una consulta filtrada. La capacidad de realizar modificaciones masivas sin riesgo de "datos huérfanos", la eliminación de la duplicidad de registros y la mejora drástica en los tiempos de atención al usuario final, convierten a esta base de datos en una herramienta de gestión estratégica que eleva la eficiencia institucional a niveles profesionales.


## Tablas SQL y datos de ejemplo
### Tablas SQL
```sql
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
```

### Datos de ejemplo
Cada tabla cuenta con un total de 5 datos de ejemplo
```sql
-- Insertar Usuarios
INSERT INTO usuarios (nombre, correo) VALUES 
('ana', 'an1@gmail.com'),
('luis', 'lu2@gmail.com'),
('maria', 'ma3@gmail.com'),
('juan', 'ju4@gmail.com'),
('carlos', 'ca5@gmail.com');

-- Insertar Autores
INSERT INTO autores (nombre) VALUES 
('Gabriel García Márquez'),
('J.K. Rowling'),
('George Orwell'),
('Isabel Allende'),
('Miguel de Cervantes');

-- Insertar Editoriales
INSERT INTO editoriales (nombre) VALUES 
('Planeta'),
('Salamandra'),
('Debolsillo'),
('Penguin Random House'),
('Alfaguara');

-- Insertar Categorias
INSERT INTO categorias (nombre_categoria) VALUES 
('Novela'),
('Fantasía'),
('Ciencia Ficción'),
('Poesía'),
('Historia');

-- Insertar Bibliotecarios
INSERT INTO bibliotecarios (nombre, turno) VALUES 
('Carlos Pérez', 'Matutino'),
('Laura Gómez', 'Vespertino'),
('Roberto Díaz', 'Matutino'),
('Ana Martínez', 'Nocturno'),
('Javier López', 'Vespertino');

-- Insertar Libros
INSERT INTO libros (titulo, id_autor, id_editorial, id_categoria) VALUES 
('Cien años de soledad', 1, 1, 1),
('Harry Potter y la piedra filosofal', 2, 2, 2),
('1984', 3, 3, 3),
('La casa de los espíritus', 4, 4, 1),
('Don Quijote de la Mancha', 5, 5, 1);

-- Insertar Prestamos
INSERT INTO prestamos (id_usuario, id_bibliotecario, fecha_salida) VALUES 
(1, 1, '2024-01-15'),
(2, 2, '2024-01-20'),
(3, 1, '2024-02-01'),
(1, 3, '2024-02-10'),
(2, 2, '2024-02-15');

-- Insertar Detalle Prestamo
INSERT INTO detalle_prestamo (id_prestamo, id_libro) VALUES 
(1, 1),
(1, 2),
(2, 3),
(3, 4),
(4, 5);

-- Insertar Multas
INSERT INTO multas (id_prestamo, monto) VALUES 
(1, 50.00),
(2, 30.50),
(3, 0.00),
(4, 75.25),
(5, 20.00);
```