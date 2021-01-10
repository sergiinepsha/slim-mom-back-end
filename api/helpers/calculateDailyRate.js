'use strict';

module.exports = ({ weight, height, age, desiredWeight }) => {
   return 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);
};
