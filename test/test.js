'use strict';

const sinon = require('sinon');
const should = require('should');

//--------test is ok------------
//---------unit tests-----------
require('./auth/createNewUser.test');
require('./auth/getEmail.test');
require('./auth/prepareUserResponse.test');
require('./auth/validPassword.test');
require('./helpers/calculateDaySummary.unit.spec');
require('./helpers/calculateDailyRate.unit.spec');

//-------acceptance tests-------
require('./router/router.acceptance.spec');
//--//--//--//--//--//--//--//--

//------test in progress--------

//------------------------------
