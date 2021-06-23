const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Article = require("../models/Article");
const Tag = require("../models/Tag");

const connection = new Sequelize(dbConfig);

User.init(connection);
Article.init(connection);
Tag.init(connection);

module.exports = connection;
