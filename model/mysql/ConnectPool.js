const mysql = require('mysql');

const connectPool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laravel_videos'
});

module.exports = connectPool;