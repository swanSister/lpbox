<template>
  <div>
    <mainHeader/>
      <div class="lp-list">
        <li v-for="item in lpList" :key="item.lpId">
          <div class="card">
            <img class="lp-img" v-if=item.imgList[0] :src='item.imgList[0]'/>
            <img class="lp-img none" v-else/>
            <div class="content">
              <div>
                <span class="title">제목</span>
                <span>{{item.name}}</span>
              </div>
              <div>
                <span class="title">가수</span>
                <span>{{item.singer}}</span>
              </div>
              <div>
                <span class="title">발매일</span>
                <span>{{getTime(item.releaseDate)}}</span>
              </div>
              <div>
                <span class="title">설명</span>
                <span>{{item.description}}</span>
              </div>
              <div>
                <span class="title">가격</span>
                <span>{{item.price}}</span>
              </div>
              <div>
                <span class="title">장르</span>
                <span>{{item.genre}}</span>
              </div>
            </div>
          </div>
          <div class="more-btn" v-on:click="goToGoogle(`${item.name} ${item.singer}`)">더보기</div>
        </li>
      </div>
  </div>
</template>

<script>
import api from '../api/api.vue'
import mainHeader from '../components/header/index.vue'
export default {
  components:{
    api,
    mainHeader
  },
  props:{
  
  },
  data () {
    return {
     lpList : [],
    }
  },
  methods:{
    async getAllLpList(){
                                            
      let res = await this.$.components.api.getAllLpList()
      if(res.status == 200){
        
        this.lpList = res.data.data
        
        for(var i in this.lpList){
          if(this.lpList[i].imgList){
            this.lpList[i].imgList = JSON.parse(this.lpList[i].imgList) 
          }
        }
         
        
        console.log("get lp list success!!!", this.lpList)
      }else{
        console.log("fail!!")
          console.error(writingRes)
          console.log("eeeerror")
          
        }
    },
    getTime(t){
      let curr = new Date()
      let time = new Date(t).getTime() + (curr.getTimezoneOffset() * 60 * 1000);
      let year = new Date(time).getFullYear()
      let month = new Date(time).getMonth()+1
      let date = new Date(time).getDate()

      return `${year}-${month}-${date}`
      // let today = this.$moment().format('YYYYMMDD')
      // let day = this.$moment(time).format('YYYYMMDD')
      // let yesterday = this.$moment().subtract(1, 'days').format('YYYYMMDD')
      // let year = this.$moment().format('YYYY')
      

      // if(today == day){
      //   return this.$moment(time).format('a h:mm')
      // }else if(day == yesterday){
      //   return '어제'
      // }else if(year == this.$moment(time).format('YYYY')){
      //   return this.$moment(time).format('MM월 DD일')
      // }
      // else{
      //   return this.$moment(time).format('YYYY.MM.DD')
      // }
    },
    goToGoogle(title){
      var encodedComponent = encodeURIComponent(title);
      var googleSafeComponent = encodedComponent.replace(/%20/g,'+');  
      console.log(`https://www.google.com/search?q=${googleSafeComponent}`)
      window.location=`https://www.google.com/search?q=${googleSafeComponent}`
    }
  },
  mounted(){
    this.getAllLpList()
    console.log("SAFSAASD")
  }
}
</script>
<style scoped>

li{
  list-style: none;
  border-bottom : 0.5px solid rgba(0,0,0,0.5);
  padding-bottom: 3vw;
}
.lp-list{
  font-size:4vw;
  color:rgb(91,79,67);
  padding : 1vw;
  display:flex;
  flex-direction: column;
}
.card{
  align-items: center;
}
.lp-list > li{
  margin-bottom: 4vw;  
}
.lp-list >li > div{
  display:flex;
  margin-bottom: 2vw;
}
.lp-list .lp-img{
  min-width: 25vw;
  max-width: 25vw;
  min-height: 25vw;
  max-height: 25vw;

  object-fit: cover;
  border : 0.5px solid rgba(0,0,0,0.5);
}
.lp-list .lp-img.none{
  background-color: rgba(123,86,72,0.3);
}
.lp-list .content{
  display:flex;
  flex-direction: column;
  margin-left:2vw;
  justify-content: center
}
.lp-list .content > div{
  display:flex;
}
.lp-list .content > div > .title{
  min-width: 13vw;
  max-width: 15vw;
  border-right: 0.5px solid rgba(0,0,0,0.5) ;
}
.lp-list .content > div > span{
 display: flex;
 margin-left: 2vw;
}
.lp-list .more-btn{
  color:white;
  justify-content: center;
  margin:0 30vw;
  padding: 1vw 0;
  border-radius: 10vw;
  background-color: rgb(123,86,72);
}
</style>