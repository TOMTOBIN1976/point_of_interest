import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { UserSpec, IdSpec, UserArray } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const userApi = {
  create: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error!");
      }
    },    
  },

  find: {
    auth: false,
    handler: async function(request, h) {
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all userApi",
    notes: "Returns details of all userApi",    
  },  
};