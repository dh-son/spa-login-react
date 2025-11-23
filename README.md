# SPA-로그인

## 1.일반 로그인 코드

- 백엔드 API 주소 설정
  - api-config: 백엔드 API 주소를 자동으로 설정 (개발, 테스트, 운영 환경 분기 처리)
- 사용자 인증 및 API 유틸리티 함수
  - ApiService:
    - call: API 호출을 위한 공통 함수 정의
    - signin: userDTO를 POST로 전달하여 로그인 시도
    - signout: 토큰 제거 후 로그인 페이지로 이동
    - signup: userDTO를 POST로 전달
    - socialLogin: provider에 따라 OAuth2 인증 시작
- 회원가입 컴포넌트
  - SignUp: ID와 비밀번호를 입력하고 서버에 회원 가입 요청
- 로그인 컴포넌트
  - Login: 기본 로그인 + 소셜 로그인
- 소셜 로그인 리디렉션 컴포넌트
  - SocialLogin: 소셜 로그인 성공 후 리다이렉션 처리 (백엔트로부터 전달받아 Token 추출)
    소셜 로그인의 마지막 단계 처리
