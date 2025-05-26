<template>
  <div style="padding-bottom: 10vh;">
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
          <option value="마곡 어반풋볼파크 강서점">마곡 어반풋볼파크 강서점</option>
          <option value="광명 쌈바풋살장">광명 쌈바풋살장</option>
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
        <span class="title">정렬</span>
        <div class="sort-buttons">
          <button @click="changeSort('name')">이름순</button>
          <button @click="changeSort('createdAt')">등록일순</button>
          <button @click="changeSort('age')">나이순</button>
        </div>
      </div>
      <div class="title-box">
        <span class="title">참석 인원</span>
     
        <div class="member-list">
          <span class="select-controls">
            <button type="button" @click="toggleSelectAll">
              {{ isAllSelected ? '전체 해제' : '전체 선택' }}
            </button>
          </span>
          <label
            v-for="member in sortedMembers"
            :key="member.userId"
            class="member-item"
          >
            <input type="checkbox" :value="member" v-model="selectedMembers" />
            {{ member.name }}/{{ member.age }}/{{ member.location }}
          </label>
        </div>
      </div>
      <div class="send-btn" @click="uploadFutsal">전송</div>
    </div>

    <div class="input-list" v-if="mode == 'user'">
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

    <div class="input-list member-list" v-if="mode == 'memberList'">
      <div class="sort-buttons">
        <button @click="changeSort('name')">이름순</button>
        <button @click="changeSort('createdAt')">등록일순</button>
        <button @click="changeSort('age')">나이순</button>
      </div>
      <div
        v-for="(member, index) in sortedMembers"
        :key="member.userId"
        class="member-item"
        @click="confirmDelete(member.userId)"
      >
        {{ index + 1 }}. {{ member.name }}/{{ member.age }}/{{
          member.location
        }}
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
      sortKey: "name", // ← 반드시 선언
      sortOrder: "asc", // ← 이것도
      
    };
  },
  computed: {
    sortedMembers() {
      return [...this.memberList].sort((a, b) => {
        let modifier = this.sortOrder === "asc" ? 1 : -1;
        if (this.sortKey === "createdAt") {
          return modifier * (new Date(a.createdAt) - new Date(b.createdAt));
        }
        if (typeof a[this.sortKey] === "string") {
          return modifier * a[this.sortKey].localeCompare(b[this.sortKey]);
        }
        return modifier * (a[this.sortKey] - b[this.sortKey]);
      });
    },
    isAllSelected() {
      return (
        this.sortedMembers.length > 0 &&
        this.selectedMembers.length === this.sortedMembers.length
      );
    }
  },
  methods: {
    generateUID() {
      var firstPart = (Math.random() * 46656) | 0;
      var secondPart = (Math.random() * 46656) | 0;
      firstPart = ("000" + firstPart.toString(36)).slice(-3);
      secondPart = ("000" + secondPart.toString(36)).slice(-3);
      return firstPart + secondPart;
    },
    async uploadFutsal() {
      this.futsalId = this.generateUID();
      const date = new Date(this.futsalDate);

      const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
      const yyyy = kstDate.getFullYear();
      const mm = String(kstDate.getMonth() + 1).padStart(2, '0');
      const dd = String(kstDate.getDate()).padStart(2, '0');
      this.futsalDate = `${yyyy}-${mm}-${dd}`;            
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
        this.$router.go(-1);
      } else {
        console.error(writingRes);
      }
    },
    changeSort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
    async confirmDelete(id) {
      if (confirm("정말 삭제하시겠습니까?")) {
        let writingRes = await this.$.components.api.deleteFutsalUser({
          userId: id,
        });
        if (writingRes.status == 200) {
          this.getAllFutsalUser();
        } else {
          console.error(writingRes);
        }
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
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedMembers = [];
      } else {
        this.selectedMembers = [...this.sortedMembers];
      }
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
    async getAllFutsalUser() {
      let res = await this.$.components.api.getAllFutsalUser();
      if (res.status == 200) {
        console.log("@@@@@", res.data.data);
        this.memberList = res.data.data;
        console.log("get futsal list success!!!", this.memberList);
      } else {
        console.error(res);
      }
    },
  },
  async mounted() {
    this.getAllFutsalUser();
  },
};
</script>
<style scoped>
:root {
  --color-main: #003366;
  --color-accent: #3399ff;
  --color-subtle-bg: #e6f2ff;
  --color-hover: #b3d1ff;
  --color-title: #004080;
  --color-border: rgba(0, 0, 0, 0.5);
  --color-shadow: rgba(51, 153, 255, 0.4);
}

/* 📥 입력 리스트 */
.input-list {
  color: var(--color-main);
  font-size: 5vw;
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
  border-right: 0.5px solid var(--color-border);
  margin-right: 2vw;
}

.input-list > div > .location-list,
.input-list > div > .price-list {
  border: 0.5px solid var(--color-border);
  flex-grow: 1;
}

.input-list > div input {
  border: 0.5px solid var(--color-border);
  flex-grow: 1;
}

.input-list .desc {
  border: 0.5px solid var(--color-border);
  min-height: 30vw;
}

/* 📅 날짜 피커 */
.date-picker {
  position: absolute;
  right: 4vw;
}

.release-date {
  min-width: 50vw;
}

/* 📷 이미지 입력 */
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
  border: 0.5px solid var(--color-border);
}

/* 👥 멤버 리스트 */
.member-list {
  display: flex;
  flex-direction: column;
}

.member-list label {
  margin: 1vw 0;
}

.member-list > div {
  margin-bottom: 4vw;
  border-bottom: 1px solid var(--color-border);
  padding: 1vw;
}

/* 📑 탭 컨트롤 */
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
  border-bottom: 2px solid var(--color-accent);
  color: var(--color-accent);
  font-weight: 700;
}

/* 📤 전송 버튼 */
.send-btn {
  color: white;
  text-align: center;
  margin: 0 10vw;
  border-radius: 10px;
  padding: 2vw 0;
  background-color: var(--color-accent);
  font-size: 4vw;
  justify-content: center;
}

/* 🔘 버튼 (정렬, 선택) 공통 스타일 */
.sort-buttons button,
.select-controls button {
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.sort-buttons button:hover,
.select-controls button:hover {
  background-color: #357abd;
}

.sort-buttons button:focus,
.select-controls button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(53, 122, 189, 0.5);
}

</style>
