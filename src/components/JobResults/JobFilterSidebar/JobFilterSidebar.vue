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

      <CollapsibleAccordion />
    </section>
  </div>
</template>

<script>
import ActionButton from "@/components/Shared/ActionButton.vue";
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFiltersSidebar",
  components: { ActionButton, CollapsibleAccordion },
};
</script>
