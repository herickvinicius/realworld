const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("No token provided");
    }

    const parts = authHeader.split(" ");
    if (!parts.length === 2) {
      throw new Error("Token error");
    }

    const [schema, token] = parts;
    if (!/^Bearer$/i.test(schema)) {
      throw new Error("Malformatted token");
    }

    jwt.verify(token, process.env.JWT_SALT, (err, decoded) => {
      if (err) {
        throw new Error("Invalid token");
      }
      req.userId = decoded.userId;
      return next();
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
