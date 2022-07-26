import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Page/HomeView.vue";
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
        component: () => import("../views/Page/Overview.vue"),
        meta: { requiresAuth: true },
      },

      {
        path: "/user-management",
        name: "manageUser",
        component: () => import("../views/user/manageUser.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/article-management",
        name: "manageArticle",
        component: () => import("../views/article/manageArticle.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/kegmah-management",
        name: "kegmah",
        component: () => import("../views/kegiatanMahasiswa/manageKegMah.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/create-kegmah",
        name: "createKegmah",
        component: () => import("../views/kegiatanMahasiswa/createKegMah.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/create-article",
        name: "createArticle",
        component: () => import("../views/article/createArticle.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/category-article-management",
        name: "categoryArticleManagement",
        component: () => import("../views/article/manageKategoriArtikel.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/update-article/:id",
        name: "updateArticle",
        component: () => import("../views/article/updateArticle"),
        meta: { requiresAuth: true },
      },
      {
        path: "/update-kegmah/:id",
        name: "updateArticle",
        component: () => import("../views/kegiatanMahasiswa/updateKegMah.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/about-management",
        name: "aboutManagement",
        component: () => import("../views/About/manageAbout.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/slide-management",
        name: "slideManagement",
        component: () => import("../views/slideUnggulan/manageUnggulan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/dosen-management",
        name: "dosenManagement",
        component: () => import("../views/listDosen/manageDosen.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/testimoni-management",
        name: "testimoniManagement",
        component: () => import("../views/Testimoni/manageTestimoni.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sertifikasi-management",
        name: "sertifikasiManagement",
        component: () => import("../views/Sertifikasi/manageSertifikasi.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/gallery-management",
        name: "galleryManagement",
        component: () => import("../views/Gallery/manageGaleri.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/page-management",
        name: "pageManagement",
        component: () => import("../views/managePage/manageKategoriPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/",
    name: "Welcome",
    component: () => import("../views/Page/Welcome"),
    meta: { requiresVisitor: true },
  },
  {
    path: "/profile",
    name: "Profileview",
    component: () => import("../views/Page/profileView"),
    meta: { requiresVisitor: true },
  },
  {
    path: "/gallery",
    name: "galleryView",
    component: () => import("../views/Page/galleryView"),
    meta: { requiresVisitor: true },
  },
  {
    path: "/all-article",
    name: "allArticle",
    component: () => import("../views/Page/beritaArtikelView.vue"),
    meta: { requiresVisitor: true },
  },
  {
    path: "/all-kegiatanmahasiswa",
    name: "allArticle",
    component: () => import("../views/Page/kegiatanMahasiswaView.vue"),
    meta: { requiresVisitor: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Page/Login.vue"),
    meta: { requiresVisitor: true },
  },
  {
    path: "/view-content/:id",
    name: "viewArticle",
    component: () => import("../views/article/viewArticle.vue"),
  },
  {
    path: "/view-content-kegmah/:id",
    name: "viewKegmeh",
    component: () => import("../views/kegiatanMahasiswa/viewKegMah.vue"),
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
