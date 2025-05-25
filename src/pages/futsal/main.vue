<template>
  <div>
    <mainHeader />
    <div class="calendar-wrapper">
      <vue-cal
        default-view="month"
        :disable-views="['years', 'year', 'week', 'day', 'schedule']"
        @view-change="onViewChange"
        :events="futsalEvents"
        @cell-click="onDayClick"
        :hide-view-selector="true"
         :locale="'ko'"
      >
        <template #title="{ currentStartDate }">
          <div class="custom-title">
            {{ formatKoreanMonthYear(new Date()) }}
          </div>
        </template>
      </vue-cal>
          
    </div>
    <div class="kicked-list-wrapper" v-if="kickedList.length > 0">
      <h3>{{currentMonth+1}}월 강퇴 후보</h3>
      <ul>
        <li v-for="user in kickedList" :key="user.userId">
          {{ user.name }} / {{ user.age }} / {{ user.location }}
        </li>
      </ul>
    </div>

    <div
      v-if="selectedItems"
      class="modal-backdrop"
      @click.self="showModal = false"
    >
      <div class="modal-content">
        <div class="futsal-list">
          <li>
            <div class="card">
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
          <li @click="confirmDelete(selectedItems.futsalId)">
            <div class="card">
              <div class="content">
                <div>
                  <span class="title">장소</span>
                  <span class="location">{{ selectedItems.location }}</span>
                </div>
                <div>
                  <span class="title date">날짜</span>
                  <span>{{ getTime(selectedItems.futsalDate) }}</span>
                </div>
                <div>
                  <span class="title members">참석</span>
                  <div class="member-list">
                    <div
                      v-for="member in getSortedMembers(
                        selectedItems.memberList
                      )"
                      :key="member.id"
                      class="member-item"
                    >
                      - {{ member.name }}/{{ member.age }}/{{ member.location }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/api.vue";
import mainHeader from "../../components/futsal/header/index.vue";
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

export default {
  components: {
    api,
    mainHeader,
    VueCal
  },
  props: {},
  computed: {
    futsalEvents() {
      return this.futsalList.map((item) => ({
        start: item.futsalDate.slice(0, 10),
        end: item.futsalDate.slice(0, 10),
        title: '풋살',
        background: 'blue',
      }));
    },
  },
  data() {
    return {
      selectedItems: null,
      futsalList: [],
      memberList:[],
      keyword: "",
      searchOption: "name",
      isSearched: false,
      searchGenreOption: "=== 선택 ===",
      sortKey: "name",
      sortOrder: "asc",
      kickedList:[],
      currentMonth:'',
      currentStartDate: new Date(),
    };
  },
  methods: {
    formatKoreanMonthYear(date) {
      date = this.currentStartDate
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const koreanMonths = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
      return `${year}년 ${koreanMonths[month - 1]}`;
    },
    async getAllFutsalList() {
      let res = await this.$.components.api.getAllFutsalList();
      if (res.status == 200) {
        this.futsalList = res.data.data;
        console.log(this.futsalList)
        if (this.futsalList && this.futsalList.length > 0) {
          this.futsalList.forEach((item) => {
            item.memberList = JSON.parse(item.memberList);
          });
        } else {
          this.futsalList = [];
        }
        this.selectedItems = null;
      
      } else {
        console.log("fail!!");
        console.error();
        console.log("eeeerror");
      }
    },
    onViewChange({ startDate, endDate, view }) {
      this.currentStartDate = new Date(startDate);
      const date = new Date(startDate)
      const month = date.getMonth()
      const year = date.getFullYear()
      console.log("변경된 월:", year, month)
      this.updateKickedListForSelectedMonth(new Date(year, month))
    },
    getKickedListByMonth(year, month) {
      console.log(year,month)
      // 1. 해당 월에 있는 모든 경기 추출
      const filteredFutsal = this.futsalList.filter((item) => {
        const date = new Date(item.futsalDate);
        return (
          date.getFullYear() === year && date.getMonth() === month 
        );
      });



      console.log(filteredFutsal)
      // 2. 해당 월에 참가한 모든 유저 ID 수집 (Set으로 중복 제거)
      const participatedUserIds = new Set();
      filteredFutsal.forEach((futsal) => {
        futsal.memberList.forEach((member) => {
        
          participatedUserIds.add(String(member.userId)); // ← 중요
        });
      });

      const absentUsers = this.memberList.filter((user) => {
        return !participatedUserIds.has(String(user.userId)); // ← 중요
      });

      return absentUsers;
    },
    updateKickedListForSelectedMonth(date) {
      const year = date.getFullYear();
      const month = date.getMonth(); // 0~11
      this.currentMonth = month;
      const kickedList = this.getKickedListByMonth(year, month);
      this.kickedList = kickedList;
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
    formatDate(date) {
      if(!date)return
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    onDayClick(day) {
      const selectedDate = this.formatDate(day); // day.date는 Date 객체
      const itemsForDate = this.futsalList.filter((item) => {
      const itemDate = item.futsalDate.slice(0, 10);
        return itemDate === selectedDate;
      });

      this.selectedItems = itemsForDate[0];
    },
    getTime(t) {
      let curr = new Date();
      let time = new Date(t).getTime() + curr.getTimezoneOffset() * 60 * 1000;
      let year = new Date(time).getFullYear();
      let month = new Date(time).getMonth() + 1;
      let date = new Date(time).getDate();
      let day = new Date(time).getDay(); // 0 (일) ~ 6 (토)
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
    changeSort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
    },
    getSortedMembers(members) {
      const modifier = this.sortOrder === "asc" ? 1 : -1;
      return [...members].sort((a, b) => {
        const key = this.sortKey;

        if (key === "createdAt") {
          return modifier * (a.createdAt - b.createdAt); // timestamp 비교
        }

        if (typeof a[key] === "string") {
          return modifier * a[key].localeCompare(b[key]);
        }

        return modifier * (a[key] - b[key]);
      });
    },
    async getAllFutsalUser() {
      let res = await this.$.components.api.getAllFutsalUser();
      if (res.status == 200) {
        this.memberList = res.data.data;
      } else {
        console.error(res);
      }
    }
  },
  async mounted() {
    await this.getAllFutsalUser()
    await this.getAllFutsalList()
    
    const now = new Date()
    this.updateKickedListForSelectedMonth(now)
  },
};
</script>
<style>
:root {
  --color-main: #003366;
  --color-accent: #3399ff;
  --color-subtle-bg: #e6f2ff;
  --color-hover: #b3d1ff;
  --color-title: #004080;
  --color-shadow: rgba(51, 153, 255, 0.4);
  --color-sunday: #d81b60;
}

/* 📅 캘린더 전체 wrapper */
.calendar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.calendar-wrapper .vc-container {
  width: 100%;
  max-width: 500px;
}

/* 📌 공통 리스트 스타일 */
li {
  list-style: none;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
}

/* 📝 풋살 리스트 */
.futsal-list {
  font-size: 4vw;
  color: black;
  padding: 1vw;
  display: flex;
  flex-direction: column;
}

.futsal-list > li {
  margin-bottom: 4vw;
}

.futsal-list > li > div {
  display: flex;
  margin-bottom: 2vw;
}

.futsal-list .count {
  margin-bottom: 2vw;
}

.futsal-list .futsal-img.none {
  background-color: rgba(0, 0, 0, 0.3);
}

.futsal-list .content {
  display: flex;
  flex-direction: column;
  margin-left: 2vw;
  justify-content: center;
}

.futsal-list .content > div {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4vw;
}

.futsal-list .content > div > .title {
  min-width: 13vw;
  max-width: 15vw;
  border-right: 0.5px solid rgba(0, 0, 0, 0.5);
}

.futsal-list .content > div > .location {
  font-weight: bold;
}

.futsal-list .content > div > span,
.futsal-list .content > div > div {
  margin-left: 2vw;
  margin-bottom: 0.5vw;
  word-break: break-word;
}

/* 🔘 정렬 버튼 */
.sort-buttons button {
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: 600;
}

.sort-buttons button:hover {
  background-color: #357abd;
}

.sort-buttons button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(53, 122, 189, 0.5);
}

/* 🗓️ 캘린더 타이틀 */
.custom-title {
  font-size: 6vw;
  font-weight: 700;
  color: var(--color-title);
  background-color: white;
  padding: 1.5vw 3vw;
  border-radius: 1vw;
  text-align: center;
  margin-bottom: 1.5vw;
  letter-spacing: 0.1vw;
  user-select: none;
}

.vuecal__title-bar {
  background-color: white;
}

/* 🗓️ 달력 셀 기본 스타일 */
.vuecal__cell {
  min-width: 4vw !important;
  padding: 3vw !important;
  position: relative !important;
  line-height: 3.5vw !important;
  text-align: center;
}

/* 🟦 이벤트 있는 날짜 강조 */
.vuecal__cell:has(.vuecal__cell-events-count) {
  background-color: var(--color-subtle-bg);
}

/* 🧾 이벤트 카운트 숨김 */
.vuecal__cell-events-count {
  display: none;
}

/* 🎨 주말 색상 지정 */
.vuecal__cell.vuecal__cell--day6:not(.vuecal__cell--out-of-scope) {
  color: var(--color-accent);
}
.vuecal__cell.vuecal__cell--day7:not(.vuecal__cell--out-of-scope) {
  color: var(--color-sunday);
}

/* 🔲 이벤트 셀 스타일 */
.vuecal__cell.vuecal__cell--event {
  background-color: black !important;
  color: var(--color-main) !important;
}

/* 🚫 강퇴 리스트 */
.kicked-list-wrapper {
  max-width: 80vw;
  margin: 0 auto 4vw;
  border: 0.15vw solid var(--color-accent);
  border-radius: 1.2vw;
  font-size: 2.5vw;
  color: var(--color-title);
  background-color: white;
  box-shadow: 0 0.3vw 1vw var(--color-shadow);
  transition: box-shadow 0.3s ease;
}

.kicked-list-wrapper h3 {
  font-size: 5vw;
  font-weight: 700;
  margin-bottom: 2vw;
  color: var(--color-main);
  text-align: center;
}

.kicked-list-wrapper ul {
  padding-left: 2vw;
}

.kicked-list-wrapper li {
  font-size: 4vw;
  margin-bottom: 2vw;
  padding: 1vw 0;
  border-bottom: 0.1vw solid rgba(0, 64, 128, 0.15);
  line-height: 3vw;
  transition: background-color 0.3s ease;
}

.kicked-list-wrapper li:hover {
  background-color: var(--color-hover);
}

</style>
