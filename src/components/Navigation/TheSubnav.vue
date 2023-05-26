<template>
  <div class="h-12 border-b border-solid border-brand-gray-1">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">
            {{ FILTERED_JOBS.length }}
          </span>
          jobs matched</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { mapState } from "pinia";
import { useRoute } from "vue-router";
import { useJobsStore } from "@/stores/jobs";
import { computed } from "vue";

const route = useRoute();

const onJobResultsPage = computed(() => {
  if (route.name === "JobResults") {
    return true;
  }
});

const jobStore = useJobsStore();

const FILTERED_JOBS = computed(() => {
  return jobStore.FILTERED_JOBS;
});

// export default {
//   name: "TheSubnav",
//   computed: {
//     ...mapState(useJobsStore, [FILTERED_JOBS]),
//     onJobResultsPage() {
//       return this.$route.name === "JobResults";
//     },
//   },
// };
</script>
