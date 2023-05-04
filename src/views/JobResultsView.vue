<template>
  <div class="flex w-full flex-nowrap">
    <JobFilterSidebar />
    <JobListing />
  </div>
</template>

<script>
import JobFilterSidebar from "@/components/JobResults/JobFilterSidebar/JobFilterSidebar.vue";
import JobListing from "@/components/JobResults/JobListing.vue";
export default {
  name: "JobResultsView",
  components: { JobFilterSidebar, JobListing },
};
</script>
