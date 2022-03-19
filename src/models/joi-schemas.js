import Joi from "joi";

// export const UserSpec = {
//  firstName: Joi.string().required(),
//  lastName: Joi.string().required(),
//  email: Joi.string().email().required(),
//  password: Joi.string().required(),
// };

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Joe").required(),
    lastName: Joi.string().example("Bloggs").required(),
    email: Joi.string().email().example("joebloggs@gmail.com").required(),
    password: Joi.string().example("donotshare").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

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