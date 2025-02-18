<template>
    <div>
      <div class="title" @click="goToPage('lpbox')">LP BOX</div>
      <div class="title" @click="goToPage('mars')">Mars rovers</div>
      <div class="title" @click="goToPage('kakaogame')">Kakao game</div>
      <div class="title" @click="goToPage('arido')">Arido</div>
    </div>
  </template>
  
  <script>
  export default {
    components:{
    
    },
    props:{
      
    },
    data () {
      return {
        
      }
    },
    methods:{
        goToPage(to){
            if(to=='lpbox'){
                this.$router.push({
                path : '/lpbox/login',
                name : '/lpbox/login'
                })
            }
            else if(to=='mars'){
              this.$router.push({
                path : '/mars/main',
                name : '/mars/main'
                })
            }else if(to=='kakaogame'){
              window.location=`http://3.34.211.151:3004`
            }else if(to=='arido'){
              this.$router.push({
                path : '/arido/main',
                name : '/arido/main'
                })
            }
        }
    },
    mounted(){
     
    }
  }
  </script>
  <style scoped>
  .title{
    font-size:6vw;
    padding:4vw;
    border-bottom:1px solid rgba(0,0,0,.5);
  }
  </style>