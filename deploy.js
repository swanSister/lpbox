var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var compression = require('compression'); // compression 미들웨어 추가
var path = require('path');

// Middleware 설정
server.use(bodyParser.json());
server.use(cors());
server.use(compression()); // 모든 응답에 대해 gzip 압축을 적용

// 정적 파일을 제공할 경로
server.use('/', express.static(path.join(__dirname, '/dist'), {
    setHeaders: function (res, filePath) {
        // .gz 파일에 대해 Content-Encoding 헤더 추가
        if (filePath.endsWith('.gz')) {
            res.set('Content-Encoding', 'gzip');
            
            // .wasm.gz 파일에 대해 Content-Type을 'application/wasm'으로 설정
            if (filePath.endsWith('.wasm.gz')) {
                res.set('Content-Type', 'application/wasm');
            }
        }
    }
}));

// 서버 포트 3003에서 실행
server.listen(3003, function() {
  console.log("Server running on port 3003 with CORS enabled");
});
