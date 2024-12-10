<template>
    <div class="header">
      
      LP BOX
      
    </div>
  </template>
  
  <script>
  export default {
    props:{
      
    },
    
    data () {
      return {
      }
    },
    methods:{
      
    },
    mounted(){
      console.log("header")
    }
  }
  </script>
  <style scoped>
  .header{
    position:absolute 0 0 0 0;
    font-size: 8vw; font-weight: bold;
    color:rgb(0,0,0);
    border-bottom: 0.5px solid rgba(0,0,0,0.5);
    display:flex; flex-direction: column;
    min-width: 100%; max-width: 100%;
    min-height: 14vw; max-height: 14vw;
    align-items: center; justify-content: center;
    margin-bottom: 2vw;
  }
  .header .add-btn{
    color:rgb(0,0,0);
    font-size:6vw;
    position:absolute; right:2vw;
  }
  </style>