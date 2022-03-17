import { db } from "../models/db.js";
import { FeatureSpec } from "../models/joi-schemas.js";

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
    validate: {
      payload: FeatureSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("poilist-view", { title: "Add feature error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const poilist = await db.poilistStore.getPoilistById(request.params.id);
      const newFeature = {
        description: request.payload.description,
        location: request.payload.location,
        category: request.payload.category,
      };
      await db.featureStore.addFeature(poilist._id, newFeature);
      return h.redirect(`/poilist/${poilist._id}`);
    },
  },

  deleteFeature: {
    handler: async function(request, h) {
      const poilist = await db.poilistStore.getPoilistById(request.params.id);
      await db.featureStore.deleteFeature(request.params.trackid);
      return h.redirect(`/poilist/${poilist._id}`);
    },
  },
};