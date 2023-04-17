<template>
  <header class="w-full text-sm">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <a v-bind:href="url" class="flex h-full items-center text-xl">{{
          company
        }}</a>

        <nav class="ml-12">
          <ul class="flex h-full items-center">
            <li
              v-for="(menuItem, index) in menuItems"
              :key="index"
              class="mr-9 last:mr-0"
            >
              <a href="">{{ menuItem }}</a>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex items-center">
          <ActionButton />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";

export default {
  name: "MainNav",
  components: { ActionButton },
  data() {
    return {
      company: "SAS Corporation",
      url: "https://careers.google.com",
      menuItems: [
        "Teams",
        "Location",
        "Life at SAS Corp",
        "How we hire",
        "Students",
        "Jobs",
      ],
    };
  },
};
</script>
