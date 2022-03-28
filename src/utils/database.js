import mySql from "mysql2/promise.js"

const getConnection = async () => {
    const config = {
        database: 'iot_net',
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USERNAME,
        port: process.env.DB_PORT || 3306
    }
    if (!global.dbMySqlPool) {
        // Create pool (should only happen once)
        global.dbMySqlPool = mySql.createPool(config);
        console.log("mySql pool created");
    }
    const pooledConnection = await global.dbMySqlPool.getConnection();
    pooledConnection.connection.config.namedPlaceholders = true;
    return pooledConnection;
};
  
export const mysqlQuery = async (query, params = {}) => {
const connection = await getConnection();

try {
    const [result] = await connection.query(query, params);
    connection.release();
    return result;
} catch (e) {
    connection.release();
    console.error(`mySql query error with: ${query}`);
    console.error(params);
    console.error(e);
}
};