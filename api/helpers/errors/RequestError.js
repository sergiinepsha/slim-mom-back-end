class RequestError extends Error {
   constructor(message, status) {
      super(message, status);
      this.message = message;
      this.status = status;
      delete this.stack;
   }
}
module.exports = RequestError;

// throw new RequestError({ message: 'sssss' }, 400)
