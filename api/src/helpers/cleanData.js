module.exports = {
  cleanUser(user) {
    user.id = undefined;
    user.password = undefined;

    console.log(user);
    return user;
  },
};
