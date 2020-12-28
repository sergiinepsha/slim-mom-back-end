const sinon = require('sinon');
const should = require('should');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { RequestError } = require('../../helpers');
const userModule = require('../../users/user.model');

const { JWT_SECRET } = process.env;
