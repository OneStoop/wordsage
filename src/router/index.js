import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'

function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`)
}
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: loadView('Home')},
    { path: '/wordsage', name: 'wordsage', component: loadView('WordSage')},
    { path: '/wordsage/:id', name: 'wordsageRandom', component: loadView('WordSage')}
  ]
})

Vue.use(VueRouter)
Vue.use(VueMeta)

// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (store.getters.isAuthenticated) {
//       next()
//       return
//     }
//     next('/signin')
//   } else {
//     next()
//   }
// })
export default router
