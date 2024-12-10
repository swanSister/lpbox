<script>
import MarsLoading from './components/mars/Loading.vue'
import "./assets/css/main.css"
import "./assets/css/fontello.css"
export default {
  components:{
    MarsLoading
  },
  data(){
      return{
        isMarsLoadingShow:false
      }
  },
  methods: {
    showMarsLoading(){
      this.isLoadingShow = true
      
    },
    hideMarsLoading(){
      this.isLoadingShow = false
    }
  },
  mounted(){
      this.emitter.on('showMarsLoading',this.showMarsLoading)
      this.emitter.on('hideMarsLoading',this.hideMarsLoading)
  }
}

</script>

<template>
  <MarsLoading v-if="isMarsLoadingShow"></MarsLoading>
  <router-view/>
</template>

<style scoped>

</style>
