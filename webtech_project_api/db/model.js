const con = require("./conn.js");

const Users = function (user) {
  this.username = user.username;
};

const Pet = function (pet) {
  this.pet = pet.pet;
  this.username = pet.username;
};

const PetUpdate = function (pet) {
  this.pet = pet.pet;
  this.id = pet.id;
};

const PetDelete = function (pet) {
  this.id = pet.id;
};

const Hobby = function (hobby) {
  this.hobby = hobby.hobby;
  this.username = hobby.username;
};

const HobbyUpdate = function (hobby) {
  this.hobby = hobby.hobby;
  this.id = hobby.id;
};

const HobbyDelete = function (hobby) {
  this.id = hobby.id;
};

const Todo = function (todo) {
  this.todo = todo.todo;
  this.username = todo.username;
};

const TodoUpdate = function (todo) {
  this.todo = todo.todo;
  this.id = todo.id;
};

const TodoDelete = function (todo) {
  this.id = todo.id;
};

const Blog = function (blog) {
  this.blog = blog.blog;
  this.username = blog.username;
};

const BlogUpdate = function (blog) {
  this.blog = blog.blog;
  this.id = blog.id;
};

const BlogDelete = function (blog) {
  this.id = blog.id;
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

Users.getAll = (result) => {
  con.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
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

    console.log("deleted user with username: ", username);
    result(null, res);
  });
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
  result(null, { id: result.insertId, ...newPet });
};

Pet.getAll = (result) => {
  con.query(
    "SELECT users.username,pet.pet,pet.id FROM users JOIN pet ON users.username = pet.username",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("pet: ", res);
      result(null, res);
    }
  );
};

PetUpdate.updateById = (pet, result) => {
  con.query(
    "UPDATE pet SET pet = ? WHERE id = ?",
    [pet.pet, pet.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated pet: ", { ...pet });
      result(null, { ...pet });
    }
  );
};

PetDelete.delete = (id, result) => {
  con.query("delete from pet where id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pet with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted pet with id: ", id);
    result(null, res);
  });
};

Hobby.create = (newHobby, result) => {
  con.query("insert into hobby set ?", newHobby, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created hobby: ", { id: res.insertId, ...newHobby });
    result(null, { id: res.insertId, ...newHobby });
  });
};

Hobby.transactedCreateWithUser = (newUser, newHobby, result) => {
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

      con.query("INSERT INTO hobby SET ?", newHobby, function (err, result) {
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
  result(null, { id: result.insertId, ...newHobby });
};

Hobby.getAll = (result) => {
  con.query(
    "SELECT users.username,hobby.hobby,hobby.id FROM users RIGHT JOIN hobby ON users.username = hobby.username",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("hobby: ", res);
      result(null, res);
    }
  );
};

HobbyUpdate.updateById = (hobby, result) => {
  con.query(
    "UPDATE hobby SET hobby = ? WHERE id = ?",
    [hobby.hobby, hobby.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated hobby: ", { ...hobby });
      result(null, { ...hobby });
    }
  );
};

HobbyDelete.delete = (id, result) => {
  con.query("delete from hobby where id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pet with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted hobby with id: ", id);
    result(null, res);
  });
};

Todo.create = (newTodo, result) => {
  con.query("insert into todo_list set ?", newTodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created todo: ", { id: res.insertId, ...newTodo });
    result(null, { id: res.insertId, ...newTodo });
  });
};

Todo.transactedCreateWithUser = (newUser, newTodo, result) => {
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

      con.query("INSERT INTO todo_list SET ?", newTodo, function (err, result) {
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
  result(null, { id: result.insertId, ...newTodo });
};

Todo.getAll = (result) => {
  con.query(
    "SELECT users.username,todo_list.todo,todo_list.id FROM users RIGHT JOIN todo_list ON users.username = todo_list.username",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("todo: ", res);
      result(null, res);
    }
  );
};

TodoUpdate.updateById = (todo, result) => {
  con.query(
    "UPDATE todo_list SET todo = ? WHERE id = ?",
    [todo.todo, todo.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated todo: ", { ...todo });
      result(null, { ...todo });
    }
  );
};

TodoDelete.delete = (id, result) => {
  con.query("delete from todo_list where id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pet with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted todo with id: ", id);
    result(null, res);
  });
};

Blog.create = (newBlog, result) => {
  con.query("insert into blog set ?", newBlog, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created blog: ", { id: res.insertId, ...newBlog });
    result(null, { id: res.insertId, ...newBlog });
  });
};

Blog.transactedCreateWithUser = (newUser, newBlog, result) => {
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

      con.query("INSERT INTO blog SET ?", newBlog, function (err, result) {
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
  result(null, { id: result.insertId, ...newBlog });
};

Blog.getAll = (result) => {
  con.query(
    "SELECT users.username,blog.blog,blog.id FROM users RIGHT JOIN blog ON users.username = blog.username",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("blog: ", res);
      result(null, res);
    }
  );
};

BlogUpdate.updateById = (blog, result) => {
  con.query(
    "UPDATE blog SET blog = ? WHERE id = ?",
    [blog.blog, blog.id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated blog: ", { ...blog });
      result(null, { ...blog });
    }
  );
};

BlogDelete.delete = (id, result) => {
  con.query("delete from blog where id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found pet with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted blog with id: ", id);
    result(null, res);
  });
};

module.exports = {
  Users,
  Pet,
  PetUpdate,
  PetDelete,
  Hobby,
  HobbyUpdate,
  HobbyDelete,
  Todo,
  TodoUpdate,
  TodoDelete,
  Blog,
  BlogUpdate,
  BlogDelete,
};
