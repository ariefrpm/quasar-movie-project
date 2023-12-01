import IndexPage from 'pages/IndexPage.vue'
import MoviePage from 'pages/MoviePage.vue'
import MainLayout from 'layouts/MainLayout.vue'

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [
      { path: "", name:"index", component: IndexPage},
      { path: "/movie", name:"movie", component: MoviePage},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
