import { Feature } from "./feature.js";

export const featureMongoStore = {
  async getFeaturesByPoilistId(id) {
    const features = await Feature.find({ poilistid: id }).lean();
    return features;
  },
};