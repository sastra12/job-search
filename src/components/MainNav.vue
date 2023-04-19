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
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else @click="loginUser" text="Sign In" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import ActionButton from "@/components/ActionButton.vue";
import ProfileImage from "@/components/ProfileImage.vue";

export default {
  // Whenever the data changes, view will render the template with the latest data values,
  // the latest data properties.

  name: "MainNav",
  components: { ActionButton, ProfileImage },
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
      isLoggedIn: false,
    };
  },

  methods: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
};
</script>
