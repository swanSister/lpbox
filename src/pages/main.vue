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
      
      <div class="lp-list">
        <div v-if="lpList.length>0">{{ lpList.length }}개</div>
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
                <span>{{genreText(item.genre)}}</span>
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
    mainHeader,
  },
  props:{
  
  },
  data () {
    return {
     lpList : [],
     lpList_org : [],
     keyword:'',
     searchOption:'name',
     isSearched:false,
     searchGenreOption:'=== 선택 ===',
    }
  },
  methods:{
    async getAllLpList(){
                                            
      let res = await this.$.components.api.getAllLpList()
      if(res.status == 200){
        console.log("@@@@@",res.data.data)
        this.lpList = res.data.data
        if(!this.lpList) this.lpList = []

        for(var i in this.lpList){
          if(this.lpList[i].imgList){
            this.lpList[i].imgList = JSON.parse(this.lpList[i].imgList) 
          }
        }
        this.lpList_org = JSON.parse(JSON.stringify(this.lpList))
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

      return `${year}년`
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
      this.lpList = this.lpList_org.filter(function(e){
        if(that.searchOption == 'name'){
          if(e.name.includes(that.keyword)) return true;  
        }else if(that.searchOption == 'singer'){
          if(e.singer.includes(that.keyword)) return true;  
        }else if(that.searchOption == 'genre'){
          if(e.genre.includes(that.searchGenreOption)) return true;  
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
      this.lpList = JSON.parse(JSON.stringify(this.lpList_org))
    },
    genreText(genre){
      if(genre == 'KOREAN') return '한국노래'
      else if(genre == 'JAZZ_BLUES') return '재즈&블루스'
      else if(genre == 'POP') return '팝'
      else if(genre == 'HIPHOP') return '힙합'
      else if(genre == 'RNB_SOUL') return 'R&B 소울'
      else if(genre == 'ROCK') return '락'
      else if(genre == 'OST') return 'O.S.T'
      else if(genre == 'ETC') return '기타'
    }
  },
  mounted(){
    this.getAllLpList()
    console.log("SAFSAASD")
  }
}
</script>
<style scoped>
.input-content{
  display:flex;
  align-items: center;
  background:rgb(240, 240, 240);
  height:9vw;
  border-radius: 4vw;
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