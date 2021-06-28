function NotFoundError(message) {
  this.name = "NotFoundError";
  this.message = message || "Not Found";
  this.stack = new Error().stack;
}
NotFoundError.prototype = Object.create(NotFoundError.prototype);
NotFoundError.prototype.constructor = NotFoundError;

const notFoundResponse = (res, message) => {
  res
    .status(404)
    .send({ errors: { body: [new NotFoundError(message).message] } });
};

module.exports = { notFoundResponse };
