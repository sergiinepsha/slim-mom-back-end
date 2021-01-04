const calculateDailyRate = require('../../api/helpers/calculateDailyRate');

describe('Unit test #calculateDailyRate', () => {
   it('should return expected result', () => {
      const result = calculateDailyRate({ weight: 90, height: 170, age: 35, desiredWeight: 60 });

      result.should.be.equal(1326.5).which.is.a.Number();
   });
});
