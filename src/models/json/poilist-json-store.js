import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { featureJsonStore } from "./feature-json-store.js";

const db = new Low(new JSONFile("./src/models/json/poilists.json"));
db.data = { poilists: [] };

export const poilistJsonStore = {
  async getAllPoilists() {
    await db.read();
    return db.data.poilists;
  },

  async addPoilist(poilist) {
    await db.read();
    poilist._id = v4();
    db.data.poilists.push(poilist);
    await db.write();
    return poilist;
  },

  async getPoilistById(id) {
    await db.read();
    const list = db.data.poilists.find((poilist) => poilist._id === id);
    list.features = await featureJsonStore.getFeaturesByPoilistId(list._id);
    return list;
  },

  async getUserPoilists(userid) {
    await db.read();
    return db.data.poilists.filter((poilist) => poilist.userid === userid);
  },

  async deletePoilistById(id) {
    await db.read();
    const index = db.data.poilists.findIndex((poilist) => poilist._id === id);
    db.data.poilists.splice(index, 1);
    await db.write();
  },

  async deleteAllPoilists() {
    db.data.poilists = [];
    await db.write();
  },
};