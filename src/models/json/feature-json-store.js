import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/features.json"));
db.data = { tracks: [] };

export const featureJsonStore = {
  async getAllFeatures() {
    await db.read();
    return db.data.features;
  },

  async addFeature(poilistId, feature) {
    await db.read();
    feature._id = v4();
    feature.poilistid = poilistId;
    db.data.features.push(feature);
    await db.write();
    return feature;
  },

  async getFeaturesByPoilistId(id) {
    await db.read();
    return db.data.features.filter((feature) => feature.poilistid === id);
  },

  async getFeatureById(id) {
    await db.read();
    return db.data.features.find((feature) => feature._id === id);
  },

  async deleteFeature(id) {
    await db.read();
    const index = db.data.features.findIndex((feature) => feature._id === id);
    db.data.features.splice(index, 1);
    await db.write();
  },

  async deleteAllFeatures() {
    db.data.features = [];
    await db.write();
  },

  async updateFeature(feature, updatedFeature) {
    feature.description = updatedFeature.description;
    feature.location = updatedFeature.location;
    feature.category = updatedFeature.category;
    await db.write();
  },
};