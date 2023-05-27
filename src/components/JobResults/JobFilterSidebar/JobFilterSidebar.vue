<template>
  <div
    class="flex w-3/12 flex-col border-r border-solid border-brand-gray-1 bg-white p-4"
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear Filter" type="secondary" />
        </div>
      </div>

      <collapsible-accordion header="Degree" />

      <!-- <job-filter-sidebar-job-types />

      <job-filter-sidebar-organizations /> -->

      <job-filter-sidebar-checkbox-group
        header="Job Types"
        :uniqueValue="UNIQUE_JOB_TYPES"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
      />

      <job-filter-sidebar-checkbox-group
        header="Organizations"
        :uniqueValue="UNIQUE_ORGANIZATIONS"
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
      />
    </section>
  </div>
</template>

<script setup>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
// import JobFilterSidebarOrganizations from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarOrganizations.vue";
// import JobFilterSidebarJobTypes from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarJobTypes.vue";
import JobFilterSidebarCheckboxGroup from "@/components/JobResults/JobFilterSidebar/JobFilterSidebarCheckboxGroup.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { computed } from "vue";

const jobStore = useJobsStore();
const userStore = useUserStore();

const UNIQUE_JOB_TYPES = computed(() => {
  return jobStore.UNIQUE_JOB_TYPES;
});

const UNIQUE_ORGANIZATIONS = computed(() => {
  return jobStore.UNIQUE_ORGANIZATIONS;
});

// export default {
//   name: "JobFiltersSidebar",
//   components: {
//     ActionButton,
//     CollapsibleAccordion,
//     JobFilterSidebarOrganizations,
//     JobFilterSidebarJobTypes,
//   },
// };
</script>
