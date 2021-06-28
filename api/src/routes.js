const express = require("express");
const errors = require("./helpers/errors");

const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/UserController");
const ProfileController = require("./controllers/ProfileController");
const ArticleController = require("./controllers/ArticleController");
const TagController = require("./controllers/TagController");

const protected = require("./middlewares/AuthMiddleware");

const routes = express.Router();

routes.get("/", (req, res) => {
  return res.status(200).send({ status: "Up and running!" });
});

routes.post("/users/login", AuthController.login);

routes.get("/user", protected, UserController.getCurrentUser);
routes.put("/user", protected, UserController.update);
routes.post("/users", UserController.create, AuthController.login);

routes.get("/profiles/:username", protected, ProfileController.getProfile);

routes.get("/articles/:slug", ArticleController.getBySlug);
routes.post("/articles", protected, ArticleController.create);
routes.put("/articles/:slug", protected, ArticleController.update);
routes.delete("/articles/:slug", protected, ArticleController.delete);

routes.get("/tags", TagController.getTags);

// Handle unexistent routes.
routes.use((req, res) => {
  errors.notFoundResponse(res);
});

//Handle another errors.
routes.use((error, req, res) => {
  errors.unhandledResponse(res, error.message);
});

module.exports = routes;
