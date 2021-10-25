const { Users, Hobby, HobbyUpdate, HobbyDelete } = require("./model.js");

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
    const hobby = new Hobby({
      hobby: req.body.hobby,
      username: req.body.username,
    });

    // Create a user
    const user = new Users({
      username: req.body.username,
    });

    if (err) {
      Hobby.transactedCreateWithUser(user, hobby, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Hobby.",
          });
        else res.send(data);
      });
    } else {
      Hobby.create(hobby, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Hobby.",
          });
        else res.send(data);
      });
    }
  });
};

exports.getAll = (req, res) => {
  Hobby.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving hobbies.",
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

  const hobby = new HobbyUpdate({
    hobby: req.body.hobby,
    id: req.body.id,
  });

  HobbyUpdate.updateById(hobby, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Hobby with id ${hobby.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Hobby with id " + hobby.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  HobbyDelete.delete(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the hobby.",
      });
    else res.send({ message: "hobby deleted ", data });
  });
};
