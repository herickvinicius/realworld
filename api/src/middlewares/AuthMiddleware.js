const jwt = require("jsonwebtoken");
const errors = require("../helpers/errors");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      errors.forbiddenResponse(res, "no token provided");
    }

    const parts = authHeader.split(" ");
    if (!parts.length === 2) {
      errors.unprocessableEntityResponse(res, "token error");
    }

    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema)) {
      errors.unprocessableEntityResponse(res, "malformated token");
      throw new Error("Malformatted token");
    }

    jwt.verify(token, process.env.JWT_SALT, (err, decoded) => {
      if (err) {
        errors.unprocessableEntityResponse(res, "invalid token");
      }
      req.userId = decoded.userId;
      return next();
    });
  } catch (error) {
    errors.unhandledResponse(res, error.message);
  }
};
