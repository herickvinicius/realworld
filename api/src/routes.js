const express = require("express");
const UserController = require("./controllers/UserController");
const ProfileController = require("./controllers/ProfileController");
const ArticleController = require("./controllers/ArticleController");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send({ status: "Up and running!" });
});

routes.get("/user/:userId", UserController.getUser); // TO DO: provide userId by JWT.
routes.put("/user/:userId", UserController.update); // TO DO: provide userId by JWT.
routes.post("/users", UserController.create);

routes.get("/profiles/:username", ProfileController.getProfile);

routes.get("/articles/:slug", ArticleController.getBySlug);
routes.post("/articles", ArticleController.create);

module.exports = routes;
