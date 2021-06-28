function UnauthorizedError(message) {
  this.name = "UnauthorizedError";
  this.message = message || "unauthorized";
  this.stack = new Error().stack;
}
UnauthorizedError.prototype = Object.create(UnauthorizedError.prototype);
UnauthorizedError.prototype.constructor = UnauthorizedError;

function ForbiddenError(message) {
  this.name = "ForbiddenError";
  this.message = message || "forbidden";
  this.stack = new Error().stack;
}
ForbiddenError.prototype = Object.create(ForbiddenError.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

function NotFoundError(message) {
  this.name = "NotFoundError";
  this.message = message || "not found";
  this.stack = new Error().stack;
}
NotFoundError.prototype = Object.create(NotFoundError.prototype);
NotFoundError.prototype.constructor = NotFoundError;

function UnprocessableEntityError(message) {
  this.name = "UnprocessableEntityError";
  this.message = message || "can't be empty";
  this.stack = new Error().stack;
}
UnprocessableEntityError.prototype = Object.create(
  UnprocessableEntityError.prototype
);
UnprocessableEntityError.prototype.constructor = UnprocessableEntityError;

function UnhandledError(message) {
  this.name = "UnhandledError";
  this.message = message || "unhandled";
  this.stack = new Error().stack;
}
UnhandledError.prototype = Object.create(UnhandledError.prototype);
UnhandledError.prototype.constructor = UnhandledError;

// =======================================================================
const unauthorizedResponse = (res, message) => {
  res
    .status(401)
    .send({ errors: { body: [new UnauthorizedError(message).message] } });
};

const forbiddenResponse = (res, message) => {
  res
    .status(403)
    .send({ errors: { body: [new ForbiddenError(message).message] } });
};

const notFoundResponse = (res, message) => {
  res
    .status(404)
    .send({ errors: { body: [new NotFoundError(message).message] } });
};

const unprocessableEntityResponse = (res, message) => {
  res.status(422).send({
    errors: { body: [new UnprocessableEntityError(message).message] },
  });
};

const unhandledResponse = (res, message) => {
  res
    .status(500)
    .send({ errors: { body: [new unhandledError(message).message] } });
};

module.exports = {
  unauthorizedResponse,
  forbiddenResponse,
  notFoundResponse,
  unprocessableEntityResponse,
  unhandledResponse,
};
