const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body.user;

  try {
    if (!email || !password) {
      return res.status(401).send({ error: "where is your id?" });
    }

    let user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).send({ error: "idk u" });
    }

    if (!(await bcrypt.compare(password, user.dataValues.password))) {
      console.log("Password don't match");
      return res.status(404).send({ error: "password don't match" });
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
