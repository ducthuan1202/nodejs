require("dotenv").config();
const Sequelize = require('sequelize');

const _env = (attributeName, defaultValue = '') => {
    if (process.env.hasOwnProperty(attributeName)) {
        return process.env[attributeName];
    }
    return defaultValue;
}

const host = _env('DB_HOST', 'localhost');
const database = _env('DB_DATABASE', 'test');
const user = _env('DB_USERNAME', 'root');
const password = _env('DB_PASSWORD');
const port = _env('DB_PORT', 3306);
const charset = _env('DB_CHARSET', 'utf8');
const collate = _env('DB_COLLATE', 'utf8_general_ci');
const driver = _env('DB_DRIVER', 'mysql');


module.exports = new Sequelize(database, user, password, {
    host: host,
    port: port,
    dialect: driver, // kiểu cơ sở dữ liệu
    logging: false, // default: true => console.log truy vấn
    pool: {
        max: 5, // số kết nối tối đa tại 1 thời điểm 
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: false,
        timestamps: false,
        freezeTableName: false,
        charset: charset,
        dialectOptions: {
            collate: collate
        }
    },
    operatorsAliases: false
});
