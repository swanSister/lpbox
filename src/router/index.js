import { createWebHistory, createRouter } from 'vue-router'
import Main from '../pages/main.vue'
import Upload from '../pages/upload.vue'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/upload',
    component: Upload
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});


