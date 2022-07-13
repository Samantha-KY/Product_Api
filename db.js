const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "qwerty",
    database: "restapi_try",
    host: "localhost",
    port: 5432
})
module.exports = pool;