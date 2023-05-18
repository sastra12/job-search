import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";

export const useJobsStore = defineStore("jobs", {
  state: () => {
    return {
      jobs: [],
    };
  },

  // method
  actions: {
    async [FETCH_JOBS]() {
      const jobs = await getJobs();
      this.jobs = jobs;
    },
  },

  // computed
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      const uniqueOrganizations = new Set();
      state.jobs.forEach(function (job) {
        uniqueOrganizations.add(job.organization);
      });
      return uniqueOrganizations;
    },
    [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
      const userStore = useUserStore();
      if (userStore.selectOrganizations.length === 0) {
        return state.jobs;
      }
      return state.jobs.filter(function (job) {
        return userStore.selectOrganizations.includes(job.organization);
      });
    },
  },
});
