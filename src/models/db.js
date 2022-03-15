import { userMemStore } from "./mem/user-mem-store.js";
import { poilistMemStore } from "./mem/poilist-mem-store.js";
import { featureMemStore } from "./mem/feature-mem-store.js";

export const db = {
  userStore: null,
  poilistStore: null,
  featureStore: null,

  init() {
    this.userStore = userMemStore;    
    this.poilistStore = poilistMemStore;
    this.featureStore = featureMemStore;
  },
};
