const express = require("express");
const UserController = require("./controllers/UserController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send({ status: "Up and running!" });
});

routes.get("/user/:userId", UserController.list);
routes.post("/users", UserController.create);

module.exports = routes;
