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

<script setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedOrganizations = ref([]);

const jobStore = useJobsStore();
const UNIQUE_ORGANIZATIONS = computed(() => {
  return jobStore.UNIQUE_ORGANIZATIONS;
});

const userStore = useUserStore();
const selectOrganization = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({ name: "JobResults" });
};

// export default {
//   name: "JobFilterSidebarOrganizations",
//   components: { CollapsibleAccordion },
//   data() {
//     return {
//       selectedOrganizations: [],
//     };
//   },
//   computed: {
//     ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
//   },

//   methods: {
//     ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
//     selectOrganization() {
//       this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
//       this.$router.push({ name: "JobResults" });
//     },
//   },
// };
</script>
