import { db } from "../models/db.js";

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
    handler: async function (request, h) {
      const newPlayList = {
        title: request.payload.title,
      };
      await db.playlistStore.addPlaylist(newPlayList);
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
};
