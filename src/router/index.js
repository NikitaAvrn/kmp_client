import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { mapActions, mapGetters } from 'vuex'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Информация',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/requests',
    name: 'Заявки на перевозку',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Requests.vue'),
  },

  {
    path: '/request',
    name: 'Заявка на перевозку',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Request.vue'),
  },
  {
    path: '/manifest',
    name: 'Манифест',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Manifest.vue'),
  },
  {
    path: '/invoice',
    name: 'Счета',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Invoice.vue'),
  },
  {
    path: '/dislocation',
    name: 'Дислокация груза',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Dislocation.vue'),
  },
  {
    path: '/history',
    name: 'История перевозок',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/History.vue'),
  },
  {
    path: '/users',
    name: 'Пользователи',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Users.vue'),
  },
  {
    path: '/settings',
    name: 'Настройки',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/login',
    name: 'Авторизация',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.auth)

  if (requireAuth) {
    await store.dispatch('checkLogin')
  }

  if (requireAuth && !store.getters.LOGIN) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
