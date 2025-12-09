# Token Test - JWT 기반 인증 시스템

NestJS 기반의 JWT 인증 시스템입니다. Access Token과 Refresh Token을 사용한 회원가입, 로그인, 포스트 작성 기능을 제공합니다.

## 기능

- ✅ 회원가입 (SignUp)
- ✅ 로그인/로그아웃 (JWT 기반)
- ✅ Access Token & Refresh Token
- ✅ 포스트 작성 (인증 필요)
- ✅ 포스트 목록 조회
- ✅ 내 포스트 조회

## 기술 스택

- NestJS
- TypeORM
- SQLite
- JWT (JSON Web Token)
- Passport
- bcrypt

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 모드 실행
npm run start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## API 엔드포인트

### 1. 인증 (Auth)

#### 회원가입

```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "홍길동"
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

#### 로그인

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

#### 토큰 갱신

```http
POST /auth/refresh
Authorization: Bearer {refreshToken}
```

**응답:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 로그아웃

```http
POST /auth/logout
Authorization: Bearer {accessToken}
```

**응답:**

```json
{
  "message": "로그아웃되었습니다."
}
```

### 2. 포스트 (Posts)

#### 포스트 작성 (🔒 인증 필요)

```http
POST /posts
Authorization: Bearer {accessToken}
Content-Type: application/json

{
  "title": "첫 번째 포스트",
  "content": "포스트 내용입니다."
}
```

**응답:**

```json
{
  "id": 1,
  "title": "첫 번째 포스트",
  "content": "포스트 내용입니다.",
  "userId": 1,
  "createdAt": "2025-12-09T...",
  "updatedAt": "2025-12-09T..."
}
```

#### 모든 포스트 조회

```http
GET /posts
```

**응답:**

```json
[
  {
    "id": 1,
    "title": "첫 번째 포스트",
    "content": "포스트 내용입니다.",
    "userId": 1,
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동"
    },
    "createdAt": "2025-12-09T...",
    "updatedAt": "2025-12-09T..."
  }
]
```

#### 내 포스트 조회 (🔒 인증 필요)

```http
GET /posts/my-posts
Authorization: Bearer {accessToken}
```

## 토큰 정보

- **Access Token**: 29초 유효
- **Refresh Token**: 2분 유효

Access Token이 만료되면 Refresh Token으로 새로운 토큰을 발급받을 수 있습니다.

## 데이터베이스

SQLite를 사용하며, `database.sqlite` 파일에 데이터가 저장됩니다.

## 테스트 예시 (cURL)

### 회원가입

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "테스트유저"
  }'
```

### 로그인

```bash
curl -X POST http://localhost:3000/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 포스트 작성 (Access Token 필요)

```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "나의 첫 포스트",
    "content": "안녕하세요!"
  }'
```

## 프로젝트 구조

```
src/
├── auth/                    # 인증 모듈
│   ├── dto/                 # 데이터 전송 객체
│   ├── guards/              # 인증 가드
│   ├── strategies/          # Passport 전략
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/                   # 사용자 모듈
│   ├── user.entity.ts
│   ├── users.service.ts
│   └── users.module.ts
├── posts/                   # 포스트 모듈
│   ├── dto/
│   ├── post.entity.ts
│   ├── posts.controller.ts
│   ├── posts.service.ts
│   └── posts.module.ts
├── app.module.ts
└── main.ts
```

## 환경 변수

`.env` 파일에서 다음 환경 변수를 설정할 수 있습니다:

```env
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
PORT=3000
```

## 라이센스

UNLICENSED
