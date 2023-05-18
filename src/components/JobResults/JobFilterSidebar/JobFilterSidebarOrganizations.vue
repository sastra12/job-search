<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li
            class="h-8 w-1/2"
            v-for="organization in UNIQUE_ORGANIZATIONS"
            :key="organization"
          >
            <input
              :id="organization"
              v-model="selectedOrganizations"
              :value="organization"
              @change="selectOrganization"
              type="checkbox"
              class="mr-3"
            />
            <label :for="organization">{{ organization }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
import { mapState } from "pinia";
import { useJobsStore, UNIQUE_ORGANIZATIONS } from "@/stores/jobs";

export default {
  name: "JobFilterSidebarOrganizations",
  components: { CollapsibleAccordion },
  data() {
    return {
      selectedOrganizations: [],
    };
  },
  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
  },

  methods: {
    selectOrganization() {
      console.log(this.selectedOrganizations);
    },
  },
};
</script>
