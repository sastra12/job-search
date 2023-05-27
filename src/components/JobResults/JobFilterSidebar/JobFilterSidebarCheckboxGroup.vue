<template>
  <collapsible-accordion :header="props.header">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2" v-for="value in props.uniqueValue" :key="value">
            <input
              :id="value"
              v-model="selectedValue"
              :value="value"
              @change="selectValue"
              type="checkbox"
              class="mr-3"
            />
            <label :for="value">{{ value }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";
// import { useJobsStore } from "@/stores/jobs";
// import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqueValue: {
    type: Set,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValue = ref([]);
const selectValue = () => {
  props.action(selectedValue.value);
  router.push({ name: "JobResults" });
};

// Composition API
// const selectedJobTypes = ref([]);

// const jobStore = useJobsStore();
// const UNIQUE_JOB_TYPES = computed(() => {
//   return jobStore.UNIQUE_JOB_TYPES;
// });

// const router = useRouter();
// const userStore = useUserStore();
// const selectJobType = () => {
//   userStore.ADD_SELECTED_JOB_TYPES(selectedJobTypes.value);
//   router.push({ name: "JobResults" });
// };

// export default {
//   name: "JobFilterSidebarJobTypes",
//   components: { CollapsibleAccordion },
//   data() {
//     return {
//       selectedJobTypes: [],
//     };
//   },
//   computed: {
//     ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),
//   },

//   methods: {
//     ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
//     selectJobType() {
//       this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
//       this.$router.push({ name: "JobResults" });
//     },
//   },
// };
</script>
