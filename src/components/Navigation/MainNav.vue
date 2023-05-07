<template>
  <header class="w-full text-sm" :class="heigherClassHeader">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex h-full items-center text-xl"
          >SAS Corporation</router-link
        >

        <nav class="ml-12">
          <ul class="flex h-full items-center">
            <li
              v-for="(menuItem, index) in menuItems"
              :key="index"
              class="mr-9 last:mr-0"
            >
              <router-link :to="menuItem.url">{{ menuItem.text }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex items-center">
          <ProfileImage v-if="isLoggedIn" />
          <ActionButton v-else @click="loginUser" text="Sign In" />
        </div>
      </div>

      <TheSubnav v-if="isLoggedIn" />
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";
import TheSubnav from "@/components/Navigation/TheSubnav.vue";

export default {
  // Whenever the data changes, view will render the template with the latest data values,
  // the latest data properties.

  name: "MainNav",
  components: { ActionButton, ProfileImage, TheSubnav },
  data() {
    return {
      menuItems: [
        { text: "Teams", url: "/" },
        { text: "Location", url: "/" },
        { text: "Life at SAS Corp", url: "/" },
        { text: "How we hire", url: "/" },
        { text: "Students", url: "/" },
        { text: "Jobs", url: "/job/results" },
      ],
    };
  },

  computed: {
    ...mapState(useUserStore, ["isLoggedIn"]),
    heigherClassHeader() {
      return {
        "h-16": !this.isLoggedIn,
        "h-28": this.isLoggedIn,
      };
    },
  },

  methods: {
    ...mapActions(useUserStore, ["loginUser"]),
  },
};
</script>
