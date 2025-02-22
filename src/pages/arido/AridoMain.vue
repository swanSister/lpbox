<template>
  <div class="iframe-container">
    <!-- 로고 추가 -->
    <h1 class="logo">Arido</h1>

    <!-- Unity iframe -->
    <iframe
      ref="unityIframe"
      :key="mode" 
      :src="unityBuildPath" 
      frameborder="0"
      class="unity-iframe"
      :style="{ height: iframeHeight + 'px', width: iframeWidth + 'px' }"
    ></iframe>

    <div class="mode-selector">
      <button @click="setMode('mode1')">
        <span class="icon">🔥</span> CHI CHI
      </button>
      <button @click="setMode('mode2')">
        <span class="icon">🌟</span> Mode 2
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'mode1', // 기본적으로 mode1을 선택
      unityWidth: 965, // Unity 게임 빌드의 가로 크기
      unityHeight: 600, // Unity 게임 빌드의 세로 크기
    };
  },
  computed: {
    // mode에 따라 iframe의 src 경로가 동적으로 설정됨
    unityBuildPath() {
      return `http://localhost:3005/${this.mode}/index.html`; // mode에 맞는 경로
    },
    iframeWidth() {
      const screenWidth = window.innerWidth;
      const isLandscape = window.innerHeight < window.innerWidth; // 가로 모드 체크

      if (isLandscape) {
        return 0.7 * screenWidth; // 가로 모드에서는 최대 70%로 제한
      } else {
        return screenWidth; // 세로 모드에서는 100%로 설정
      }
    },
    iframeHeight() {
      const unityRatio = this.unityWidth / this.unityHeight;
      return this.iframeWidth / unityRatio; // 비율에 맞는 높이 계산
    }
  },
  methods: {
    // mode 변경 메서드
    setMode(mode) {
      this.mode = mode;
    }
  }
};
</script>

<style scoped>
/* iframe과 로고를 감싸는 컨테이너 */
.iframe-container {
  width: 100vw; /* 화면 너비에 맞춤 */
  height: auto; /* 화면 높이에 맞춤 */
  position: relative;
  display: block;
}

.logo {
  font-size: 4vw; /* 로고 크기를 화면 너비에 맞게 설정 */
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(45deg, #ff9900, #ffcc00);
  border-radius: 3vh;
  box-shadow: 0px 1vh 3vh rgba(255, 204, 0, 0.5); /* 그림자 크기도 vh로 설정 */
  margin: 0 auto;
  margin-top: 8vw; /* 여백을 vh 단위로 설정 */
  margin-bottom: 5vw; /* 여백을 vh 단위로 설정 */
  text-align: center;
  width: 80%;
  letter-spacing: 0.5vw;
  text-transform: uppercase;
  animation: fadeIn 1.5s ease-in-out, moveUp 2s ease-in-out infinite alternate;
  text-shadow: 0.5vw 0.5vw 1vh rgba(0, 0, 0, 0.3); /* 글자 그림자 크기 조정 */
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1vh);
  }
}

.unity-iframe {
  width: 100vw; /* 화면 너비에 맞게 설정 */
  height: auto; /* 높이는 동적으로 계산된 값 */
  border: none;
}

/* 버튼 스타일 (모드 선택 버튼) */
.mode-selector {
  margin: 1vw;
  display: flex;
  justify-content: center;
}

.mode-selector button {
  margin: 0 1vw;
  padding: 2vh 4vw;
  font-size: 2.5vw;
  background: linear-gradient(45deg, #ff9900, #ffcc00);
  color: white;
  border: 2px solid transparent;
  border-radius: 1vw;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mode-selector button:hover {
  background: linear-gradient(45deg, #ffcc00, #ff9900);
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
}

.mode-selector button:active {
  transform: scale(0.95);
}

.icon {
  margin-right: 1vw;
  font-size: 2.5vw;
}

@media (max-width: 768px) {
  .logo {
    font-size: 8vw;
  }

  .unity-iframe {
    height: calc(100vh - 12vh);
  }

  .mode-selector button {
    font-size: 4vw;
    padding: 2vh;
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 10vw;
  }

  .unity-iframe {
    height: calc(100vh - 10vh);
  }

  .mode-selector button {
    font-size: 5vw;
    padding: 2vw;
  }
}

/* 가로모드 스타일 추가 */
@media (orientation: landscape) {
  .unity-iframe {
  
    margin: 0 auto; /* iframe을 화면 중앙에 배치 */
    display: block;
  }
}
</style>
