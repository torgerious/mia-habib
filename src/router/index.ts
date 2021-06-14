import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Work from "@/views/Work.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import Article from "@/views/Article.vue";
import Press from "@/views/Press.vue";
import Calendar from "@/views/Calendar.vue";
import Contact from "@/views/Contact.vue";
import People from "@/views/People.vue";
import Presenters from "@/views/Presenters.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {path: '/', name: 'Home', component: Home },
  { path: '/work', name: 'Work', component: Work },
  { path: '/login', name: 'Login', component: Login},
  { path: '/profile', name: 'profile', component: Profile},
  { path: '/article/:id', name: 'article', component: Article},
  { path: '/press', name: 'press', component: Press},
  { path: '/calendar', name: 'calendar', component: Calendar},
  { path: '/contact', name: 'contact', component: Contact},
  { path: '/people', name: 'people', component: People},
  { path: '/presenters', name: 'presenters', component: Presenters},

  {path: '/about', name: 'About' ,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
