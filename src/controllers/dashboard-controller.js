import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const poilists = await db.poilistStore.getAllPoilists();
      const viewData = {
        title: "POI Dashboard",
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
      const newPoiList = {
        title: request.payload.title,
      };
      await db.poilistStore.addPoilist(newPoiList);
      return h.redirect("/dashboard");
    },
  },
};
