import Vue from "vue";
import VueRouter from "vue-router";
import RoutersCabine from "./cabine";
import store from "@/store/index";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/404",
  },
  {
    path: "/error-config",
    name: "errorConfig",
    component: () => import("@/views/error-config.vue"),
  },
  {
    path: "/init/:id",
    name: "initializeTotem",
    component: () => import("@/views/init/index.vue"),
  },
  {
    path: "/manutencao",
    name: "manutencao",
    component: () => import("@/views/cabine/vManutencao.vue"),
  },
  {
    path: "/cabine",
    name: "cabine",
    component: () =>
      import(/* webpackChunkName: "cabine" */ "@/views/cabine/index.vue"),
    children: RoutersCabine,
    redirect: "/cabine/home",
    beforeEnter: (to, from, next) => {
      //regra para bloquear sem o init
      const totem = store.getters["totem/getTotem"];
      if (totem.id && totem.id.length > 3) {
        next();
      } else {
        next("/404");
      }
    },
  },
  {
    path: "/404",
    name: "error-404",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

if (process.env.VUE_APP_ENV !== "production") {
  routes.push({
    path: "/dev",
    name: "dev",
    component: () => import("@/views/cabine/editor/vEditor.vue"),
  });
}

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
