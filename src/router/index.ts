import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CountryInfo from "@/views/CountryHolidaysView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [],
    },
    {
      // UserProfile will be rendered inside User's <router-view>
      // when /user/:id/profile is matched
      path: "/country/:id",
      component: CountryInfo,
    },
  ],
});

export default router;
