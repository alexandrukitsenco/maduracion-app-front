import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AnalyzeView from '@/views/AnalyzeView.vue'
import ResultView from '@/views/ResultView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: AnalyzeView,
      beforeEnter: (to, from, next) => {
        if (from.name === 'home') {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView,
      beforeEnter: (to, from, next) => {
        if (from.name === 'analyze') {
          next()
        } else {
          next({ name: 'home' })
        }
      }
    }
  ]
})

export default router