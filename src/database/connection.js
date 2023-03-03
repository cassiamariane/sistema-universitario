const mysql = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sistemauniversitario'
});

connection.connect();

module.exports = connection;