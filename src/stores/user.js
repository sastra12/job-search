import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
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

    [ADD_SELECTED_ORGANIZATIONS](organizations) {
      this.selectOrganizations = organizations;
    },
  },
});
