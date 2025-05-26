<template>
  <div class="header">
    <span class="back-btn icon-left-open" @click="this.$router.go(-1)"></span>
    FC우왕좌왕
    <span class="add-btn icon-plus" @click="goToUploadPage"></span>
  </div>
</template>

<script>
export default {
  methods: {
    async ensurePassword() {
      const savedPassword = sessionStorage.getItem("futsalPassword");
      if (savedPassword === '3003') return true;

      const input = prompt("종신이는 비밀번호를 입력하세요:");
      if (input === '3003') {
        sessionStorage.setItem("futsalPassword", input);
        return true;
      } else {
        alert("비밀번호가 틀렸습니다.");
        return false;
      }
    },

    async goToUploadPage() {
      const passed = await this.ensurePassword();
      if (passed) {
        this.$router.push("/futsal/upload");
      }
    }
  }
}
</script>
<style scoped>
.header{
  position:absolute 0 0 0 0;
  font-size: 8vw; font-weight: bold;
  color:rgb(0,0,0);
  border-bottom: 0.5px solid rgba(0,0,0,0.5);
  display:flex; flex-direction: column;
  min-width: 100%; max-width: 100%;
  min-height: 14vw; max-height: 14vw;
  align-items: center; justify-content: center;
  margin-bottom: 2vw;
}
.header .add-btn{
  color:rgb(0,0,0);
  font-size:6vw;
  position:absolute; right:2vw;
}
.header .back-btn{
  color:rgb(0,0,0);
  font-size:6vw;
  position:absolute; left:2vw;
}
</style>