import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import sourceData from "@/data.json";
import DestinationShow from "@/views/DestinationShow.vue";
import ExperienceShow from "@/views/ExperienceShow.vue";
import NotFound from "@/views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home, alias: "/home" },
    // { path: '/home', redirect: { name: 'Home' } },
    {
      path: "/protected",
      name: "protected",
      components: {
        default: () => import("@/views/Protected.vue"),
        LeftSidebar: () => import("@/components/LeftSidebar.vue"),
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/invoices",
      name: "invoices",
      components: {
        default: () => import("@/views/Invoices.vue"),
        LeftSidebar: () => import("@/components/LeftSidebar.vue"),
      },
      meta: {
        requiresAuth: true,
      },
    },
    { path: "/about", name: "About", component: About },
    // { path: "/brazil", name: "brazil", component: Brazil}
    /*     {
      path: '/destination/:id/:slug',
      name: 'destination.show',
      component: () => import('@/views/DestinationShow.vue')
    }, */
    // {
    //   path: "/example/:id(\\d+)*",
    //   component: () => import("@/views/Login.vue"),
    // },
    {
      path: "/example/:id+", // ? /1/2/3/4/5
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/destination/:id/:slug",
      name: "destination.show",
      component: () => import("@/views/DestinationShow.vue"),
      // props: true,
      props: (route) => ({ id: parseInt(route.params.id) }),
      beforeEnter(to, from) {
        console.log("beforeEnter-to", to);
        console.log("beforeEnter-from", from);
        const exists = sourceData.destinations.find(
          (destination) => destination.id === parseInt(to.params.id)
        );
        if (!exists) {
          return { name: "NotFound" };
        }
      },
      children: [
        {
          path: ":experienceSlug",
          name: "experience.show",
          component: () => import("@/views/ExperienceShow.vue"),
          props: (route) => ({
            ...route.params,
            id: parseInt(route.params.id),
          }),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // return savedPosition || { top: 0 };
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ top: 0, behavior: "smooth" });
        }, 300);
      })
    );
  },
});

router.beforeEach((to, from) => {
  // ? need to login if not already logged in
  console.log("beforeEach-to", to);
  if (to.meta.requiresAuth && !window.user) {
    return {
      name: "login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
