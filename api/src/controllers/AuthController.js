const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errors = require("../helpers/errors");

exports.login = async (req, res) => {
  const { email, password } = req.body.user;

  try {
    if (!email || !password) {
      return res.status(401).send({ error: "where is your id?" });
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      errors.notFoundResponse(res);
    }

    if (!(await bcrypt.compare(password, user.dataValues.password))) {
      errors.notFoundResponse(res);
    }

    user.dataValues.token = jwt.sign(
      { userId: user.dataValues.id },
      process.env.JWT_SALT
    );

    return res.status(200).send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
