import { userMemStore } from "./mem/user-mem-store.js";
import { playlistMemStore } from "./mem/playlist-mem-store.js";
import { poilistMemStore } from "./mem/poilist-mem-store.js";

export const db = {
  userStore: null,
  playlistStore: null,
  poilistStore: null,

  init() {
    this.userStore = userMemStore;
    this.playlistStore = playlistMemStore;
    this.poilistStore = poilistMemStore;
  },
};
