<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <JobListing v-for="job in jobs" :key="job.id" :job="job" />
    </ol>
  </main>
</template>

<script>
import axios from "axios";
import JobListing from "@/components/JobResults/JobListing.vue";
export default {
  name: "JobListings",
  components: { JobListing },
  data() {
    return {
      jobs: [],
    };
  },

  methods: {
    async getListJobs() {
      try {
        const response = await axios.get(" http://localhost:3000/jobs");
        this.jobs = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  mounted() {
    this.getListJobs();
  },
};
</script>
