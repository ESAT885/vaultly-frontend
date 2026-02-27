import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import LandingPage from '../views/LandingPage.vue'
import FilesPage from '../views/FilesPage.vue'
import VideoPages from '../views/VideoPages.vue'
import VideoPagesDetail from '../views/VideoPagesDetail.vue'
import { useAuthStore } from "@/stores/auth.store";
import UploadFileView from '@/views/UploadFileView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/login", component: LoginView },
    { path: "/", component: DashboardView, meta: { requiresAuth: true } },
    { path: "/landing", component: LandingPage },

    { path: "/videos", component: VideoPages, meta: { requiresAuth: true } },
    { path: "/videos/:videoId", component: VideoPagesDetail, meta: { requiresAuth: true } },
    { path: "/files", component: UploadFileView, meta: { requiresAuth: true } },
    {
        path: '/machines',
        name: 'machine-list',
        component: () => import('../modules/machine/views/MachineListView.vue')
      },
      {
        path: '/machines/create',
        name: 'machine-create',
        component: () => import('../modules/machine/views/MachineCreateView.vue')
      },
      {
        path: '/machines/:id/edit',
        name: 'machine-edit',
        component: () => import('../modules/machine/views/MachineEditView.vue')
      },
  ],
})
router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  authStore.loadFromStorage()
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});
export default router
