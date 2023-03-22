const { Sequelize } = require('sequelize');
const mysql = require("mysql2");
// start Code for Create the table if not exits
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",//add db password
  });
  // Run create database statement
  connection.query(
    `CREATE DATABASE IF NOT EXISTS contact_application`,
    function (err, results) {
      console.log(results);
      console.log(err);
    }
  );
connection.end();
// End Code for Create the table if not exits

const sequelize = new Sequelize('contact_application', 'root', 'PASSWORD', {
    host: 'localhost',
    logging: (...msg) => console.log(msg),
    dialect: 'mysql' //| 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
const connect = sequelize.authenticate()
module.exports.db = connect;
module.exports.sequelize=sequelize;
