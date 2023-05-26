<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in displayJobs" :key="job.id" :job="job" />
    </ol>

    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mr-4 font-semibold text-brand-blue-2"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mr-4 font-semibold text-brand-blue-2"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from "pinia";
import {
  useJobsStore,
  FETCH_JOBS,
  // FILTERED_JOBS_BY_ORGANIZATIONS,
  // FILTERED_JOBS_BY_JOB_TYPES,
  FILTERED_JOBS,
} from "@/stores/jobs";
import JobListing from "@/components/JobResults/JobListing.vue";

export default {
  name: "JobListings",
  components: { JobListing },

  computed: {
    currentPage() {
      return Number.parseInt(this.$route.query.page || "1");
    },
    previousPage() {
      const previousPage = this.currentPage - 1;
      const firstPage = 1;
      return previousPage >= firstPage ? previousPage : undefined;
    },
    ...mapState(useJobsStore, {
      // FILTERED_JOBS_BY_ORGANIZATIONS,
      // FILTERED_JOBS_BY_JOB_TYPES,
      FILTERED_JOBS,
      nextPage() {
        const nextPage = this.currentPage + 1;
        const maxPage = Math.ceil(
          // this.FILTERED_JOBS_BY_ORGANIZATIONS.length / 10
          // this.FILTERED_JOBS_BY_JOB_TYPES.length / 10
          this.FILTERED_JOBS.length / 10
        );
        return nextPage <= maxPage ? nextPage : undefined;
      },
      displayJobs() {
        // ketika ada perubahan di current page maka akan otomatis menjalankan displayjobs
        const pageNumber = this.currentPage;
        const firstJobIndex = (pageNumber - 1) * 10;
        const lastJobIndex = pageNumber * 10;
        // return this.FILTERED_JOBS_BY_ORGANIZATIONS.slice(
        //   firstJobIndex,
        //   lastJobIndex
        // );
        // return this.FILTERED_JOBS_BY_JOB_TYPES.slice(
        //   firstJobIndex,
        //   lastJobIndex
        // );
        return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
      },
    }),
  },

  async mounted() {
    this.FETCH_JOBS();
  },

  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
  },
};
</script>
