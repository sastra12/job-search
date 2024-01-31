import { defineStore } from "pinia";

export const ADD_SELECTED_ORGANIZATIONS = "ADD_SELECTED_ORGANIZATIONS";
export const ADD_SELECTED_JOB_TYPES = "ADD_SELECTED_JOB_TYPES";

export interface UserState {
  isLoggedIn: boolean;
  selectOrganizations: string[];
  selectedJobTypes: string[];
}

export const useUserStore = defineStore("user", {
  // data
  state: (): UserState => {
    return {
      isLoggedIn: false,
      selectOrganizations: [],
      selectedJobTypes: [],
    };
  },

  // method
  actions: {
    loginUser() {
      this.isLoggedIn = true;
    },

    [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
      this.selectOrganizations = organizations;
    },

    [ADD_SELECTED_JOB_TYPES](jobTypes: string[]) {
      this.selectedJobTypes = jobTypes;
    },
  },
});
