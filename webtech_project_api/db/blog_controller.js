const { Users, Blog, BlogUpdate, BlogDelete } = require("./model.js");

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
    const blog = new Blog({
      blog: req.body.blog,
      username: req.body.username,
    });

    // Create a user
    const user = new Users({
      username: req.body.username,
    });

    if (err) {
      Blog.transactedCreateWithUser(user, blog, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Blog.",
          });
        else res.send(data);
      });
    } else {
      Blog.create(blog, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Blog.",
          });
        else res.send(data);
      });
    }
  });
};

exports.getAll = (req, res) => {
  Blog.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving blogs.",
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

  const blog = new BlogUpdate({
    blog: req.body.blog,
    id: req.body.id,
  });

  BlogUpdate.updateById(blog, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Blog with id ${blog.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Blog with id " + blog.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const id = req.body.id;

  BlogDelete.delete(id, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the blog.",
      });
    else res.send({ message: "blog deleted ", data });
  });
};
