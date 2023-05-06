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
  scrollBehavior() {
    return { top: 0, left: 0, behavior: "smooth" };
  },
});

export default router;
