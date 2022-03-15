import { v4 } from "uuid";
import { featureMemStore } from "./feature-mem-store.js";

let poilists = [];

export const poilistMemStore = {
  async getAllPoilists() {
    return poilists;
  },

  async addPoilist(poilist) {
    poilist._id = v4();
    poilists.push(poilist);
    return poilist;
  },

  async getPoilistById(id) {
    const list = poilists.find((poilist) => poilist._id === id);
    list.features = await featureMemStore.getFeaturesByPoilistId(list._id);
    return list;
  },

  async deletePoilistById(id) {
    const index = poilists.findIndex((poilist) => poilist._id === id);
    poilists.splice(index, 1);
  },

  async deleteAllPoilists() {
    poilists = [];
  },
};
