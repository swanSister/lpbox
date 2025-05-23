import { createWebHashHistory, createRouter } from 'vue-router'
import Main from '../pages/main.vue'
import LpboxMain from '../pages/lpbox/main.vue'
import LpboxLogin from '../pages/lpbox/login.vue'
import LpboxUpload from '../pages/lpbox/upload.vue'
import LpboxEdit from '../pages/lpbox/edit.vue'
import Mars from '../pages/mars/MarsMain.vue'
import Arido from '../pages/arido/AridoMain.vue'
import Game from '../pages/game.vue'
import Futsal from '../pages/futsal/main.vue'
import FutsalUpload from '../pages/futsal/upload.vue'
const routes = [
  {
    path: '/',
    component: Main
  },
  {
    name:'/main',
    path: '/main',
    component: Main
  },
  {
    name:'/lpbox/main',
    path: '/lpbox/main',
    component: LpboxMain
  },
  {
    name:'/lpbox/login',
    path: '/lpbox/login',
    component: LpboxLogin
  },
  {
    name:'/lpbox/upload',
    path: '/lpbox/upload',
    component: LpboxUpload
  },
  {
    name:'/lpbox/edit',
    path: '/lpbox/edit',
    component: LpboxEdit
  },
  {
    name:'/mars/main',
    path: '/mars/main',
    component: Mars
  },
  {
    name:'/arido/main',
    path: '/arido/main',
    component: Arido
  },
  {
    name:'/game',
    path: '/game',
    component: Game
  },
  {
    name:'/futsal/main',
    path: '/futsal/main',
    component: Futsal
  },
  {
    name:'/futsal/upload',
    path: '/futsal/upload',
    component: FutsalUpload
  },
]

export const router = createRouter({
  history: createWebHashHistory(),  
  routes,
});


