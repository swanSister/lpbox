<template>
  <div>
    <mainHeader />
    <div class="calendar-wrapper">
      <VDatePicker
        :attributes="calendarAttributes"
        @dayclick="onDayClick"
        mode="month"
        style="width: 100%"
      />
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
                  <span class="title date ">날짜</span>
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
export default {
  components: {
    api,
    mainHeader,
  },
  props: {},
  computed: {
    calendarAttributes() {
      return this.futsalList.map(item => ({
        key: item.futsalId,
        dates: item.futsalDate.slice(0, 10), // "2025-05-19" 부분만
        dot: {
          color: "blue",
          style: { borderRadius: "50%" },
        },
      }));
    }
  },
  data() {
    return {
      selectedItems: null,
      futsalList: [],
      user: {},
      keyword: "",
      searchOption: "name",
      isSearched: false,
      searchGenreOption: "=== 선택 ===",
      sortKey: "name",
      sortOrder: "asc",
    };
  },
  methods: {
    async getAllFutsalList() {
      let res = await this.$.components.api.getAllFutsalList();
      if (res.status == 200) {
        console.log("@@@@@", res.data.data);
        this.futsalList = res.data.data;
        if (this.futsalList && this.futsalList.length > 0) {
          this.futsalList.forEach((item) => {
            item.memberList = JSON.parse(item.memberList);
          });
        } else {
          this.futsalList = [];
        }
        this.selectedItems = null
        console.log("get futsal list success!!!", this.futsalList);
      } else {
        console.log("fail!!");
        console.error();
        console.log("eeeerror");
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
    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    onDayClick(day) {
      const selectedDate = this.formatDate(day.date);  // day.date는 Date 객체

      // formatDate가 'YYYY-MM-DD' 형태로 변환한다고 가정

      const itemsForDate = this.futsalList.filter(item => {
        // item.futsalDate가 ISO 문자열이라면 앞 10자리만 잘라서 날짜 비교
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
    goToGoogle(title) {
      var encodedComponent = encodeURIComponent(title);
      var googleSafeComponent = encodedComponent.replace(/%20/g, "+");
      console.log(`https://www.google.com/search?q=${googleSafeComponent}`);
      window.location = `https://www.google.com/search?q=${googleSafeComponent}`;
    },
    onKeyPress(e) {
      if (e.keyCode == 13) {
        console.log("search!!!");
        this.searchList();
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
  },
  mounted() {
    this.getAllFutsalList();
  },
};
</script>
<style scoped>
.calendar-wrapper {
  display: flex;
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 (필요시) */
  padding: 20px;
}

.calendar-wrapper .vc-container {
  width: 100%;
  max-width: 500px; /* 원하는 최대 너비 설정 */
}
li {
  list-style: none;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
  padding-bottom: 3vw;
}
.futsal-list {
  font-size: 4vw;
  color: rgb(0, 0, 0);
  padding: 1vw;
  display: flex;
  flex-direction: column;
}
.card {
  align-items: center;
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
  overflow-wrap: break-word;
  margin-bottom:4vw;
}
.futsal-list .content > div > .title {
  min-width: 13vw;
  max-width: 15vw;
  border-right: 0.5px solid rgba(0, 0, 0, 0.5);
}
.futsal-list .content > div > .location{
  font-weight: bold;
}
.futsal-list .content > div > span,
.futsal-list .content > div > div {
  margin-left: 2vw;
  overflow-wrap: break-word;
  margin-bottom: 0.5vw;
}
.sort-buttons button {
  background-color: #4a90e2;    /* 부드러운 파란색 */
  color: white;                 /* 글자 하얀색 */
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.sort-buttons button:hover {
  background-color: #357abd;   /* 진한 파란색으로 호버 */
}

.sort-buttons button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(53, 122, 189, 0.5);
}
</style>
