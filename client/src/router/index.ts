import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import(/* webpackChunkName: "about" */ '../views/Resources.vue')
  },
  {
    path: '/operations',
    name: 'Operations',
    component: () => import(/* webpackChunkName: "about" */ '../views/Operations.vue')
  },
  {
    path: '/fields',
    name: 'Fields',
    component: () => import(/* webpackChunkName: "about" */ '../views/Fields.vue')
  },
  {
    path: '/complete',
    name: 'Complete',
    component: () => import(/* webpackChunkName: "about" */ '../views/Complete.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
