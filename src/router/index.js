import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const ifAuthenticated = (to, from, next) => {
  if (sessionStorage.usuario) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Administrador.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/docentes",
    name: "Docentes",
    component: () =>
      import(/* webpackChunkName: "docentes" */ "../views/Docentes.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/alumnos",
    name: "Alumnos",
    component: () =>
      import(/* webpackChunkName: "alumnos" */ "../views/Alumnos.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/proyectos",
    name: "Proyectos",
    component: () =>
      import(/* webpackChunkName: "proyectos" */ "../views/Proyectos.vue"),
    beforeEnter: ifAuthenticated,
  },
  {
    path: "/estadisticas",
    name: "Estadisticas",
    component: () =>
      import(
        /* webpackChunkName: "estadisticas" */ "../views/Estadisticas.vue"
      ),
    beforeEnter: ifAuthenticated,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
