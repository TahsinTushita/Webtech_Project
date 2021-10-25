const { Users, Pet, PetUpdate, PetDelete } = require("./model.js");

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
              err.message || "Some error occurred while creating the Pet.",
          });
        else res.send(data);
      });
    } else {
      Pet.create(pet, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Pet.",
          });
        else res.send(data);
      });
    }
  });
  // Save pet in the database
};

exports.getAll = (req, res) => {
  Pet.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pets.",
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

  const pet = new PetUpdate({
    pet: req.body.pet,
    id: req.body.id,
  });

  PetUpdate.updateById(pet, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Pet with id ${pet.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Pet with id " + pet.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  PetDelete.delete(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the pet.",
      });
    else res.send({ message: "pet deleted ", data });
  });
};
