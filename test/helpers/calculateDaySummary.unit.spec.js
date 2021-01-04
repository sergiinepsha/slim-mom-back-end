'use strict';

const calculateDaySummary = require('../../api/helpers/calculateDaySummary');

describe('Unit test helpers #calculateDaySummary', () => {
   it('should return expected result', () => {
      const result = calculateDaySummary(20, 200);

      const { kcalLeft, kcalConsumed, dailyRate, percentsOfDailyRate } = result;

      kcalLeft.should.be.equal(180).which.is.a.Number();
      kcalConsumed.should.be.equal(20).which.is.a.Number();
      dailyRate.should.be.equal(200).which.is.a.Number();
      percentsOfDailyRate.should.be.equal(10).which.is.a.Number();
   });
});
