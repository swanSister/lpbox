<template>
  <div id="app">
    <button @click="startColorChange">색 변경 시작</button>

    <!-- 네모와 동그라미 컴포넌트 -->
    <div
      class="square"
      :style="squareStyle"
    ></div>
    <div
      class="circle"
      :style="circleStyle"
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ["#ff0000", "#ff7f00", "#ffff00", "#00ff00", "#0000ff", "#4b0082", "#9400d3"], // 무지개 색 배열
      squareColorIndex: 0,
      circleColorIndex: 0,
      colorChangeInterval: null,  // 색 변경 인터벌을 저장할 변수
    };
  },
  computed: {
    squareStyle() {
      return {
        backgroundColor: this.colors[this.squareColorIndex],
      };
    },
    circleStyle() {
      return {
        backgroundColor: this.colors[this.circleColorIndex],
      };
    },
  },
  methods: {
    startColorChange() {
      // 인터벌이 이미 설정되어 있으면 리셋
      if (this.colorChangeInterval) {
        clearInterval(this.colorChangeInterval);
      }

      // 1초마다 색상을 변경하는 인터벌 설정
      this.colorChangeInterval = setInterval(() => {
        this.squareColorIndex = (this.squareColorIndex + 1) % this.colors.length;
        this.circleColorIndex = (this.circleColorIndex + 1) % this.colors.length;
      }, 100); // 1000ms = 1초마다 색상 변경
    },
  },
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
}

.square {
  width: 100px;
  height: 100px;
  margin: 10px auto;
}

.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 10px auto;
}
</style>
