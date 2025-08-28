import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MenuPage from '../views/MenuPage.vue'
import OurStoryPage from '../views/OurStoryPage.vue'
import LocationPage from '../views/LocationPage.vue'
import NewsPage from '../views/NewsPage.vue'
import ReservationPage from '../views/ReservationPage.vue'
import AdminMenuManager from '@/admin/views/AdminMenuManager.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
path:'/admin',
name:"AdminDashboard",
component: AdminMenuManager
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuPage
  },
  {
    path: '/our-story',
    name: 'OurStory',
    component: OurStoryPage
  },
  {
    path: '/location',
    name: 'Location',
    component: LocationPage
  },
  {
    path: '/news',
    name: 'News',
    component: NewsPage
  },
  {
    path: '/reservation',
    name: 'Reservation',
    component: ReservationPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router