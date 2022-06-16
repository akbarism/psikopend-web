import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/overview",
    component: HomeView,
    meta: { requiresAuth: true },
    children: [
      {
        path: "/overview",
        name: "home",
        component: () => import("../views/Overview.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/user-management",
        name: "manageUser",
        component: () => import("../views/user/manageUser.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/",
    name: "Welcome",
    component: () => import("../views/Welcome"),
    meta: { requiresVisitor: true },
  },

  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
    meta: { requiresVisitor: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.getUser) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    if (store.getters.getUser) {
      if (store.state.status == 1) {
        next({
          path: "/overview",
        });
      } else {
        next({
          path: "/overview",
        });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
