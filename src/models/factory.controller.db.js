import controllerDbSqlite from './controller.db.sqlite.js';

function controllerDbFactory(dbdefinition) {
  const { DB_PLATFORM } = dbdefinition;
  switch (DB_PLATFORM) {
    case "sqlite":
        const {DB_NAME} = dbdefinition
        const raiz = process.cwd();
        const mydb = `${raiz}/${DB_NAME}`;
        return controllerDbSqlite(mydb);
    default:
      throw new Error(`Tipo de base de datos no soportada: ${DB_PLATFORM}`);
  }
}
export default controllerDbFactory;