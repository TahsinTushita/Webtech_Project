const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const controller = require("./db/controller");
const petController = require("./db/pet_controller");
const hobbyController = require("./db/hobby_controller");
const todoController = require("./db/todo_controller");
const blogController = require("./db/blog_controller");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "welcome here" });
});

app.post("/api/user/create", controller.create);
app.delete("/api/user/delete/:username", controller.delete);
app.get("/api/users", controller.getAll);

app.post("/api/pet/create", petController.create);
app.put("/api/pet/update", petController.update);
app.delete("/api/pet/delete/:id", petController.delete);
app.get("/api/pet", petController.getAll);

app.post("/api/hobby/create", hobbyController.create);
app.put("/api/hobby/update", hobbyController.update);
app.delete("/api/hobby/delete/:id", hobbyController.delete);
app.get("/api/hobby", hobbyController.getAll);

app.post("/api/todo/create", todoController.create);
app.put("/api/todo/update", todoController.update);
app.delete("/api/todo/delete/:id", todoController.delete);
app.get("/api/todo", todoController.getAll);

app.post("/api/blog/create", blogController.create);
app.put("/api/blog/update", blogController.update);
app.delete("/api/blog/delete/:id", blogController.delete);
app.get("/api/blog", blogController.getAll);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
