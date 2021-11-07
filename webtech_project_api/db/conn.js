const mysqlClient = require("mysql");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

var connection = mysqlClient.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
