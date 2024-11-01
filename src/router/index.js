import { createWebHashHistory, createRouter } from 'vue-router'
import Main from '../pages/main.vue'
import Login from '../pages/login.vue'
import Upload from '../pages/upload.vue'
import Test from '../pages/test.vue'
import Edit from '../pages/edit.vue'

const routes = [

  {
    path: '/',
    component: Login
  },
  {
    name:'login',
    path: '/login',
    component: Login
  },
  {
    name:'main',
    path: '/main',
    component: Main
  },
  {
    name:'upload',
    path: '/upload',
    component: Upload
  },
  {
    name:'edit',
    path: '/edit',
    component: Edit,
    props: true
  },
  {
    name:'test',
    path: '/test',
    component: Test
  }
  
]

export const router = createRouter({
  history: createWebHashHistory(),  
  routes,
});


