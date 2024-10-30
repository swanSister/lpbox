<template>
  <div>
    <div id="ari" @click="colorChange">아리{{ rainbowIdx }}</div>
    <div @click="colorChange">팬텀</div>
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
      rainbowList:['red','orange','yellow','green','blue','indigo','purple'],
      rainbowIdx:0,
      intervalId:null
    }
  },
  methods:{
    autoColorChange(e){
      let that = this
      if(this.intervalId){
        clearInterval(this.intervalId)
        this.intervalId = null
      }
      that.intervalId = setInterval(function(){
        that.colorChange(e)
      },1000)
    },
    colorChange(e){
      if( this.rainbowIdx>6) {
        this.rainbowIdx = this.rainbowIdx%6-1;
      }
      e.target.style=`background-color:${this.rainbowList[this.rainbowIdx]}`;
      this.rainbowIdx++
    }
  },
  mounted(){
   
  }
}
</script>
<style scoped>
div{
  color:white;
  font-size:10vw;
  background-color: red;
  padding:1vw;
  border-radius:30%;
}
</style>