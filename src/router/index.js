import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginRegisterView from "@/views/LoginRegisterView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { priority: 1.0 }
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
    meta: { priority: 1.0 }
  },
  {
    path: "/clasificaciones",
    name: "Clasificaciones",
    component: () => import("../components/common/GroupsTables.vue"),
    meta: { priority: 1.0 }
  },
  {
    path: "/playoffs/champions",
    name: "Champions",
    component: () => import("../views/ChampionsView.vue"),
    meta: { priority: 1.0 }
  },
  {
    path: "/playoffs/uefa",
    name: "UEFA",
    component: () => import("../views/UEFAView.vue"),
    meta: { priority: 1.0 }
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
    props: (route) => ({ id: route.query.id, name: route.query.name }),
    meta: { priority: 1.0 }
  },
  {
    path: "/reglamento",
    name: "Reglamento",
    component: () => import("../views/RulesView.vue"),
    meta: { priority: 1.0 }
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
export { routes };