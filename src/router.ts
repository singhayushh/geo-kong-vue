import { RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import Docs from './views/Docs.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/docs',
    name: 'Docs',
    component: Docs,
  },
];

export default routes;
