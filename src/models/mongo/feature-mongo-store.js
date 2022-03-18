import { Feature } from "./feature.js";

export const featureMongoStore = {
  async getAllFeatures() {
    const features = await Feature.find().lean();
    return features;
  },

  async addFeature(poilistId, feature) {
    feature.poilistid = poilistId;
    const newFeature = new Feature(feature);
    const featureObj = await newFeature.save();
    return this.getFeatureById(featureObj._id);
  },

  async getFeaturesByPoilistId(id) {
    const features = await Feature.find({ poilistid: id }).lean();
    return features;
  },

  async getFeatureById(id) {
    if (id) {
      const feature = await Feature.findOne({ _id: id }).lean();
      return feature;
    }
    return null;
  },

  async deleteFeature(id) {
    try {
      await Feature.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllFeatures() {
    await Feature.deleteMany({});
  },

  async updateFeature(feature, updatedFeature) {
    track.title = updatedFeature.title;
    track.location = updatedFeature.location;
    track.category = updatedFeature.category;
    await track.save();
  },
};