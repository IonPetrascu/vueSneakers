import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: async () => await import('../views/HomeView.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: async () => await import('../views/FavoritesView.vue')
    }, {
      path: '/profile',
      name: 'profile',

       component: async () => await import('../views/ProfileView.vue')
    }, {
      path: '/orders',
      name: 'orders',
      component: async () => await import('../views/OrdersView.vue')
    }

  ],
  linkActiveClass: 'active-link'
})

export default router
