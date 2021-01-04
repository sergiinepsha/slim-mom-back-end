'use strict';

const calculateDailyRate = require('../../api/helpers/calculateDailyRate');

describe('Unit test helpers #calculateDailyRate', () => {
   it('should return expected result', () => {
      const incomingObject = { weight: 90, height: 170, age: 35, desiredWeight: 60 };

      const result = calculateDailyRate(incomingObject);

      result.should.be.equal(1326.5).which.is.a.Number();
   });
});
