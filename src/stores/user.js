import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // data
  state: () => {
    return {
      isLoggedIn: false,
    };
  },

  // method
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
});
