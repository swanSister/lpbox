<template>
  <div class="header">
    LP BOX
    <span class="add-btn icon-plus" v-on:click="this.$router.push('upload')"></span>
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
  font-size: 10vw; font-weight: bold;
  color:rgb(91,79,67);
  border-bottom: 0.5px solid rgba(0,0,0,0.5);
  display:flex; flex-direction: column;
  min-width: 100%; max-width: 100%;
  min-height: 20vw; max-height: 20vw;
  align-items: center; justify-content: center;
  margin-bottom: 2vw;
}
.header .add-btn{
  font-size:8vw;
  position:absolute; right:2vw;
}

</style>