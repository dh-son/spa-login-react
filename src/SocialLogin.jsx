import React from "react";
import { Navigate } from "react-router-dom";

// 소셜 로그인 성공 후 리다이렉션 처리하는 컴포넌트
const SocialLogin = (props) => {
  // 쿼리 파라미터에서 특정 값을 추출하는 함수
  const getUrlParameter = (name) => {
    let search = window.location.search; // 현재 URL의 쿼리스트링 부분
    let params = new URLSearchParams(search); // URLSearchParams로 파싱
    return params.get(name); // 주어진 name의 파라미터 값을 반환
  };

  const token = getUrlParameter("token"); // 쿼리 파라미터에서 토큰 값 추출

  console.log("토큰 파싱: " + token); // 콘솔에 토큰 출력

  if (token) {
    console.log("로컬스토리지에 토큰 저장" + token);
    localStorage.setItem("ACCESS_TOKEN", token);

    // 홈 페이지로 리다이렉션, 이전 위치(state) 정보 함께 전달
    return (
      <Navigate
        to={{
          pathname: "/",
          state: { from: props.location },
        }}
      />
    );
  } else {
    // 토큰이 없을 경우 로그인 페이지로 리다이렉션
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: props.location },
        }}
      />
    );
  }
};

export default SocialLogin;
