// src/store/mainStore.ts
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => ({
    showPostUpload: false,
    showPostDetails: false,
  }),
  actions: {
    changeShowPostUpload(show) {
      this.showPostUpload = show;
    },
    changeShowPostDetails(show) {
      this.showPostDetails = show;
    },
  },
});
