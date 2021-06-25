const express = require("express");

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const ProfileController = require("./controllers/ProfileController");
const ArticleController = require("./controllers/ArticleController");

const protected = require("./middlewares/AuthMiddleware");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send({ status: "Up and running!" });
});

routes.post("/users/login", AuthController.login);

routes.get("/user", protected, UserController.getCurrentUser);
routes.put("/user", protected, UserController.update); // TO DO: provide userId by JWT.
routes.post("/users", UserController.create, AuthController.login);

routes.get("/profiles/:username", ProfileController.getProfile);

routes.get("/articles/:slug", ArticleController.getBySlug);
routes.post("/articles", ArticleController.create);

module.exports = routes;
