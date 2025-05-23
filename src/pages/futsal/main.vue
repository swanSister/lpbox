<template>
  <div>
    <mainHeader/>
   
    <div class="input-content">
      <span class="icon icon-search"></span>
      <select class="search-list" v-model="searchOption">
        <option value="name">제목</option>
        <option value="singer">가수</option>
        <option value="genre">장르</option>
      </select>
      <select v-if="searchOption=='genre'" class="genre-list" v-model="searchGenreOption" @change="searchGenre()">
        <option value="none" selected="selected">=== 선택 ===</option>
        <option value="KOREAN">한국노래</option>
        <option value="JAZZ_BLUES">재즈&블루스</option>
        <option value="POP">팝</option>
        <option value="HIPHOP">힙합</option>
        <option value="RNB_SOUL">R&B 소울</option>
        <option value="ROCK">락</option>
        <option value="OST">O.S.T</option>
        <option value="ETC">기타</option>
      </select>
      <input v-if="searchOption!='genre'" @keypress="onKeyPress" v-model="keyword" placeholder="검색어를 입력해 주세요.">
      <span v-show="isSearched" @click ="resetList" class="icon icon-cancel"></span>
    </div>
      
      <div class="futsal-list">
        <div v-if="futsalList.length>0" class="count">{{ futsalList.length }}개</div>
        <li v-for="item in futsalList" :key="item.lpId">
          <div class="card" >
            <div class="content">
              <div>
                <span class="title">장소</span>
                <span>{{item.location}}</span>
              </div>
              <div>
                <span class="title">날짜</span>
                <span>{{getTime(item.futsalDate)}}</span>
              </div>
              <div>
                <span class="title">참석인원</span>
                <div class="member-list">
                  <div v-for="member in item.memberList" :key="member.id" class="member-item">

                    - {{ member.name }}/{{ member.age }}/{{ member.location }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </div>
  </div>
</template>

<script>
import api from '../../api/api.vue'
import mainHeader from '../../components/futsal/header/index.vue'
export default {
  components:{
    api,
    mainHeader,
  },
  props:{
  
  },
  data () {
    return {
     futsalList : [],
     user : {},
     futsalList_org : [],
     keyword:'',
     searchOption:'name',
     isSearched:false,
     searchGenreOption:'=== 선택 ===',
    }
  },
  methods:{
    async getAllFutsalList(){               
      let res = await this.$.components.api.getAllFutsalList()
      if(res.status == 200){
        console.log("@@@@@",res.data.data)
        

        this.futsalList = res.data.data
        this.futsalList.forEach(item => {
          item.memberList = JSON.parse(item.memberList)
        })
        if(!this.futsalList) this.futsalList = []
        
        this.futsalList_org = JSON.parse(JSON.stringify(this.futsalList))
        console.log("get futsal list success!!!", this.futsalList)
      }else{
        console.log("fail!!")
          console.error()
          console.log("eeeerror")
          
        }
    },
    checkLogin(back){
      if(!this.user.isAuth){
        let pw = prompt(`ID:${this.user.id} 비밀번호를 입력하세요`,'')
        if(pw==this.user.pw){
          this.user.isAuth = true
          window.localStorage.setItem('user',JSON.stringify(this.user))
          return true
        }else{
          alert("비밀번호가 틀렸습니다.")
          if(!back){
            this.$router.go(-1)
          }
          return false
        }
      }else{
        return true
      }
    },
    getTime(t){
      let curr = new Date()
      let time = new Date(t).getTime() + (curr.getTimezoneOffset() * 60 * 1000);
      let year = new Date(time).getFullYear()
      let month = new Date(time).getMonth()+1
      let date = new Date(time).getDate()
      let day = new Date(time).getDay(); // 0 (일) ~ 6 (토)
      const days = ['일', '월', '화', '수', '목', '금', '토']
      const weekday = days[day]
      if(month<10){month = `0${month}`}
      if(date<10){date = `0${date}`}

      return `${year}/${month}/${date} (${weekday})`
    },
    goToGoogle(title){
      var encodedComponent = encodeURIComponent(title);
      var googleSafeComponent = encodedComponent.replace(/%20/g,'+');  
      console.log(`https://www.google.com/search?q=${googleSafeComponent}`)
      window.location=`https://www.google.com/search?q=${googleSafeComponent}`
    },
    onKeyPress(e){
      if (e.keyCode == 13) {
        console.log("search!!!")
        this.searchList()
      }
    },
    searchList(){
      this.isSearched = true
      let that = this
      this.futsalList = this.futsalList_org.filter(function(e){
        if(that.searchOption == 'name'){
          if(e.name.toUpperCase().includes(that.keyword.toUpperCase())) return true;  
        }else if(that.searchOption == 'singer'){
          if(e.singer.toUpperCase().includes(that.keyword.toUpperCase())) return true;  
        }else if(that.searchOption == 'genre'){
          if(e.genre.toUpperCase().includes(that.searchGenreOption.toUpperCase())) return true;  
        }
      })
    },  
    searchGenre(){
      console.log(this.searchGenreOption,this.searchGenreOption)
      this.searchList()
    },
    resetList(){
      this.keyword =''
      this.isSearched = false
      this.searchGenreOption = ''
      this.futsalList = JSON.parse(JSON.stringify(this.futsalList_org))
    },

  },
  mounted(){
    this.getAllFutsalList()
  }
}
</script>
<style scoped>
.input-content{
  display:flex;
  align-items: center;
  background:rgb(240, 240, 240);
  height:9vw;
  padding:0 2vw;
  color:#555;
  margin-bottom:4vw;
}
.input-content > .icon{
  color:#aaa;
}
.input-content > input{
  margin-left: 1vw;
  background: transparent;
  flex-grow: 1;
}
.input-content > .search-list,.input-content > .genre-list{
  border:none;
  font-size:4vw;
  margin-right:2vw;
  background:transparent;
  color:#555;

}
.input-content > .genre-list{
  flex-grow: 1;
}
li{
  list-style: none;
  border-bottom : 0.5px solid rgba(0,0,0,0.5);
  padding-bottom: 3vw;
}
.futsal-list{
  font-size:4vw;
  color:rgb(0,0,0);
  padding : 1vw;
  display:flex;
  flex-direction: column;
}
.card{
  align-items: center;
}
.futsal-list > li{
  margin-bottom: 4vw;  
}
.futsal-list >li > div{
  display:flex;
  margin-bottom: 2vw;
}
.futsal-list .count{
  margin-bottom:2vw;
}

.futsal-list .futsal-img.none{
  background-color: rgba(0,0,0,0.3);
}
.futsal-list .content{
  display:flex;
  flex-direction: column;
  margin-left:2vw;
  justify-content: center
}
.futsal-list .content > div{
  display:flex;
  flex-wrap: wrap;
  overflow-wrap: break-word;
}
.futsal-list .content > div > .title{
  min-width: 13vw;
  max-width: 15vw;
  border-right: 0.5px solid rgba(0,0,0,0.5) ;
}
.futsal-list .content > div > span, .futsal-list .content > div > div{
 margin-left: 2vw;
 width:40vw;
 overflow-wrap: break-word;
 margin-bottom: .5vw;
}


</style>