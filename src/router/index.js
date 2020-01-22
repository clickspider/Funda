import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "notfound",
    component: NotFound
  },
  {
    path: "/",
    name: "home",
    component: Home
  }
  // I choose to install router in case in the future I want to add extra stuff, details, etc.
  // {
  //   path: "/about/:id",
  //   name: "about",
  //   props: true,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
