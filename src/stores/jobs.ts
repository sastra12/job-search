import { defineStore } from "pinia";
import getJobs from "@/api/getJobs";
import { useUserStore } from "@/stores/user";

import type { Job } from "@/api/types";

export const FETCH_JOBS = "FETCH_JOBS";
export const UNIQUE_ORGANIZATIONS = "UNIQUE_ORGANIZATIONS";
export const UNIQUE_JOB_TYPES = "UNIQUE_JOB_TYPES";
// export const FILTERED_JOBS_BY_ORGANIZATIONS = "FILTERED_JOBS_BY_ORGANIZATIONS";
// export const FILTERED_JOBS_BY_JOB_TYPES = "FILTERED_JOBS_BY_JOB_TYPES";
export const FILTERED_JOBS = "FILTERED_JOBS";
export const INCLUDE_JOB_BY_ORGANIZATIONS = "INCLUDE_JOB_BY_ORGANIZATIONS";
export const INCLUDE_JOB_BY_JOB_TYPE = "INCLUDE_JOB_BY_JOB_TYPE";
export interface JobsState {
  jobs: Job[];
}

export const useJobsStore = defineStore("jobs", {
  state: (): JobsState => {
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
      const uniqueOrganizations = new Set<string>();
      state.jobs.forEach(function (job) {
        uniqueOrganizations.add(job.organization);
      });
      return uniqueOrganizations;
    },

    [UNIQUE_JOB_TYPES](state) {
      const uniquejobTypes = new Set<string>();
      state.jobs.forEach(function (job) {
        uniquejobTypes.add(job.jobType);
      });
      return uniquejobTypes;
    },

    // [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
    //   const userStore = useUserStore();
    //   if (userStore.selectOrganizations.length === 0) {
    //     return state.jobs;
    //   }
    //   return state.jobs.filter(function (job) {
    //     return userStore.selectOrganizations.includes(job.organization);
    //   });
    // },

    // [FILTERED_JOBS_BY_JOB_TYPES](state) {
    //   const userStore = useUserStore();
    //   if (userStore.selectedJobTypes.length === 0) {
    //     return state.jobs;
    //   }
    //   return state.jobs.filter(function (job) {
    //     return userStore.selectedJobTypes.includes(job.jobType);
    //   });
    // },

    // Passing arguments to getters
    [INCLUDE_JOB_BY_ORGANIZATIONS]: () => {
      return function (job: Job) {
        const userStore = useUserStore();
        if (userStore.selectOrganizations.length === 0) {
          return true;
        }
        return userStore.selectOrganizations.includes(job.organization);
      };
    },

    // Passing arguments to getters
    [INCLUDE_JOB_BY_JOB_TYPE]: () => {
      return function (job: Job) {
        const userStore = useUserStore();
        if (userStore.selectedJobTypes.length === 0) {
          return true;
        }
        return userStore.selectedJobTypes.includes(job.jobType);
      };
    },

    [FILTERED_JOBS](state): Job[] {
      // yang lama
      // const userStore = useUserStore();
      // const noSelectedOrganizations =
      //   userStore.selectOrganizations.length === 0;
      // const noSelectedJobTypes = userStore.selectedJobTypes.length === 0;

      // return state.jobs
      //   .filter(function (job) {
      //     if (noSelectedOrganizations) {
      //       return true;
      //     }
      //     // mengembalikan true
      //     return userStore.selectOrganizations.includes(job.organization);
      //   })
      //   .filter(function (job) {
      //     if (noSelectedJobTypes) {
      //       return true;
      //     }
      //     // mengembalikan true
      //     return userStore.selectedJobTypes.includes(job.jobType);
      //   });
      const includeJobByOrganizations = this.INCLUDE_JOB_BY_ORGANIZATIONS;
      const includeJobByJobType = this.INCLUDE_JOB_BY_JOB_TYPE;
      return state.jobs
        .filter(function (job) {
          return includeJobByOrganizations(job);
        })
        .filter(function (job) {
          return includeJobByJobType(job);
        });
    },
  },
});
