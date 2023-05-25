<template>
  <collapsible-accordion header="Job Types">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            class="h-8 w-1/2"
            v-for="jobType in UNIQUE_JOB_TYPES"
            :key="jobType"
          >
            <input
              :id="jobType"
              v-model="selectedJobTypes"
              :value="jobType"
              @change="selectJobType"
              type="checkbox"
              class="mr-3"
            />
            <label :for="jobType">{{ jobType }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { mapState, mapActions } from "pinia";
import { useJobsStore, UNIQUE_JOB_TYPES } from "@/stores/jobs";
import { useUserStore, ADD_SELECTED_JOB_TYPES } from "@/stores/user";

export default {
  name: "JobFilterSidebarJobTypes",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedJobTypes: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),
  },

  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
    selectJobType() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
      this.$router.push({ name: "JobResults" });
    },
  },
};
</script>
