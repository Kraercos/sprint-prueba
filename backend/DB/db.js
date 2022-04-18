const mysql = require('mysql2/promise');
require('dotenv').config();

const conection = mysql.createPool({
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    database: process.env.MYSQL_ADDON_DB,
    password: process.env.MYSQL_ADDON_PASSWORD,
});

module.exports = conection;