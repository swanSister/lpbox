<template>
  <div class="iframe-container">
    <iframe
      ref="unityIframe"
      :src="'/unity/index.html'"
      frameborder="0"
      style="width: 100%; height: 100vh; border: none;"
    ></iframe>
  </div>
</template>

<script>
export default {
  mounted() {
    // 윈도우 사이즈가 변경될 때마다 동적으로 크기 조정
    window.addEventListener('resize', this.onResize);
    this.onResize();  // 컴포넌트가 마운트되면 초기 사이즈 설정
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      const iframe = this.$refs.unityIframe;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // 화면 비율 계산 (가로 / 세로)
      const screenRatio = screenWidth / screenHeight;

      // 가로가 작은 화면에서 가로에 맞추고 세로는 자동으로 비율에 맞게 조정
      if (screenRatio < 1) {
        // 세로가 긴 경우, 가로 크기에 맞추고 세로는 비율에 맞게 자동 조정
        iframe.style.width = `${screenWidth}px`;
        iframe.style.height = `${screenWidth / screenRatio}px`; // 세로 비율에 맞게 높이 자동 설정
      } else {
        // 화면 비율이 세로보다 가로가 긴 경우는 그대로 가로 100%, 세로 100% 맞춤
        iframe.style.width = `${screenWidth}px`;
        iframe.style.height = `${screenHeight}px`;
      }
    }
  }
}
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh;  /* 화면 전체 높이에 맞추기 */
  position: relative;
}
</style>
