<template>
  <div class="iframe-container">
    <!-- 로고 추가 -->
    <h1 class="logo">Arido</h1>
    
    <!-- Unity iframe -->
    <iframe
      ref="unityIframe"
      :src="'/unity/index.html'"
      frameborder="0"
      class="unity-iframe"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
/* iframe과 로고를 감싸는 컨테이너 */
.iframe-container {
  width: 100%;
  height: 100vh; /* 화면 전체 높이에 맞추기 */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #f9f9f9; /* 밝은 배경 색상 */
}

/* 로고 스타일 */
.logo {
  font-size: 4rem; /* 크게 보이는 로고 크기 */
  font-weight: 700;
  color: #ffffff; /* 흰색 글자 */
  background: linear-gradient(45deg, #ff9900, #ffcc00); /* 진한 노란색과 밝은 노란색 그라데이션 */
  padding: 20px 40px;
  border-radius: 30px;
  box-shadow: 0px 8px 15px rgba(255, 204, 0, 0.5); /* 부드러운 그림자 효과 */
  margin-top: 30px;
  text-align: center;
  width: 80%;
  max-width: 550px;
  letter-spacing: 3px; /* 글자 간격 조정 */
  font-family: 'Dancing Script', cursive; /* 손글씨 느낌을 주기 위한 글꼴 */
  text-transform: uppercase; /* 대문자로 변환 */
  animation: fadeIn 1.5s ease-in-out, moveUp 2s ease-in-out infinite alternate; /* 애니메이션 추가 */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* 글자에 그림자 효과 추가 */
}

/* 로고 애니메이션: fadeIn - 서서히 나타남 */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* 로고 애니메이션: moveUp - 살짝 위로 올라가는 애니메이션 */
@keyframes moveUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10px);
  }
}

/* iframe 스타일 */
.unity-iframe {
  width: 100%;
  height: calc(100vh - 150px); /* 로고 높이를 제외한 나머지 화면을 iframe에 할당 */
  border: none;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .logo {
    font-size: 2.5rem; /* 화면 크기에 맞춰 제목 크기 축소 */
    padding: 15px 30px;
  }

  .unity-iframe {
    height: calc(100vh - 120px); /* 더 작은 화면에서 로고와 iframe 비율 맞추기 */
  }
}

@media (max-width: 480px) {
  .logo {
    font-size: 2rem; /* 더 작은 화면에서는 제목을 더 작게 */
    padding: 10px 20px;
  }

  .unity-iframe {
    height: calc(100vh - 100px); /* 더 작은 화면에서 iframe 크기 조정 */
  }
}
</style>
