<template>
  <div>
    <mainHeader />
    <section class="tab-container">
      <div
        :class="['tab', mode === 'futsal' ? 'active' : '']"
        @click="mode = 'futsal'"
      >
        풋살 등록
      </div>
      <div
        :class="['tab', mode === 'memberList' ? 'active' : '']"
        @click="mode = 'memberList'"
      >
        멤버
      </div>
      <div
        :class="['tab', mode === 'user' ? 'active' : '']"
        @click="mode = 'user'"
      >
        멤버 등록
      </div>
    </section>
    <div class="input-list" v-if="mode == 'futsal'">
      <div class="title-box">
        <span class="title">장소</span>
        <select class="location-list" v-model="location" id="location-list">
          <option value="none" selected="selected">=== 선택 ===</option>
          <option value="용산 아디다스 더베이스">용산 아디다스 더베이스</option>
          <option value="잠실 로꼬풋살장">잠실 로꼬 풋살장</option>
        </select>
      </div>
      <div class="title-box">
        <span class="title">날짜</span>
        <div class="release-date" @click="isPickerShow = true">
          {{ futsalDate ? getTime(futsalDate) : "-" }}
        </div>
        <div class="date-picker" v-show="isPickerShow">
          <VDatePicker
            v-model="futsalDate"
            @dayclick="isPickerShow = false"
            mode="month"
          />
        </div>
      </div>
      <div class="title-box">
        <span class="title">참석 인원</span>
        <div class="member-list">
          <label
            v-for="member in memberList"
            :key="member.id"
            class="member-item"
          >
            <input type="checkbox" :value="member" v-model="selectedMembers" />
            {{ member.name }}/{{ member.age }}/{{ member.location }}
          </label>
        </div>
      </div>
      <div class="send-btn" @click="uploadFutsal">전송</div>
    </div>

    <div class="input-list" v-if="mode =='user'">
      <div class="title-box">
        <span class="title">이름</span> <input v-model="userName" />
      </div>
      <div class="title-box">
        <span class="title">나이</span> <input v-model="age" />
      </div>
      <div class="title-box">
        <span class="title">성별</span>
        <select class="location-list" v-model="gender" id="location-list">
          <option value="none" selected="selected">=== 선택 ===</option>
          <option value="남">남</option>
          <option value="여">여</option>
        </select>
      </div>
      <div class="title-box">
        <span class="title">지역</span> <input v-model="userLocation" />
      </div>
      <div class="send-btn" @click="uploadUser">전송</div>
    </div>

    <div class="input-list member-list" v-if="mode =='memberList'">
      <div
            v-for="(member,index) in memberList"
            :key="member.id"
            class="member-item"
          >
           
            {{index+1}}. {{ member.name }}/{{ member.age }}/{{ member.location }}
      </div>
    </div>

  </div>
</template>

<script>
import api from "../../api/api.vue";
import mainHeader from "../../components/futsal/header/index.vue";

export default {
  components: {
    api,
    mainHeader,
  },
  props: {},
  data() {
    return {
      mode: "futsal",
      futsalId: "",
      userId: "",
      futsalDate: "",
      location: "",
      memberList: [
        {
          id: "122131",
          name: "정유정",
          age: "93",
          gender: "female",
          location: "용인",
        },
        {
          id: "12312",
          name: "김민수",
          age: "88",
          gender: "male",
          location: "서울",
        },
      ],
      userName: "",
      userLocation: "",
      age: "",
      gender: "",
      selectedMembers: [],
      isPickerShow: false,
    };
  },

  methods: {
    goToGoogle(title) {
      var encodedComponent = encodeURIComponent(title);
      var googleSafeComponent = encodedComponent.replace(/%20/g, "+");
      console.log(`https://www.google.com/search?q=${googleSafeComponent}`);
      window.location = `https://www.google.com/search?q=${googleSafeComponent}`;
    },
    generateUID() {
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return firstPart + secondPart;
    },
    async uploadFutsal() {
      this.futsalId = this.generateUID();
      console.log("######", this.$.components.api);
      if (this.futsalDate == "") {
        alert("날짜를 입력해 주세요.");
        return;
      }
      if (this.location == "") {
        alert("장소를 입력해 주세요.");
        return;
      }

      let writingRes = await this.$.components.api.createFutsal({
        futsalId: this.futsalId,
        futsalDate: this.futsalDate,
        location: this.location,
        memberList: JSON.stringify(this.selectedMembers),
      });
      if (writingRes.status == 200) {
        console.log("success!!!");
        this.$router.go(-1);
      } else {
        console.log("fail!!");
        console.error(writingRes);
        console.log("eeeerror");
      }
    },

    async uploadUser() {
      this.userId = this.generateUID();
      console.log("######", this.$.components.api);
      if (this.userName == "") {
        alert("이름을 입력해 주세요.");
        return;
      }
      if (this.gender == "") {
        alert("성별을 입력해 주세요.");
        return;
      }
      if (this.age == "") {
        alert("나이를 입력해 주세요.");
        return;
      }
      if (this.userLocation == "") {
        alert("지역을 입력해 주세요.");
        return;
      }

      let writingRes = await this.$.components.api.createFutsalUser({
        userId: this.userId,
        name: this.userName,
        age: this.age,
        gender: this.gender,
        location: this.userLocation,
      });
      if (writingRes.status == 200) {
        console.log("success!!!");
        this.$router.go(-1);
      } else {
        console.log("fail!!");
        console.error(writingRes);
        console.log("eeeerror");
      }
    },
    async previewFiles(event) {
      let that = this;
      that.imgList = [];
      var oFReader = new FileReader();
      oFReader.readAsDataURL(event.target.files[0]);
      oFReader.onload = function (oFREvent) {
        let image = new Image();
        image.src = oFREvent.target.result;
        image.onload = function () {
          let src = that.resizeImage(image);
          that.imgList.push(src);
        };
      };
    },
    dataUriToBlob(dataURI) {
      var byteString = atob(dataURI.split(",")[1]);
      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },
    resizeImage(image) {
      console.log("resizeImages");
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
      return dataUrl;
    },
    getTime(t) {
      let time = new Date(t);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      let day = time.getDay(); // 0 (일) ~ 6 (토)
      const days = ["일", "월", "화", "수", "목", "금", "토"];
      const weekday = days[day];
      if (month < 10) {
        month = `0${month}`;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      return `${year}/${month}/${date} (${weekday})`;

    },
    async getAllFutsalUser(){               
      let res = await this.$.components.api.getAllFutsalUser()
      if(res.status == 200){
        console.log("@@@@@",res.data.data)
        this.memberList = res.data.data        
        console.log("get futsal list success!!!", this.memberList)
      }else{
          console.error(res)          
        }
    },
  },
  async mounted() {
    this.getAllFutsalUser()
  },
};
</script>
<style scoped>
.input-list {
  color: rgb(0, 0, 0);
  font-size: 6vw;
  display: flex;
  flex-direction: column;
  margin: 1vw 4vw;
}
.input-list .title-box {
  margin: 4vw 0;
}
.input-list > div {
  display: flex;
}
.input-list > div.more-btn {
  color: white;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 1vw 10vw;
  padding: 1vw 0;
  font-size: 4vw;
}
.input-list > div > .title {
  min-width: 30vw;
  max-width: 30vw;
  border-right: 0.5px solid rgba(0, 0, 0, 0.5);
  margin-right: 2vw;
}
.input-list > div > .location-list,
.input-list > div > .price-list {
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  flex-grow: 1;
}
.input-list > div input {
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  flex-grow: 1;
}
.send-btn {
  color: white;
  text-align: center;
  margin: 10vw;
  padding: 2vw 0;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 4vw;
  justify-content: center;
}
.input-list .desc {
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  min-height: 30vw;
}
.date-picker {
  position: absolute;
  right: 4vw;
}
.release-date {
  min-width: 50vw;
}
.img-input {
  display: flex;
  align-items: center;
  justify-content: center;
}
.img-input .icon-camera {
  font-size: 8vw;
  text-align: center;
}
.img-input > img {
  min-width: 50vw;
  max-width: 50vw;
  min-height: 50vw;
  max-height: 50vw;
  margin-left: 10vw;

  object-fit: cover;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
}
.member-list {
  display: flex;
  flex-direction: column;
}

.tab-container {
  display: flex;
  margin-bottom: 16px;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: #666;
  font-weight: 500;
}

.tab.active {
  border-bottom: 2px solid #007bff;
  color: #007bff;
  font-weight: 700;
}
.member-list > div{
  margin-bottom:4vw;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding:1vw;

}

</style>
