const { Users, Todo, TodoUpdate, TodoDelete } = require("./model.js");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Users.getByUsername(req.body.username, (err, data) => {
    // Create a user
    const todo = new Todo({
      todo: req.body.todo,
      username: req.body.username,
    });

    // Create a user
    const user = new Users({
      username: req.body.username,
    });

    if (err) {
      Todo.transactedCreateWithUser(user, todo, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Todo.",
          });
        else res.send(data);
      });
    } else {
      Todo.create(todo, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Todo.",
          });
        else res.send(data);
      });
    }
  });
};

exports.getAll = (req, res) => {
  Todo.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const todo = new TodoUpdate({
    todo: req.body.todo,
    id: req.body.id,
  });

  TodoUpdate.updateById(todo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Todo with id ${todo.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Todo with id " + todo.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  TodoDelete.delete(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the todo.",
      });
    else res.send({ message: "todo deleted ", data });
  });
};
