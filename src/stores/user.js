import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  // data
  state: () => {
    return {
      isLoggedIn: false,
      selectOrganizations: [],
    };
  },

  // method
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
});
