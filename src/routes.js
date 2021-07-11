import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/player/:playerId",
    name: "player",
    component: () => import("./pages/PlayerViewPage"),
  },
  {
    path: "/team/:teamId",
    name: "team",
    component: () => import("./pages/TeamViewPage"),
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("./pages/FavoritePage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/currentGames",
    name: "currentGames",
    component: () => import("./pages/CurrentGamesPage"),
   
  },
  {
    path: "/manageLeague",
    name: "manageLeague",
    component: () => import("./pages/ManageLeaguePage"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
