import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/brands',
    name: 'brands',
    component: () => import('../views/Brands.vue')
  },
  {
    path: '/brands/:id',
    name: 'brand-detail',
    component: () => import('../views/BrandDetail.vue')
  },
  {
    path: '/special-offers',
    name: 'special-offers',
    component: () => import('../views/SpecialOffers.vue')
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/blogs/:id',
    name: 'blog-detail',
    component: () => import('../views/BlogDetail.vue')
  },
  {
    path: '/category/:category',
    name: 'category',
    component: () => import('../views/CategoryPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router 