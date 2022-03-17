import { userMemStore } from "./mem/user-mem-store.js";
import { poilistMemStore } from "./mem/poilist-mem-store.js";
import { featureMemStore } from "./mem/feature-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { poilistJsonStore  } from "./json/poilist-json-store.js";
import { featureJsonStore } from "./json/feature-json-store.js";

export const db = {
  userStore: null,
  poilistStore: null,
  featureStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.poilistStore = poilistJsonStore;
        this.featureStore = featureJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.poilistStore = poilistMemStore;
        this.featureStore = featureMemStore;
    }
  },
};