'use strict';

const sinon = require('sinon');
const should = require('should');

//--------test is ok------------
//---------unit tests-----------
require('./helpers/calculateDaySummary.unit.spec');
require('./helpers/calculateDailyRate.unit.spec');

//-------acceptance tests-------
//--//--//--//--//--//--//--//--

//------test in progress--------
require('./router/router.acceptance.spec');
//------------------------------
