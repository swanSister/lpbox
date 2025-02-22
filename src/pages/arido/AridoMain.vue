<template>
  <div class="iframe-container">
    <!-- 로고 추가 -->
    <h1 class="logo">Arido</h1>
    
    <!-- 버튼으로 모드를 변경 -->
    <div class="mode-selector">
      <button @click="setMode('mode1')">
        <span class="icon">🔥</span> CHI CHI
      </button>
      <button @click="setMode('mode2')">
        <span class="icon">🌟</span> Mode 2
      </button>
    </div>
    
    <!-- Unity iframe -->
    <iframe
      ref="unityIframe"
      :key="mode" 
      :src="unityBuildPath" 
      frameborder="0"
      class="unity-iframe"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'mode1', // 기본적으로 mode1을 선택
    };
  },
  computed: {
    // mode에 따라 iframe의 src 경로가 동적으로 설정됨
    unityBuildPath() {
      return `http://localhost:3005/${this.mode}/index.html`; // mode에 맞는 경로
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
  background-color: #f9f9f9;
  padding-bottom: 4vh; /* 여백을 vh 단위로 설정 */
}

/* 로고 스타일 */
.logo {
  font-size: 4vw; /* 로고 크기를 화면 너비에 맞게 설정 */
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(45deg, #ff9900, #ffcc00);
  border-radius: 3vh;
  box-shadow: 0px 1vh 3vh rgba(255, 204, 0, 0.5); /* 그림자 크기도 vh로 설정 */
  margin: 0 auto;
  margin-top: 5vw; /* 여백을 vh 단위로 설정 */
  text-align: center;
  width: 80%;
  letter-spacing: 0.5vw;
  font-family: 'Dancing Script', cursive;
  text-transform: uppercase;
  animation: fadeIn 1.5s ease-in-out, moveUp 2s ease-in-out infinite alternate;
  text-shadow: 0.5vw 0.5vw 1vh rgba(0, 0, 0, 0.3); /* 글자 그림자 크기 조정 */
}

/* 로고 애니메이션: fadeIn */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 로고 애니메이션: moveUp */
@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-1vh);
  }
}

/* iframe 스타일 */
.unity-iframe {
  width: 100vw; /* 화면 너비에 맞게 설정 */
  height: calc(100vh - 15vh); /* 화면 높이에 맞추되 로고를 제외한 공간에 맞게 설정 */
  border: none;
}

/* 버튼 스타일 (모드 선택 버튼) */
.mode-selector {
  margin: 4vw; /* 여백을 vh로 설정 */
  display: flex;
  justify-content: center;
}

.mode-selector button {
  margin: 0 2vw; /* 여백을 vw로 설정 */
  padding: 2vh 4vw; /* 버튼 패딩을 vh, vw 단위로 설정 */
  font-size: 2.5vw; /* 글자 크기를 vw 단위로 설정 */
  background: linear-gradient(45deg, #ff9900, #ffcc00); /* 그라디언트 배경 */
  color: white;
  border: 2px solid transparent; /* 테두리 없애고 투명하게 설정 */
  border-radius: 1vw;
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mode-selector button:hover {
  background: linear-gradient(45deg, #ffcc00, #ff9900); /* 호버시 색상 반전 */
  transform: scale(1.1); /* 호버시 버튼 크기 확대 */
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.5); /* 그림자 효과 추가 */
}

.mode-selector button:active {
  transform: scale(0.95); /* 버튼을 클릭할 때 약간 축소되는 효과 */
}

/* 버튼 아이콘 */
.icon {
  margin-right: 1vw; /* 아이콘과 텍스트 사이에 여백 */
  font-size: 2.5vw; /* 아이콘 크기 설정 */
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .logo {
    font-size: 8vw; /* 화면 크기에 맞춰 제목 크기 축소 */
  }

  .unity-iframe {
    height: calc(100vh - 12vh);
  }

  .mode-selector button {
    font-size: 4vw; /* 작은 화면에서 버튼 글자 크기 조정 */
    padding: 2vh; /* 버튼 패딩 조정 */
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 10vw; /* 더 작은 화면에서는 제목을 더 작게 */
  }

  .unity-iframe {
    height: calc(100vh - 10vh);
  }

  .mode-selector button {
    font-size: 5vw; /* 작은 화면에서 버튼 글자 크기 조정 */
    padding: 2vw; /* 버튼 패딩 조정 */
  }
}

/* 가로 모드에 대한 스타일 */
@media (orientation: landscape) {
  .unity-iframe {
    width: 100vw; /* 가로 모드에서 iframe 너비 100% */
    height: calc(100vh - 15vh); /* 세로 모드에서 고정 높이로 유지 */
  }
}
</style>
