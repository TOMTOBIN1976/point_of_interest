import { v4 } from "uuid";

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
    return poilists.find((poilist) => poilist._id === id);
  },

  async deletePoilistById(id) {
    const index = poilists.findIndex((poilist) => poilist._id === id);
    poilists.splice(index, 1);
  },

  async deleteAllPoilists() {
    poilists = [];
  },
};
