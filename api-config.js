// 백엔드 서버 주소를 담을 변수 선언 (초기값 없음)
let backendHost;

// 현재 브라우저의 호스트 이름을 가져옴 (예: localhost, 도메인 등)
const hostname = window && window.location && window.location.hostname;

// 개발 환경(localhost)일 경우 백엔드 주소를 로컬 서버로 설정
if (hostname === "localhost") {
  backendHost = "http://localhost:8080";
}

// 최종적으로 사용할 API 기본 URL을 export (다른 파일에서 import 기능)
// fetch(API_BASE_URL + "/todo")
export const API_BASE_URL = `${backendHost}`;
