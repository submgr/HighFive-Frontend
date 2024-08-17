import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/WebApp/HelloScreen'
  },
  {
    path: '/WebApp/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/WebApp/HelloScreen'
      },
      {
        path: 'Beneficiary',
        redirect: '/WebApp/Beneficiary/MyRequests'
      },
      {
        path: 'Beneficiary/MyRequests',
        component: () => import('@/views/Beneficiary/MyRequests.vue')
      },
      {
        path: 'Beneficiary/NewRequest',
        component: () => import('@/views/Beneficiary/NewRequest.vue')
      },
      {
        path: 'Beneficiary/ViewRequest/:id',
        component: () => import('@/views/Beneficiary/ViewRequest.vue')
      },
      {
        path: 'Volunteer',
        redirect: '/WebApp/Volunteer/MyRequests'
      },
      {
        path: 'Volunteer/GettingReady',
        component: () => import('@/views/Volunteer/GettingReady.vue')
      },
      {
        path: 'Volunteer/MyRequests',
        component: () => import('@/views/Volunteer/MyRequests.vue')
      },
      {
        path: 'Volunteer/ViewRequest/:id',
        component: () => import('@/views/Volunteer/ViewRequest.vue')
      },
      {
        path: 'Volunteer/PassQuiz',
        component: () => import('@/views/Volunteer/PassQuiz.vue')
      },
      {
        path: 'Volunteer/AvailableRequests',
        component: () => import('@/views/Volunteer/AvailableRequests.vue')
      },
      {
        path: 'Profile/SetName',
        component: () => import('@/views/Profile/SetName.vue')
      },
      {
        path: 'Home',
        component: () => import('@/views/HomeScreen.vue')
      },
      {
        path: 'AboutApp',
        component: () => import('@/views/AboutApp.vue')
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'HelloScreen',
        component: () => import('@/views/HelloScreen.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
