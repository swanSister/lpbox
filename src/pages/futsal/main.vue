<template>
  <div>
    <mainHeader/>
  
      <div class="futsal-list">
        <div v-if="futsalList.length>0" class="count">{{ futsalList.length }}개</div>
        <li>
          <div class="card" >
            <div class="content">
              <div>
                <span class="title"> 정렬</span>
                <div class="sort-buttons">
                  <button @click="changeSort('name')">이름순</button>
                  <button @click="changeSort('createdAt')">등록일순</button>
                  <button @click="changeSort('age')">나이순</button>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li v-for="item in futsalList" :key="item.lpId"  
        @click="confirmDelete(item.futsalId)">
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
                <span class="title">참석</span>
                <div class="member-list">
                  <div v-for="member in getSortedMembers(item.memberList)" :key="member.id" class="member-item">

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
     sortKey: 'name',
      sortOrder: 'asc',
    }
  },
  methods:{
    async getAllFutsalList(){               
      let res = await this.$.components.api.getAllFutsalList()
      if(res.status == 200){
        console.log("@@@@@",res.data.data)
        

        this.futsalList = res.data.data
        if(this.futsalList && this.futsalList.length>0){
          this.futsalList.forEach(item => {
          item.memberList = JSON.parse(item.memberList)
        })
        }else{
          this.futsalList = []
        }
        
        this.futsalList_org = JSON.parse(JSON.stringify(this.futsalList))
        console.log("get futsal list success!!!", this.futsalList)
      }else{
        console.log("fail!!")
          console.error()
          console.log("eeeerror")
          
        }
    },
    async confirmDelete(id) {
      if (confirm("정말 삭제하시겠습니까?")) {
        let writingRes = await this.$.components.api.deleteFutsal({
          futsalId: id,
        });
        if (writingRes.status == 200) {
          this.getAllFutsalList();
        } else {
          console.error(writingRes);
        }
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
    changeSort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    getSortedMembers(members) {
      const modifier = this.sortOrder === 'asc' ? 1 : -1;
      return [...members].sort((a, b) => {
        const key = this.sortKey;

        if (key === 'createdAt') {
          return modifier * (a.createdAt - b.createdAt); // timestamp 비교
        }

        if (typeof a[key] === 'string') {
          return modifier * a[key].localeCompare(b[key]);
        }

        return modifier * (a[key] - b[key]);
      });
    }
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