const mysql = require('mysql');
const mysqlConfig = require('../../config.js');

const sqlDb = mysql.createConnection(mysqlConfig);

module.exports.sqlDb = sqlDb;
