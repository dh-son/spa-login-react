// API 서버의 기본 URL을 불러옴
import { API_BASE_URL } from "../../api-config";

// API 호출을 위한 공통 함수 정의
export function call(api, method, request) {
  // HTTP 요청 헤더 생성 및 Content-Type 설정
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");

  // 토큰이 존재하면 Authorization 헤더에 추가
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  // fetch 요청 옵션 구성
  let options = {
    headers: headers,
    url: API_BASE_URL + api, // API 경로 붙이기
    method: method, // 요청 방식 (GET, POST 등)
  };

  // request 객체가 있으면 JSON 문자열로 변환하여 body에 추가
  if (request) {
    options.body = JSON.stringify(request);
  }

  // fetch로 API 호출
  return fetch(options.url, options)
    .then((response) => {
      // HTTP 200: 정상 응답일 경우 JSON 반환
      if (response.status === 200) {
        return response.json();
      }
      // HTTP 403: 인증 오류 -> 로그인 페이지로 리다이렉트
      else if (response.status === 403) {
        window.location.href = "/login";
      }
      // 그 외 오류는 Error 객체로 생성
      else {
        new Error(response);
      }
    })
    .catch((error) => {
      // 네트워크 오류 또는 처리되지 않은 예외 발생 시 로그 출력
      console.log("http error");
      console.log(error);
    });
}

// 로그인 함수: userDTO를 POST로 전달하여 로그인 시도
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    // 로그인 성공 시 토큰 저장 및 홈으로 이동
    if (response.token) {
      localStorage.setItem("ACCESS_TOKEN", response.token);
      window.location.href = "/";
    }
  });
}

// 로그아웃 함수: 토큰 제거 후 로그인 페이지로 이동
export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href = "/login";
}

// 회원가입 함수: userDTO를 POST로 전달 (응답에 대한 후속 처리는 별도로 하지 않음)
export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}

// 소셜 로그인 함수: provider에 따라 OAuth2 인증 시작
export function socialLogin(provider) {
  // 현재 프로트엔드 URL을 구성
  const frontendUrl = window.location.protocol + "//" + window.location.host;
  console.log("frontendUrl = " + frontendUrl);

  // 소셜 로그인 URL로 리다이렉트 (OAuth2 인증 시작)
  // 백엔드에서 인증 절차를 처리하도록 위임하는 구조
  window.location.href =
    API_BASE_URL +
    "/oauth2/authrization/" +
    provider +
    "?redirect_url=" +
    frontendUrl;
}
