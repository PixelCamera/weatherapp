import {createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CityView from "@/views/CityView/CityView.vue";

let router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "首页",
      },
    },
    {
      path: "/weather/:country/:adm1/:name",
      name: "cityView",
      component: CityView,
      meta: {
        title: "城市天气",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${
      to.params.country
          ? `${to.params.name}, ${to.params.adm1}, ${to.params.country}`
          : to.meta.title
  }   | WeatherApp`;
  next();
});
export default router;
