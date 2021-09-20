const con = require("./conn.js");

const Users = function (user) {
  this.username = user.username;
};

const Pet = function (pet) {
  this.pet = pet.pet;
  this.username = pet.username;
};

Pet.create = (newPet, result) => {
  con.query("insert into pet set ?", newPet, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created pet: ", { id: res.insertId, ...newPet });
    result(null, { id: res.insertId, ...newPet });
  });
};

Pet.transactedCreateWithUser = (newUser, newPet, result) => {
  con.beginTransaction(function (err) {
    if (err) {
      throw err;
    }
    con.query("INSERT INTO users SET ?", newUser, function (err, result) {
      if (err) {
        con.rollback(function () {
          throw err;
        });
      }

      var log = "User " + result.insertId + " added";

      con.query("INSERT INTO pet SET ?", newPet, function (err, result) {
        if (err) {
          con.rollback(function () {
            throw err;
          });
        }
        con.commit(function (err) {
          if (err) {
            con.rollback(function () {
              throw err;
            });
          }
          console.log("success!");
        });
      });
    });
  });
};

Users.create = (newUser, result) => {
  con.query("insert into users set ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Users.getByUsername = (username, result) => {
  con.query(`SELECT * FROM users WHERE username = ?`, username, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Users.delete = (username, result) => {
  con.query("delete from users where username = ?", username, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

module.exports = {
  Users,
  Pet,
};
