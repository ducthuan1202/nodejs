const mysql = require('mysql');

const host = process.env.DB_HOST;
const database = process.env.DB_DATABASE;
const user = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const charset = process.env.DB_CHARSET;
const connectionLimit = process.env.DB_CONNECT_LIMIT;

const connectPool = mysql.createPool({connectionLimit,host,user,password,database,port,charset});

console.log(`
    Connect MySQL
    ---------------
    user:${user}
    password:${password}
    database:${database}
    port:${port}
    charset:${charset}
    connect limit:${connectionLimit}
    ---------------
`);

module.exports = connectPool;