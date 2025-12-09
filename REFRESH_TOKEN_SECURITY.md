# Refresh Token 재사용 방지 메커니즘

## 구현된 보안 기능

### 1. Refresh Token Rotation (토큰 회전)
- 새로운 access token과 refresh token을 발급할 때마다 **이전 refresh token은 자동으로 무효화**됩니다.
- DB에는 항상 **최신 refresh token의 해시값만 저장**됩니다.

### 2. 토큰 버전 관리
- `refreshTokenVersion` 필드를 통해 토큰 버전을 추적합니다.
- 새로운 토큰이 발급될 때마다 버전이 증가합니다.

### 3. 재사용 감지 및 대응
- 이미 사용된 (무효화된) refresh token으로 재요청 시:
  - 요청이 거부됩니다
  - 보안을 위해 해당 사용자의 모든 refresh token을 무효화합니다
  - 사용자는 다시 로그인해야 합니다

## 동작 방식

```
1. 로그인 시:
   - Access Token (30초) + Refresh Token (2분) 발급
   - Refresh Token의 해시값을 DB에 저장
   - Version: 1

2. 첫 번째 /auth/refresh 요청:
   - 기존 Refresh Token 검증 ✓
   - 새로운 Access Token + 새로운 Refresh Token 발급
   - 새로운 Refresh Token의 해시값으로 DB 업데이트
   - Version: 2
   - ❌ 이전 Refresh Token은 이제 사용 불가

3. 이전 Refresh Token으로 재시도:
   - 검증 실패 (DB의 해시값과 불일치)
   - 401 Unauthorized 반환
   - 에러 메시지: "유효하지 않거나 이미 사용된 리프레시 토큰입니다."
   - 모든 Refresh Token 무효화 (보안 조치)
```

## 테스트 시나리오

### 시나리오 1: 정상적인 토큰 갱신
```http
# 1. 로그인
POST http://localhost:3000/auth/signin
{
  "email": "test@test.com",
  "password": "password123"
}
# Response: { accessToken: "xxx", refreshToken: "aaa" }

# 2. Access Token이 만료되면 Refresh
POST http://localhost:3000/auth/refresh
Authorization: Bearer aaa
# Response: { accessToken: "yyy", refreshToken: "bbb" }
# ✅ 성공: 새로운 토큰 발급

# 3. 새로운 Refresh Token으로 다시 갱신
POST http://localhost:3000/auth/refresh
Authorization: Bearer bbb
# Response: { accessToken: "zzz", refreshToken: "ccc" }
# ✅ 성공
```

### 시나리오 2: 이전 토큰 재사용 시도 (차단됨)
```http
# 1. 로그인
POST http://localhost:3000/auth/signin
# Response: { refreshToken: "aaa" }

# 2. 첫 번째 갱신
POST http://localhost:3000/auth/refresh
Authorization: Bearer aaa
# Response: { refreshToken: "bbb" }

# 3. 이전 토큰(aaa)으로 재시도
POST http://localhost:3000/auth/refresh
Authorization: Bearer aaa
# ❌ 401 Unauthorized
# 에러: "유효하지 않거나 이미 사용된 리프레시 토큰입니다."

# 4. 심지어 새 토큰(bbb)도 무효화됨 (보안 조치)
POST http://localhost:3000/auth/refresh
Authorization: Bearer bbb
# ❌ 401 Unauthorized
```

### 시나리오 3: 토큰 탈취 감지
만약 공격자가 refresh token을 탈취하여 사용했다면:
1. 정상 사용자가 자신의 refresh token으로 갱신 시도
2. 이미 공격자가 사용해서 무효화된 상태
3. 검증 실패 → 모든 토큰 무효화
4. 사용자에게 재로그인 요구 → 공격자의 토큰도 무효화됨

## 코드 변경 사항

### 1. User Entity
```typescript
@Column({ nullable: true })
refreshTokenVersion?: number; // 토큰 버전 추가
```

### 2. Users Service
```typescript
// 새로운 검증 메서드
async validateAndInvalidateRefreshToken(
  userId: number,
  refreshToken: string,
): Promise<boolean> {
  // 검증 실패 시 모든 토큰 무효화
  if (!isValid) {
    await this.usersRepository.update(userId, {
      refreshToken: undefined,
      refreshTokenVersion: (user.refreshTokenVersion || 0) + 1,
    });
    return false;
  }
  return true;
}
```

### 3. Auth Service
```typescript
async refreshTokens(userId: number, refreshToken: string) {
  // 검증 및 무효화 로직 사용
  const isValid = await this.usersService.validateAndInvalidateRefreshToken(
    userId,
    refreshToken,
  );
  
  // 새 토큰 발급 후 DB 업데이트 (이전 토큰 자동 무효화)
  await this.usersService.updateRefreshToken(user.id, tokens.refreshToken);
}
```

## 보안 이점

1. ✅ **Refresh Token 재사용 불가**: 한 번 사용된 토큰은 즉시 무효화
2. ✅ **토큰 탈취 감지**: 재사용 시도 시 모든 세션 무효화
3. ✅ **공격 표면 최소화**: DB에는 항상 최신 토큰 하나만 유효
4. ✅ **자동 보안 대응**: 의심스러운 활동 시 자동으로 재인증 요구

## 추가 권장 사항

더 강화하려면:
1. 토큰 재사용 시도를 로깅하여 모니터링
2. IP 주소 추적 및 차단
3. Rate Limiting 적용
4. Refresh Token 만료 시간 조정 (현재 2분)
5. 디바이스별 세션 관리
