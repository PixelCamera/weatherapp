import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CityView from "@/views/CityView/CityView.vue";

let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/weather/:country/:adm1/:name",
      name: "cityView",
      component: CityView,
    },
  ],
});
export default router;
