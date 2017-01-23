import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  base: '/vue-boilerplate/',
  routes: [
    {
      path: '/',
      component: resolve => require(['src/views/Home/index.vue'], resolve),
      children: routes
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next()
  if (localStorage.token) {
    Vue.http.get('/users/me')
    .then((response) => {
      next(vm => {
        vm.user = response.body
      })
    })
    .catch((response) => {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    })
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})

Vue.router = router

export default router
