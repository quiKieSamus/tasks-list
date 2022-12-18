const mysql = require('mysql');

const db = mysql.createConnection({
    database: "tasks_app_db",
    host: 'localhost',
    user: 'artorias',
    password: 'dostoyevskiwiiu10100'
});



module.exports = db;
