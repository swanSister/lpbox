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
        <span class="icon">🔥</span> CHICHI
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
      return `http://3.34.211.151:3005/${this.mode}/index.html`; // 배포용
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
  width: 100vw;
  height: auto;
  position: relative;
  display: block;
  background-color: #f8f8f8; /* 부드러운 배경색 추가 */
  overflow: hidden;
}

/* 로고 스타일 */
.logo {
  font-size: 5vw; /* 로고 크기를 화면 너비에 맞게 설정 */
  font-weight: 700;
  color: #fff;
  background: linear-gradient(45deg, #ffb84d, #ffcc00); /* 부드러운 그라데이션 */
  border-radius: 3vh;
  box-shadow: 0px 2vh 6vh rgba(0, 0, 0, 0.15); /* 그림자 효과 추가 */
  margin: 0 auto;
  margin-top: 10vw;
  margin-bottom: 5vw;
  text-align: center;
  width: 80%;
  letter-spacing: 0.5vw;
  text-transform: uppercase;
  animation: fadeIn 1.5s ease-in-out, moveUp 2s ease-in-out infinite alternate;
  text-shadow: 0.5vw 0.5vw 1vh rgba(0, 0, 0, 0.3);
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

/* Unity iframe 스타일 */
.unity-iframe {
  width: 100vw;
  height: auto;
  border: none;
}

/* 버튼 스타일 (모드 선택 버튼) */
.mode-selector {
  margin: 2vh 0;
  margin-bottom: 10vw;
  display: flex;
  justify-content: center;
}

.mode-selector button {
  margin: 0 2vw;
  padding: 2vh 4vw;
  font-size: 2.5vw;
  background: linear-gradient(45deg, #ffb84d, #ffcc00); /* 부드러운 노랑 계열 */
  color: white;
  border: 2px solid transparent;
  border-radius: 1vw;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 버튼에 그림자 효과 */
}

.mode-selector button:hover {
  background: linear-gradient(45deg, #ffcc00, #ffb84d);
  transform: scale(1.1);
  box-shadow: 0 0 12px rgba(255, 204, 0, 0.5);
}

.mode-selector button:active {
  transform: scale(0.95);
}

.icon {
  margin-right: 1vw;
  font-size: 2.5vw;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .logo {
    font-size: 8vw;
  }

  .unity-iframe {
    height: calc(100vh - 15vh);
  }

  .mode-selector button {
    font-size: 4vw;
    padding: 3vh;
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
    padding: 4vw;
  }
}

/* 가로모드 스타일 */
@media (orientation: landscape) {
  .unity-iframe {
    margin: 0 auto;
    display: block;
  }
}
</style>
