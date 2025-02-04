import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginRegisterView from "../views/LoginRegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginRegisterView,
    },
    {
      path: "/registrar",
      name: "Registrar",
      component: LoginRegisterView,
    },
    {
      path: "/equipos",
      name: "Equipos",
      component: () => import("../views/TeamsView.vue"),
    },
    {
      path: "/equipo/General",
      name: "Equipo | General",
      component: () => import("../views/ClubView.vue"),
      props: (route) => ({ id: route.query.id, name: route.query.name })
    },
    {
      path: "/equipo/Plantilla",
      name: "Equipo | Plantilla",
      component: () => import("../views/ClubView.vue"),
      props: (route) => ({ id: route.query.id, name: route.query.name })
    },
    {
      path: "/equipo/Resultados",
      name: "Equipo | Resultados",
      component: () => import("../views/ClubView.vue"),
      props: (route) => ({ id: route.query.id, name: route.query.name })
    },
    {
      path: "/equipo/Sanciones",
      name: "Equipo | Sanciones",
      component: () => import("../views/ClubView.vue"),
      props: (route) => ({ id: route.query.id, name: route.query.name })
    },
    {
      path: "/clasificaciones",
      name: "Clasificaciones",
      component: () => import("../views/ClassificationsView.vue"),
    },
    {
      path: "/reglamento",
      name: "Reglamento",
      component: () => import("../views/RulesView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
