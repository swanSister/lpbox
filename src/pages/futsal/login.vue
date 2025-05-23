<template>
  <div>
    <loginHeader/>
    <div>
      <div class="user-list">
        <div class="user-card" v-for="item in userList" :key="item.userId" @click="login(item)">
          {{ item.id }}

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/api.vue'
import loginHeader from '../../components/futsal/header/login.vue'
export default {
  components:{
    api,
    loginHeader,
  },
  props:{
  
  },
  data () {
    return {
      userList:[],
    }
  },
  methods:{
    async getAllUser(){        
      let res = await this.$.components.api.getAllUser()
      if(res.status == 200){
        console.log("@@@@@",res.data.data)
        this.userList = res.data.data
        if(!this.userList) this.userList = []
      }else{
        console.log("fail!!")
          console.error(writingRes)
          console.log("eeeerror")
      }
    },
  login(user){
    window.localStorage.setItem('user',JSON.stringify(user))
    this.$router.push({
    path : '/lpbox/main',
    name : '/lpbox/main'
    })
  }
  },
 
  mounted(){
    this.getAllUser()
    console.log("SAFSAASD")
  }
}
</script>
<style scoped>
.user-card{
  font-size: 6vw;
  background-color:  rgb(0,0,0);
  padding: 4vw 10vw;
  color:white;
  margin: 4vw;
}

</style>