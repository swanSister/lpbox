import { createWebHistory, createRouter } from 'vue-router'
import Main from '../pages/main.vue'
import Upload from '../pages/upload.vue'
import Test from '../pages/test.vue'

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/main',
    component: Main
  },
  {
    path: '/upload',
    component: Upload
  },
  {
    path: '/test',
    component: Test
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});


