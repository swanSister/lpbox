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
      const width = window.innerWidth;
      const height = window.innerHeight;
      iframe.style.width = `${width}px`;  // 화면 너비에 맞추기
      iframe.style.height = `${height}px`; // 화면 높이에 맞추기
    }
  }
}
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh;  /* 화면 전체 높이에 맞추기 */
}
</style>