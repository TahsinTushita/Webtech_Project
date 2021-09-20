const { Users, Pet } = require("./model.js");

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
    const pet = new Pet({
      pet: req.body.pet,
      username: req.body.username,
    });

    // Create a user
    const user = new Users({
      username: req.body.username,
    });

    if (err) {
      Pet.transactedCreateWithUser(user, pet, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer.",
          });
        else res.send(data);
      });
    } else {
      Pet.create(pet, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer.",
          });
        else res.send(data);
      });
    }
  });
  // Save pet in the database
};
