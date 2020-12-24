const { Router } = require('express');
const authList = require('./authListURN');

const authRouter = Router();

authList.map(({ app, urn, middleware }) => {
   authRouter[app](urn, middleware);
});

//return Error
authRouter.use((err, req, res, next) => {
   console.log('Error >>>', err.message);
   return res.status(err.status).send({ message: err.message });
});

module.exports = {
   authRouter,
};
