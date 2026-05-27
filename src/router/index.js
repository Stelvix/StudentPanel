import StudentsList from '@/Components/Admin-view/StudentsList.vue'
import StudentsView from '@/Components/Admin-view/StudentsView.vue'
import ModifyStudent from '@/Components/Admin-view/ModifyStudent.vue'
import AddStudents from '@/Components/Admin-view/AddStudents.vue'
import Login from '@/Components/Login.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: StudentsList,
      meta: { requiresAdmin: true },
    },
    {
      path: '/students/:id',
      name: 'studentView',
      component: StudentsView,
      meta: { requiresAdmin: true },
    },
    {
      path: '/modifyStudents/:id',
      name: 'modifyStudent',
      component: ModifyStudent,
      meta: { requiresAdmin: true },
    },
    {
      path: '/newStudent/',
      name: 'newStudent',
      component: AddStudents,
      meta: { requiresAdmin: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAdmin) {
    if (!authStore.user) {
      return next('/login')
    }
  }
  next()
})

export default router
