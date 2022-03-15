import { db } from "../models/db.js";

export const poilistController = {
  index: {
    handler: async function (request, h) {
      const poilist = await db.poilistStore.getPoilistById(request.params.id);
      const viewData = {
        title: "Poilist",
        poilist: poilist,
      };
      return h.view("poilist-view", viewData);
    },
  },

  addFeature: {
    handler: async function (request, h) {
      const poilist = await db.poilistStore.getPoilistById(request.params.id);
      const newFeature = {
        description: request.payload.description,
        location: request.payload.location,
        category: Number(request.payload.category),
      };
      await db.featureStore.addFeature(poilist._id, newFeature);
      return h.redirect(`/poilist/${poilist._id}`);
    },
  },
};