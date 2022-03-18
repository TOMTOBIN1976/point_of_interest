import { Poilist } from "./poilist.js";
import { featureMongoStore } from "./feature-mongo-store.js";

export const poilistMongoStore = {
  async getAllPoilists() {
    const poilists = await Poilist.find().lean();
    return poilists;
  },

  async getPoilistById(id) {
    if (id) {
      const poilist = await Poilist.findOne({ _id: id }).lean();
      if (poilist) {
        poilist.features = await featureMongoStore.getFeaturesByPoilistId(poilist._id);
      }
      return poilist;
    }
    return null;
  },

  async addPoilist(poilist) {
    const newPoilist = new Poilist(poilist);
    const poilistObj = await newPoilist.save();
    return this.getPoilistById(poilistObj._id);
  },

  async getUserPoilists(id) {
    const poilist = await Poilist.find({ userid: id }).lean();
    return poilist;
  },

  async deletePoilistById(id) {
    try {
      await Poilist.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPoilists() {
    await Poilist.deleteMany({});
  }
};