import { createRouter, createWebHistory } from "vue-router";

// store vuex
import store from "../store";

// define routes
const routes = [
  {
    path: "/register",
    name: "register",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: "/customer/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/Index.vue"),
    // check in loggedIn
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer/order",
    name: "order",
    component: () => import("../views/order/Index.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer/order/:snap_token",
    name: "detail_order",
    component: () => import("../views/order/Show.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/Index.vue"),
  },
  {
    path: "/product/:slug",
    name: "detail_product",
    component: () => import("../views/product/Show.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import("../views/category/Index.vue"),
  },
  {
    path: "/category/:slug",
    name: "detail_category",
    component: () => import("../views/category/Show.vue"),
  },
];

// create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// define route for handle authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // cek nilai getters isLoggedIn di module auth
    if (store.getters["auth/isLoggedIn"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
