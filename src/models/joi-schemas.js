import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const FeatureSpec = {
  description: Joi.string().required(),
  location: Joi.string().required(),
  category: Joi.number().allow("").optional(),
};

export const PoilistSpec = {
  title: Joi.string().required(),
};