const dailyRateModel = require("./dailyRate.model");
const Joi = require("joi");
const {
  Types: { ObjectId },
} = require("mongoose");

async function dailyRate(req, res, next) {
  try {
    const userId = req.params.userId;
    const crDar = await dailyRateModel.create(req.body);
    const { weight, height, age, desiredWeight, bloodType, _id, __v } = crDar;

    const dailyRate =
      10 * weight +
      6.25 * height -
      5 * age -
      161 -
      10 * (weight - desiredWeight) +
      bloodType;

    if (!userId) {
      const dailyRateData = { dailyRate, notAllowedProducts: [] };
      return res.status(200).send(dailyRateData);
    }

    const dailyRateData_withID = {
      id: "",
      dailyRate,
      summaries: [
        {
          _id,
          date: "",
          kcalLeft: "",
          kcalConsumed: "",
          dailyRate: "",
          percentsOfDailyRate: "",
          userId: "",
          __v,
        },
      ],
      notAllowedProducts: [["Яйцо куриное (желток сухой)"]],
    };

    return res.status(200).send(dailyRateData_withID);
  } catch (error) {
    next(error);
  }
}

function validateDailyRate(req, res, next) {
  const validationRules = Joi.object({
    weight: Joi.number().required(),
    height: Joi.number().required(),
    age: Joi.number().required(),
    desiredWeight: Joi.number().required(),
    bloodType: Joi.number().required(),
  });
  const val = validationRules.validate(req.body);
  if (val.error) {
    return res.status(400).send("invalid request body");
  }
  next();
}

module.exports = { dailyRate, validateDailyRate };
