const { Users } = require("./model.js");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a user
  const user = new Users({
    username: req.body.username,
  });

  // Save user in the database
  Users.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.send(data);
  });
};

exports.getAll = (req, res) => {
  Users.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const username = req.body.username;

  Users.delete(username, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the user.",
      });
    else res.send({ message: "user deleted ", data });
  });
};

// exports.delete = (req, res) => {
//   Customer.remove(req.params.customerId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Customer with id ${req.params.customerId}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Could not delete Customer with id " + req.params.customerId
//         });
//       }
//     } else res.send({ message: `Customer was deleted successfully!` });
//   });
// };
