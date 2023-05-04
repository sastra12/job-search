import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
  },

  {
    path: "/job/results",
    name: "JobResults",
    component: () => import("@/views/JobResultsView.vue"),
  },

  {
    path: "/job/results/:id",
    name: "JobListing",
    component: () => import("@/views/JobView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
