const express = require("express");
const bodyParser = require("body-parser");
const controllers = require("./db/controller");
const petControllers = require("./db/pet_controller");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "welcome here" });
});

app.post("/api/user/create", controllers.create);
app.delete("/api/user/delete/:username");

app.post("/api/pet/create", petControllers.create);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
