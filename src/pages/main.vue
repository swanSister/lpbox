<template>
  <div class="portfolio">
    <!-- 상단 자기소개 -->
    <div class="profile-section">
      <h1 class="portfolio-title">포트폴리오</h1>
      <p><strong>이름:</strong> 정유정 / Carol</p>
      <p><strong>나이:</strong> 1993년생 (만 31세)</p>
      <p><strong>성별:</strong> 여성</p>
      <p><strong>희망직군:</strong> 프론트엔드 개발자</p>
      <p class="intro">
        저는 창의적이고 도전적인 사람입니다.
새로운 아이디어를 떠올리면 직접 실행해보는 걸 즐기고,
개발 역시 그런 성향 속에서 꾸준히 이어온 저의 도전 중 하나입니다.
      </p>
    </div>

    <!-- 프로젝트 카드 -->
    <div class="projects">
  <div 
    v-for="project in projects" 
    :key="project.id" 
    class="project-card" 
    @click="goToPage(project.id)"
  >
    <!-- 제목 + 개발년도 -->
    <h2 class="project-title">
      {{ project.title }}
      <span class="project-year">({{ project.year }})</span>
    </h2>

    <!-- 한줄 설명 -->
    <p class="project-desc">{{ project.desc }}</p>

    <!-- 메타정보 -->
    <div class="project-meta">
      <p><strong>스택:</strong> {{ project.stack }}</p>
      <p><strong>역할:</strong> {{ project.role }}</p>
    </div>
  </div>
</div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      projects:[
  { 
    id: 'futsal', 
    title: 'FC 우왕좌왕', 
    year: '2025', 
    desc: '풋살 소모임 전용 회원 관리 및 경기 기록장', 
    stack: 'Vue.js, Node.js', 
    role: '풀스택 개발'
  },
  { 
    id: 'mungplanet', 
    title: '멍플래닛', 
    year: '2025', 
    desc: '반려동물 추모 서비스. 모바일 공유 기능 포함', 
    stack: 'Vue3, Node.js, AWS EC2, HTTPS', 
    role: '풀스택 개발'
  },
  { 
    id: 'lpbox', 
    title: 'LP BOX', 
    year: '2024 (개발 중)', 
    desc: 'LP 커버 이미지 AI 인식 → 제목/아티스트 추출 서비스. 구글 Vision API와 HuggingFace 모델을 활용한 AI 프로젝트', 
    stack: 'Vue.js, Node.js, Google Vision API, HuggingFace', 
    role: '백엔드/프론트엔드 개발, AI 스택 적용'
  },
  { 
    id: 'arido', 
    title: '아리도 게임', 
    year: '2024', 
    desc: '스프런키 오마주, 딸을 위해 만든 Unity WebGL 게임', 
    stack: 'Unity WebGL, Vue.js, Node.js', 
    role: '풀스택 개발'
  },
  { 
    id: 'asasa', 
    title: '아사사', 
    year: '2022~2023', 
    desc: '아파트 주민 전용 웹앱, Blind 모방 서비스. 주소지 인증 기반. 기획자와 2인 창업', 
    stack: 'Vue.js, Node.js, SQLite', 
    role: '프론트/백엔드 설계 및 전체 개발'
  },
  { 
    id: 'mars', 
    title: 'NASA Mars Rovers', 
    year: '2020', 
    desc: 'NASA API 기반 화성 탐사 로버 사진 뷰어', 
    stack: 'Vue.js 2.0', 
    role: '프론트엔드 개발'
  },
  { 
    id: 'kakaogame', 
    title: '카카오게임', 
    year: '2020', 
    desc: '카카오 공모전 참가작', 
    stack: 'HTML, JavaScript', 
    role: '프론트엔드 개발'
  }
]

    }
  },
  methods:{
    goToPage(to){
      if(to=='lpbox'){
          this.$router.push({ path : '/lpbox/login', name : '/lpbox/login' })
      } else if(to=='futsal'){
          this.$router.push({ path : '/futsal/main', name : '/futsal/main' })
      } else if(to=='mars'){
          this.$router.push({ path : '/mars/main', name : '/mars/main' })
      } else if(to=='kakaogame'){
          window.location=`http://3.34.211.151:3004`
      } else if(to=='arido'){
          window.location=`https://arido1.com/#/`
      } else if(to=='asasa'){
          window.location=`http://3.34.211.151:3010`
      } else if(to=='mungplanet'){
          window.location=`https://mungplanet.com` 
      }
    }
  }
}
</script>

<style scoped>
.portfolio {
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}
.profile-section {
  background: #fffbea;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.portfolio-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 1rem;
}
.intro {
  margin-top: 1rem;
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
}
.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
.project-card {
  background: #fffbea;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.05);
}
.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.project-year {
  font-size: 0.95rem;
  font-weight: 400;
  color: #777;
  margin-left: 0.3rem;
}

.project-desc {
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 0.8rem;
}

.project-meta {
  border-top: 1px solid rgba(0,0,0,0.05);
  padding-top: 0.5rem;
}

.project-meta p {
  margin: 0.2rem 0;
  font-size: 0.85rem;
  color: #333;
}

</style>
