import { db } from "../models/db.js";
import { PoilistSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const poilists = await db.poilistStore.getUserPoilists(loggedInUser._id);
  //  const poilists = await db.poilistStore.getAllPoilists();
      const viewData = {
        title: "POI Dashboard",
        user: loggedInUser,
        poilists: poilists,
      };      
      return h.view("dashboard-view", viewData);
    },
  },

  addPlaylist: {
    validate: {
      payload: PoilistSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Poilist error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPoiList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.poilistStore.addPoilist(newPoiList);
      return h.redirect("/dashboard");
    },
  },

  addPoilist: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPoiList = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.poilistStore.addPoilist(newPoiList);
      return h.redirect("/dashboard");
    },
  },

  deletePoilist: {
    handler: async function (request, h) {
      const poilist = await db.poilistStore.getPoilistById(request.params.id);
      await db.poilistStore.deletePoilistById(poilist._id);
      return h.redirect("/dashboard");
    },
  },

};
