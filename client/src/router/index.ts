import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "basicInfoRegular" */ '../views/BasicInfo.vue')
  },
  {
    path: '/regular/resources',
    name: 'Resources',
    component: () => import(/* webpackChunkName: "resources" */ '../views/RegularNode/Resources.vue')
  },
  {
    path: '/regular/operations',
    name: 'Operations',
    component: () => import(/* webpackChunkName: "operations" */ '../views/RegularNode/Operations.vue')
  },
  {
    path: '/regular/fields',
    name: 'Fields',
    component: () => import(/* webpackChunkName: "fields" */ '../views/RegularNode/Fields.vue')
  },
  {
    path: '/regular/complete',
    name: 'Complete',
    component: () => import(/* webpackChunkName: "complete" */ '../views/RegularNode/Complete.vue')
  },
  {
    path: '/trigger/properties',
    name: 'Events',
    component: () => import(/* webpackChunkName: "properties" */ '../views/TriggerNode/Properties.vue')
  },
  {
    path: '/trigger/fields',
    name: 'Fields',
    component: () => import(/* webpackChunkName: "fieldsTrigger" */ '../views/TriggerNode/Fields.vue')
  },
  {
    path: '/trigger/complete',
    name: 'Events',
    component: () => import(/* webpackChunkName: "completeTrigger" */ '../views/TriggerNode/Complete.vue')
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
