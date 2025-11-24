// React 및 필요한 MUI 컴포넌트, API 함수, 라우팅 컴포넌트 불러오기
import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { signup } from "./service/ApiService";
import { Link } from "react-router-dom";

// 회원가입 컴포넌트 정의
function SignUp() {
  // 폼 제출 핸들러 정의: 폼 제출 시 실행
  const handleSubmit = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침) 방지

    const data = new FormData(event.target); // 폼 데이터 객체 생성
    const username = data.get("username"); // 입력된 사용자명 가져오기
    const password = data.get("password"); // 입력된 비밀번호 가져오기

    // signup API 호출 후 로그인 페이지로 이동
    signup({ username: username, password: password }).then((response) => {
      window.location.href = "/login"; // 회원가입 성공 후 로그인 페이지로 리다이렉트
    });
  };

  return (
    // 회원가입 UI를 감싸는 MUI Container
    <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
      {/* form 요소 정의: submit 시 handleSubmit 함수 실행 */}
      <form noValidate onSubmit={handleSubmit}>
        {/* Grid를 사용해 항목들을 레이아웃 구성 */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* 제목표시 */}
            <Typography component="h1" variant="h5">
              계정 생성
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {/* 사용자명 입력 필드 */}
            <TextField
              autoComplete="fname" // 자동완성 힌트
              name="username" // 폼 데이터 키
              variant="outlined" // 외곽선 스타일
              required // 필수 입력
              fullWidth // 전체 너비 사용
              id="username"
              label="아이디" // 라벨 텍스트
              autoFocus // 페이지 진입 시 자동 포커싱
            />
          </Grid>
          <Grid item xs={12}>
            {/* 비밀번호 입력 필드 */}
            <TextField
              variant="outlined" // 외곽선 스타일
              required // 필수 입력
              fullWidth // 전체 너비 사용
              name="password" // 폼 데이터 키
              label="패스워드" // 라벨 텍스트
              type="password"
              id="password"
              autoComplete="current-password" // 자동완성 힌트
            />
          </Grid>
          <Grid item xs={12}>
            {/* 회원가입 버튼 */}
            <Button type="submit" fullWidth variant="contained" color="primary">
              계정 생성
            </Button>
          </Grid>
          <Grid item xs={12}>
            {/* 로그인 페이지로 이동하는 링크 */}
            <Link to="/login" variant="body2">
              이미 계정이 있습니까? 로그인 하세요.
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUp;
