<template>
  <div>
  <mainHeader/>
  <div class="input-list">
    <div><span class="title">제목</span> <input v-model="name"/></div>
    <div><span class="title">가수</span> <input v-model="singer"/></div>
    <div>
      <span class="title">정보</span>
      <div class="more-btn" v-on:click="goToGoogle(`${name} ${singer}`)">정보 검색</div>
    </div>
    <div><span class="title">장르</span> 
      <select class="genre-list" v-model="genre" id="genreList">
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
    </div>
    <div>
      <span class="title">발매일</span> 
        <div class="release-date" @click="isPickerShow=true">{{ releaseDate? getTime(releaseDate) : '-' }}
      </div>
      <div class="date-picker" v-show="isPickerShow">
        <VDatePicker v-model='releaseDate' @dayclick="isPickerShow=false" mode='month'/>
      </div>
    </div>
    <div><span class="title" type='number'>가격</span>
      <select class="price-list" v-model="price" id="priceList">
        <option value="~50,000">~50,000</option>
        <option value="~100,000">~100,000</option>
        <option value="~200,000">~200,000</option>
        <option value="~500,000">~500,000</option>
        <option value="~1,000,000">~1,000,000</option>
        <option value="1,000,000~">1,000,000~</option>
      </select>
    </div>
    <div>
      <span class="title">설명</span> 
      <textarea class="desc" v-model="description"></textarea>
    </div>
    <div class="img-input">
      <input ref="fileInput" id="file" type="file" accept="image/*" @change="previewFiles" style="display:none;"/>
      <label for="file" class="icon icon-camera"></label>
      <img v-if="imgList.length>0" :src="imgList[0]"/>
    </div>
  </div>
    <div class="send-btn" @click="uploadData">전송</div>
  </div>
</template>

<script>
import api from '../../api/api.vue'
import mainHeader from '../../components/lpbox/header/index.vue'

export default {
  
  components:{
    api,
    mainHeader
  },
  props:{
  
  },
  data () {
    return {
      lpId : '',
      user:'',
      userId : '',
      name : '',
      singer: '',
      releaseDate : '',
      description : '',
      price : '',
      genre : '',
      imgList : [],
      isPickerShow:false,
    }
  },
  methods:{
    goToGoogle(title){
      var encodedComponent = encodeURIComponent(title);
      var googleSafeComponent = encodedComponent.replace(/%20/g,'+');  
      console.log(`https://www.google.com/search?q=${googleSafeComponent}`)
      window.location=`https://www.google.com/search?q=${googleSafeComponent}`
    },
    generateUID() {
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return firstPart + secondPart;
    },
    checkLogin(){
      if(!this.user.isAuth){
        let pw = prompt(`ID:${this.user.id} 비밀번호를 입력하세요`,'')
        if(pw==this.user.pw){
          this.user.isAuth = true
          window.localStorage.setItem('user',JSON.stringify(this.user))
          return true
        }else{
          alert("비밀번호가 틀렸습니다.")
          this.$router.go(-1)
          return false
        }
      }else{
        return true
      }
    },
    async uploadData(){
      if(!this.checkLogin()) return
      this.lpId = this.generateUID()
      console.log("######",this.$.components.api)
      if(this.name==''){ alert("제목을 입력해 주세요."); return;}
      if(this.singer==''){ alert("가수를 입력해 주세요."); return;}
      if(this.releaseDate==''){ alert("발매일을 입력해 주세요."); return;}
      if(this.price==''){ alert("가격을 입력해 주세요."); return;}
      if(this.genre==''){ alert("장르를 입력해 주세요."); return;}

      let writingRes = await this.$.components.api.createLp({
        lpId: this.lpId,
        userId: this.user.userId,
        name: this.name,
        singer: this.singer,
        releaseDate: this.releaseDate,
        description: this.description,
        price: this.price,
        genre: this.genre,
        imgList: [],
      })
      if(writingRes.status == 200){
        console.log("success!!!")
      for(let i = 0; i<this.imgList.length; i++){
          console.log("#####",i)
          let imgRes = await this.$.components.api.uploadLPImage(this.dataUriToBlob(this.imgList[i]),`${this.lpId}_${i}_post`)
          console.log("imgres : ",imgRes)
        }
        this.$router.go(-1)
      }else{
        console.log("fail!!")
          console.error(writingRes)
          console.log("eeeerror")
          
        }
    },
    async previewFiles(event) {
      let that = this
      that.imgList = []
      var oFReader = new FileReader()
        oFReader.readAsDataURL(event.target.files[0])
        oFReader.onload = function (oFREvent) {
           let image = new Image()
              image.src= oFREvent.target.result
              image.onload = function(){
                let src = that.resizeImage(image)
                that.imgList.push(src)
              }
        };
    },
    dataUriToBlob(dataURI){
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([ab], {type: mimeString});
        return blob;
    },
    resizeImage(image){
      console.log("resizeImages")
      let canvas = document.createElement("canvas"),
      max_size = 300,
      // 최대 기준을 1280으로 잡음.
      width = image.width,
      height = image.height;
      if (width > height) {
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(image, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg");
      return dataUrl
    },
    getTime(t){
      let time = new Date(t)
      let year = time.getFullYear()
      let month = time.getMonth()+1
      if(month<10){
        month = `0${month}`
      }
      return `${year}-${month}`
      // let day = this.$moment(time).format('YYYYMMDD')
      // let year = this.$moment().format('YYYY')
    
    },
    
  },
  mounted(){
    console.log("mounted uploadpage!!!!")
    this.user = JSON.parse(window.localStorage.getItem('user'))
    if(!(this.user&&this.user.userId)){
      alert("사용자를 선택해 주세요.")
      this.$router.push({
        path : '/lpbox/login',
        name : '/lpbox/login'
      })
    }
    console.log("@@@user")
    console.log(this.user)
    this.checkLogin()
    
  }
}
</script>
<style scoped>
.input-list{
  color:rgb(0,0,0);
  font-size:6vw;
  display:flex;
  flex-direction: column;
  margin: 1vw 4vw;
}

.input-list > div{
  display:flex;
  margin:2vw 0;
}
.input-list > div.more-btn{
  color:white;
  justify-content: center;
  background-color: rgba(0,0,0,.7);
  margin:1vw 10vw;
  padding: 1vw 0;
  font-size:4vw;
}
.input-list > div > .title{
  min-width: 30vw;
  max-width: 30vw;
  border-right: 0.5px solid rgba(0,0,0,0.5) ;
  margin-right:2vw;
}
.input-list >div > .genre-list, .input-list > div > .price-list{
  border:0.5px solid rgba(0,0,0,0.5) ;
flex-grow: 1;
}
.input-list >div input{
  border:0.5px solid rgba(0,0,0,0.5) ;
  flex-grow: 1;
}
.send-btn{
  color:white;
  text-align: center;
  margin:2vw 20vw;
  padding: 2vw 0;
  background-color: rgba(0,0,0,.7);
  font-size:4vw;
}
.input-list .desc{
  border : 0.5px solid rgba(0,0,0,0.5) ;
  min-height:30vw;
}
.date-picker{
  position:absolute;
  right:4vw;
}
.release-date{
  min-width:50vw;
}
.img-input{
  display:flex;
  align-items: center;
  justify-content: center;
}
.img-input .icon-camera{
  font-size:8vw; 
  text-align: center;
}
.img-input > img{
  min-width: 50vw;
  max-width: 50vw;
  min-height: 50vw;
  max-height: 50vw;
  margin-left:10vw;

  object-fit: cover;
  border : 0.5px solid rgba(0,0,0,0.5);
}

</style>