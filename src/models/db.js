import { userMemStore } from "./mem/user-mem-store.js";
import { poilistMemStore } from "./mem/poilist-mem-store.js";
import { featureMemStore } from "./mem/feature-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { poilistJsonStore  } from "./json/poilist-json-store.js";
import { featureJsonStore } from "./json/feature-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { poilistMongoStore } from "./mongo/poilist-mongo-store.js";
import { featureMongoStore } from "./mongo/feature-mongo-store.js";


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
      case "mongo":
        this.userStore = userMongoStore;
        this.poilistStore = poilistMongoStore;
        this.featureStore = featureMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.poilistStore = poilistMemStore;
        this.featureStore = featureMemStore;
    }
  },
};