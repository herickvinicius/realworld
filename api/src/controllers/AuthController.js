const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const toDTO = require("../helpers/toDTO");
const errors = require("../helpers/errors");

exports.login = async (req, res) => {
  const { email, password } = req.body.user;

  try {
    if (!email || !password) {
      errors.unauthorizedResponse(res);
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      errors.notFoundResponse(res);
    }

    if (!(await bcrypt.compare(password, user.dataValues.password))) {
      errors.notFoundResponse(res);
    }

    user.token = jwt.sign({ userId: user.dataValues.id }, process.env.JWT_SALT);

    return res.status(200).send({ user: toDTO.userDTO(user) });
  } catch (error) {
    errors.unhandledResponse(res, error.message);
  }
};
