module.exports = {
  cleanUser(user) {
    user.id = undefined;
    user.password = undefined;

    return user;
  },
};
