const path = require("path");

module.exports = {
    // 프론트엔드에서 build 했을 때
    // 파일(output)의 위치를 backend의 public에 생성한다
    outputDir: path.resolve(__dirname, "../backend/public"),

    // /api 요청이 있을 때 요청을 백엔드의 /api로 돌려주는 proxy 설정
    devServer: {
        proxyTable: {
            "/api": {
								// /api라는 주소가 들어왔을 때 전부 서버와 연결
                target: "http://localhost:3000/api",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                }
            }
        }
    }
}