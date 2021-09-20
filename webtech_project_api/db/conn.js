const mysqlClient = require("mysql");

var connection = mysqlClient.createConnection({
  host: "localhost",
  user: "admin",
  password: "adminA1@",
  database: "webtech",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;
