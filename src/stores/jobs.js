import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";
export const FILTERED_JOBS_BY_JOB_TYPES = "FILTERED_JOBS_BY_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";

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

    [UNIQUE_JOB_TYPES](state) {
      const uniquejobTypes = new Set();
      state.jobs.forEach(function (job) {
        uniquejobTypes.add(job.jobType);
      });
      return uniquejobTypes;
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

    [FILTERED_JOBS_BY_JOB_TYPES](state) {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) {
        return state.jobs;
      }
      return state.jobs.filter(function (job) {
        return userStore.selectedJobTypes.includes(job.jobType);
      });
    },

    [FILTERED_JOBS](state) {
      const userStore = useUserStore();
      const noSelectedOrganizations =
        userStore.selectOrganizations.length === 0;
      const noSelectedJobTypes = userStore.selectedJobTypes.length === 0;

      return state.jobs
        .filter(function (job) {
          if (noSelectedOrganizations) {
            return true;
          }
          // mengembalikan true
          return userStore.selectOrganizations.includes(job.organization);
        })
        .filter(function (job) {
          if (noSelectedJobTypes) {
            return true;
          }
          // mengembalikan true
          return userStore.selectedJobTypes.includes(job.jobType);
        });
    },
  },
});
