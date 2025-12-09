# JWT Token Test Project<p align="center">

  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

NestJS 기반의 JWT Access Token과 Refresh Token을 활용한 인증 시스템 테스트 프로젝트입니다.</p>



## 📋 프로젝트 개요[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

이 프로젝트는 JWT 기반 인증 시스템의 구현과 테스트를 목적으로 만들어졌습니다.

Access Token과 Refresh Token의 2가지 토큰을 사용하여 안전한 인증 플로우를 구현합니다.  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

    <p align="center">

### 주요 기능<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

- ✅ **회원가입 (Sign Up)**: 이메일 기반 사용자 등록<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

- ✅ **로그인 (Sign In)**: JWT 토큰 발급<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

- ✅ **Access Token**: 짧은 만료 시간 (30초)의 접근 토큰<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

- ✅ **Refresh Token**: 긴 만료 시간 (2분)의 갱신 토큰<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

- ✅ **토큰 갱신 (Refresh)**: Access Token 재발급<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>

- ✅ **Refresh Token Rotation**: 토큰 재사용 방지  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

- ✅ **로그아웃**: 토큰 무효화    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

- ✅ **게시물 작성**: 인증이 필요한 보호된 엔드포인트  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>

</p>

### 보안 기능  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

- 🔐 **Refresh Token 재사용 방지**: 한 번 사용된 토큰은 즉시 무효화

- 🔐 **토큰 버전 관리**: refreshTokenVersion을 통한 토큰 세대 추적## Description

- 🔐 **자동 보안 대응**: 의심스러운 토큰 재사용 시도 시 모든 세션 무효화

- 🔐 **비밀번호 해싱**: bcrypt를 이용한 안전한 비밀번호 저장[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.



## 🛠 기술 스택## Project setup



- **Framework**: NestJS 11.x```bash

- **Language**: TypeScript$ npm install

- **Database**: SQLite (TypeORM)```

- **Authentication**: JWT (Passport)

- **Password Hashing**: bcrypt## Compile and run the project

- **Validation**: class-validator, class-transformer

```bash

## 📦 설치 및 실행# development

$ npm run start

### 1. 패키지 설치

# watch mode

```bash$ npm run start:dev

npm install

```# production mode

$ npm run start:prod

### 2. 환경 변수 설정```



프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가합니다:## Run tests



```env```bash

JWT_ACCESS_SECRET=your-super-secret-access-key-change-this-in-production# unit tests

JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production$ npm run test

```

# e2e tests

### 3. 개발 서버 실행$ npm run test:e2e



```bash# test coverage

# 개발 모드 (watch mode)$ npm run test:cov

npm run start:dev```



# 일반 모드## Deployment

npm run start

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

# 프로덕션 모드

npm run start:prodIf you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```

```bash

서버는 `http://localhost:3000`에서 실행됩니다.$ npm install -g @nestjs/mau

$ mau deploy

## 📡 API 엔드포인트```



### 인증 (Authentication)With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.



#### 1. 회원가입## Resources

```http

POST /auth/signupCheck out a few resources that may come in handy when working with NestJS:

Content-Type: application/json

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

{- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

  "email": "user@example.com",- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

  "password": "password123",- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

  "name": "홍길동"- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

}- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

```- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

**응답:**

```json## Support

{

  "user": {Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

    "id": 1,

    "email": "user@example.com",## Stay in touch

    "name": "홍길동"

  },- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",- Website - [https://nestjs.com](https://nestjs.com/)

  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."- Twitter - [@nestframework](https://twitter.com/nestframework)

}

```## License



#### 2. 로그인Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

```http
POST /auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "홍길동"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 3. 토큰 갱신
```http
POST /auth/refresh
Authorization: Bearer <refresh_token>
```

**응답:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 4. 로그아웃
```http
POST /auth/logout
Authorization: Bearer <access_token>
```

**응답:**
```json
{
  "message": "로그아웃되었습니다."
}
```

### 게시물 (Posts)

#### 1. 게시물 목록 조회
```http
GET /posts
```

#### 2. 게시물 상세 조회
```http
GET /posts/:id
```

#### 3. 게시물 작성 (인증 필요)
```http
POST /posts
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "게시물 제목",
  "content": "게시물 내용"
}
```

## 🔑 JWT 토큰 플로우

### 1. 일반적인 인증 플로우

```
1. 사용자 로그인
   ↓
2. Access Token (30초) + Refresh Token (2분) 발급
   ↓
3. API 요청 시 Access Token 사용
   ↓
4. Access Token 만료 시
   ↓
5. Refresh Token으로 새로운 Access Token + Refresh Token 발급
   ↓
6. 새로운 Access Token으로 API 요청
```

### 2. Refresh Token Rotation (재사용 방지)

```
로그인
  ↓ Refresh Token: "aaa" 발급
  
첫 번째 갱신 요청 (aaa 사용)
  ↓ Refresh Token: "bbb" 발급 (aaa는 무효화됨)
  
두 번째 갱신 요청 (bbb 사용)
  ↓ Refresh Token: "ccc" 발급 (bbb는 무효화됨)

❌ 이전 토큰(aaa 또는 bbb)으로 재시도
  ↓ 401 Unauthorized
  ↓ 모든 Refresh Token 무효화 (보안 조치)
  ↓ 사용자는 재로그인 필요
```

## 🧪 테스트

### HTTP 파일로 테스트

프로젝트에 포함된 `api-test.http` 파일을 사용하여 API를 테스트할 수 있습니다.

VSCode의 REST Client 확장을 설치하면 편리하게 테스트할 수 있습니다:
1. VSCode에서 `api-test.http` 파일 열기
2. 각 요청 위의 "Send Request" 클릭

### 테스트 시나리오 예시

```bash
# 1. 회원가입
POST http://localhost:3000/auth/signup

# 2. 로그인 (토큰 발급)
POST http://localhost:3000/auth/signin

# 3. 게시물 작성 (Access Token 필요)
POST http://localhost:3000/posts

# 4. 30초 후 Access Token 만료

# 5. Refresh Token으로 새 토큰 발급
POST http://localhost:3000/auth/refresh

# 6. 새 Access Token으로 게시물 작성
POST http://localhost:3000/posts
```

## 📚 프로젝트 구조

```
src/
├── auth/                      # 인증 모듈
│   ├── auth.controller.ts     # 인증 컨트롤러
│   ├── auth.service.ts        # 인증 서비스 (토큰 발급/검증)
│   ├── auth.module.ts         # 인증 모듈
│   ├── dto/                   # 데이터 전송 객체
│   │   ├── signup.dto.ts
│   │   ├── signin.dto.ts
│   │   └── refresh-token.dto.ts
│   ├── guards/                # 가드
│   │   ├── jwt-auth.guard.ts         # Access Token 검증
│   │   └── refresh-token.guard.ts    # Refresh Token 검증
│   └── strategies/            # Passport 전략
│       ├── jwt.strategy.ts           # Access Token 전략
│       └── refresh-token.strategy.ts # Refresh Token 전략
├── users/                     # 사용자 모듈
│   ├── user.entity.ts         # 사용자 엔티티
│   ├── users.service.ts       # 사용자 서비스
│   └── users.module.ts        # 사용자 모듈
├── posts/                     # 게시물 모듈
│   ├── post.entity.ts         # 게시물 엔티티
│   ├── posts.controller.ts    # 게시물 컨트롤러
│   ├── posts.service.ts       # 게시물 서비스
│   ├── posts.module.ts        # 게시물 모듈
│   └── dto/
│       └── create-post.dto.ts
├── app.module.ts              # 루트 모듈
└── main.ts                    # 애플리케이션 진입점
```

## 🔐 보안 고려사항

### 구현된 보안 기능

1. **Refresh Token Rotation**
   - 새 토큰 발급 시 이전 토큰 자동 무효화
   - 토큰 재사용 불가능

2. **토큰 재사용 감지**
   - 이미 사용된 토큰으로 재요청 시 모든 세션 무효화
   - 토큰 탈취 시도 자동 차단

3. **비밀번호 보안**
   - bcrypt를 이용한 단방향 해싱
   - 솔트 라운드: 10

4. **토큰 버전 관리**
   - `refreshTokenVersion` 필드로 토큰 세대 추적
   - 버전 불일치 시 접근 차단

### 프로덕션 환경 권장사항

1. **환경 변수**
   - `.env` 파일을 `.gitignore`에 추가
   - 강력한 시크릿 키 사용 (최소 32자 이상)

2. **토큰 만료 시간 조정**
   - Access Token: 15분 ~ 1시간
   - Refresh Token: 7일 ~ 30일

3. **추가 보안 강화**
   - HTTPS 사용 필수
   - CORS 설정
   - Rate Limiting 적용
   - IP 주소 추적 및 로깅
   - 다중 디바이스 세션 관리

4. **데이터베이스**
   - SQLite 대신 PostgreSQL/MySQL 사용
   - 인덱스 최적화
   - 정기적인 백업

## 📖 참고 문서

- [API_GUIDE.md](./API_GUIDE.md) - 상세한 API 가이드
- [REFRESH_TOKEN_SECURITY.md](./REFRESH_TOKEN_SECURITY.md) - Refresh Token 보안 메커니즘 상세 설명
- [NestJS 공식 문서](https://docs.nestjs.com)
- [JWT 공식 문서](https://jwt.io)

## 📝 라이선스

UNLICENSED

## 👤 작성자

개인 학습용 프로젝트
