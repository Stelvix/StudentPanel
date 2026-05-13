import StudentsList from '@/Components/Admin-view/StudentsList.vue'
import StudentsView from '@/Components/Admin-view/StudentsView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: StudentsList,
    },
    {
      path: '/students/:id',
      name: 'studentView',
      component: StudentsView,
    },
  ],
})

export default router
