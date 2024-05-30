// src/router/index.js (or wherever your router setup is)

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Seasons from '../components/Seasons.vue';
import Characters from '../components/Characters.vue';
import Location from '../components/Location.vue';
import singlechar from '../components/singlechar.vue';
import singleloc from '../components/singleloc.vue';
import epseason from '../components/epseason.vue';
const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/Characters", name: "Characters", component: Characters },
  { path: "/Seasons", name: "Seasons", component: Seasons },
  { path: "/Location", name: "Location", component: Location },
  { path: "/character/:id", name: "singlechar", component: singlechar, props: true },
  { path: '/location/:id', name: "singleloc" , component: singleloc, props: true},
  { path: '/episode/:id', name: "epseason" , component: epseason, props: true },  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
