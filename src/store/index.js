import { createStore } from 'vuex'
const store = createStore({
  state: {
    isAdmin: localStorage.isAdmin ? localStorage.isAdmin:false,
  },
  mutations: {
    isAdmin (state, value) {
      localStorage.setItem('isAdmin',value) 
      state.me = value
    }
  }
})

export default store
