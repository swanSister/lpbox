<template>
  <div class="iframe-container">
    <iframe
      ref="unityIframe"
      :src="'/unity/index.html'"
      frameborder="0"
      style="width: 100%; height: 100vh; border: none;"
    ></iframe>
    <button @click="startRecording">녹화 시작</button>
    <button @click="stopRecording" v-if="isRecording">녹화 중지</button>
    <button @click="downloadRecording" v-if="recordedBlob">다운로드</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isRecording: false,
      mediaRecorder: null,
      recordedChunks: [],
      recordedBlob: null,
      audioStream: null,
      videoStream: null,
      audioContext: null,
      destination: null,
    };
  },
  beforeDestroy() {
    this.stopRecording(); // 컴포넌트가 파괴되기 전에 녹화를 종료
  },
  methods: {
    async startRecording() {
      const iframe = this.$refs.unityIframe;
      const videoElement = iframe.contentWindow.document.querySelector('canvas'); // Unity WebGL의 canvas

      // 화면 캡처를 위한 video stream 설정
      this.videoStream = videoElement.captureStream();

      // AudioContext를 사용하여 오디오 스트림 처리
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.destination = this.audioContext.createMediaStreamDestination();

      try {
        // 오디오 캡처를 위한 사용자 미디어 요청
        this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = this.audioContext.createMediaStreamSource(this.audioStream);
        source.connect(this.destination);
      } catch (err) {
        console.error('오디오 캡처 실패:', err);
        return;
      }

      // 화면과 오디오 스트림 합치기
      const combinedStream = new MediaStream([
        ...this.videoStream.getTracks(),
        ...this.destination.stream.getTracks(),
      ]);

      // MediaRecorder로 녹화 시작
      this.mediaRecorder = new MediaRecorder(combinedStream, { mimeType: 'video/webm' });

      // 데이터가 준비될 때마다 녹화된 데이터를 기록
      this.mediaRecorder.ondataavailable = (event) => {
        this.recordedChunks.push(event.data);
      };
      
      // 녹화가 중지되면, 녹화된 데이터를 하나의 Blob으로 결합
      this.mediaRecorder.onstop = () => {
        this.recordedBlob = new Blob(this.recordedChunks, { type: 'video/webm' });
      };

      // 녹화 시작
      this.mediaRecorder.start();
      this.isRecording = true;
    },

    stopRecording() {
      if (this.mediaRecorder) {
        // 녹화 중지
        this.mediaRecorder.stop();

        // 스트림 종료
        this.audioStream.getTracks().forEach((track) => track.stop());
        this.videoStream.getTracks().forEach((track) => track.stop());

        if (this.audioContext) {
          this.audioContext.close(); // AudioContext 종료
        }
      }
      this.isRecording = false;
    },

    downloadRecording() {
      if (this.recordedBlob) {
        // 녹화된 Blob을 URL로 변환 후 다운로드
        const url = URL.createObjectURL(this.recordedBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'recording.webm'; // 다운로드할 파일명
        link.click();
      }
    },
  },
};
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh; /* 화면 전체 높이에 맞추기 */
  position: relative;
}
button {
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
