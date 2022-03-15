import { v4 } from "uuid";

let features = [];

export const featureMemStore = {
  async getAllFeatures() {
    return features;
  },

  async addTrack(poilistId, feature) {
    feature._id = v4();
    feature.playlistid = playlistId;
    features.push(feature);
    return feature;
  },

  async getFeaturesByPoilistId(id) {
    return features.filter((feature) => feature.poilistid === id);
  },

  async getFeatureById(id) {
    return features.find((feature) => feature._id === id);
  },

  async getPoilistFeatures(poilistId) {
    return features.filter((feature) => feature.poilistid === poilistId);
  },

  async deleteFeature(id) {
    const index = features.findIndex((feature) => feature._id === id);
    features.splice(index, 1);
  },

  async deleteAllFeatures() {
    features = [];
  },

  async updateFeature(feature, updatedFeature) {
    feature.description = updatedFeature.description;
    feature.location = updatedFeature.location;
    feature.category = updatedFeature.category;
  },
};