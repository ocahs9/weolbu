## API 명세서 made by 공준혁

### Base URL
```
/api
```

### 목차
1. [회원 관련 API](#회원-관련-api)
   - [회원가입](#1-회원가입)
   - [회원정보 조회](#2-회원정보-조회)
2. [강의 관련 API](#강의-관련-api)
   - [강의 리스트 조회](#3-강의-리스트-조회)
   - [강좌 개설](#4-강좌-개설)
   - [수강신청](#5-수강신청)

---

## 회원 관련 API

### 1. 회원가입

새로운 회원을 등록합니다.

**Endpoint**
```
POST /api/members/signup
```

**Request Body**
```typescript
{
  name: string;           // 이름
  email: string;          // 이메일
  phoneNumber: string;    // 전화번호 (예: "01012345678")
  password: string;       // 비밀번호
  memberType: "tutor" | "tutee";  // 회원 유형 (강사/수강생)
}
```

**Response**
```typescript
{
  id: number;            // 회원 ID
  accessToken: string;   // 인증 토큰 (랜덤 생성)
  name: string;          // 이름
  email: string;         // 이메일
  memberType: "tutor" | "tutee";  // 회원 유형
  phoneNumber: string; 
}
```

**Example**
```bash
curl -X POST /api/members/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "홍길동",
    "email": "hong@example.com",
    "phoneNumber": "010-1234-5678",
    "password": "mypassword123",
    "memberType": "tutee"
  }'
```

---

### 2. 회원정보 조회

회원 ID로 회원 정보를 조회합니다.

**Endpoint**
```
GET /api/members/:id
```

**Path Parameters**
- `id` (number) - 회원 ID

**Response**
```typescript
{
  accessToken: string;   // 인증 토큰
  id: number;            // 회원 ID
  name: string;          // 이름
  email: string;         // 이메일
  phoneNumber: string;   // 전화번호
  memberType: "tutor" | "tutee";  // 회원 유형
  // 주의: password는 응답에 포함되지 않습니다
}
```

**Error Responses**
- `404 Not Found` - 회원을 찾을 수 없음
```typescript
{
  error: "Member not found"
}
```

**Example**
```bash
curl -X GET /api/members/1
```

---

## 강의 관련 API

### 3. 강의 리스트 조회

등록된 모든 강의를 페이지네이션으로 조회합니다. (무한 스크롤 지원)

**Endpoint**
```
GET /api/courses
```

**Query Parameters**
- `page` (number, optional) - 페이지 번호 (기본값: 1)
- `limit` (number, optional) - 페이지당 항목 수 (기본값: 10)

**Response**
```typescript
{
  courses: Course[];     // 강의 목록
  pagination: {
    currentPage: number;     // 현재 페이지
    limit: number;           // 페이지당 항목 수
    totalCourses: number;    // 전체 강의 수
    totalPages: number;      // 전체 페이지 수
    hasMore: boolean;        // 다음 페이지 존재 여부
  }
}

// Course 타입
{
  courseId: string;          // 강의 ID
  title: string;             // 강의 제목
  price: number;             // 가격
  numberOfStudents: number;  // 현재 수강생 수
  maxOfStudents: number;     // 최대 수강생 수
  tutorName: string;         // 강사 이름
  registrationDate: string;  // 등록일 (YYYY-MM-DD)
}
```

**Example**
```bash
# 첫 페이지 조회 (10개)
curl -X GET "/api/courses?page=1&limit=10"

# 두 번째 페이지 조회 (20개씩)
curl -X GET "/api/courses?page=2&limit=20"
```

**클라이언트 정렬 가이드**

서버에서 받은 데이터를 클라이언트에서 다음과 같이 정렬할 수 있습니다:

```typescript
// 최근 등록순
courses.sort((a, b) => 
  new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime()
);

// 신청자 많은 순
courses.sort((a, b) => b.numberOfStudents - a.numberOfStudents);

// 가격 높은 순
courses.sort((a, b) => b.price - a.price);
```

---

### 4. 강좌 개설

새로운 강좌를 개설합니다. (강사 권한 필요)

**Endpoint**
```
POST /api/courses
```

**Request Body**
```typescript
{
  title: string;          // 강의 제목
  price: number;          // 가격
  maxOfStudents: number;  // 최대 수강생 수
  accessToken: string;    // 인증 토큰 (강사 권한 확인용)
}
```

**Response**
```typescript
{
  success: boolean;
  course: {
    courseId: string;          // 생성된 강의 ID
    title: string;             // 강의 제목
    price: number;             // 가격
    numberOfStudents: number;  // 현재 수강생 수 (0)
    maxOfStudents: number;     // 최대 수강생 수
    tutorName: string;         // 강사 이름
    registrationDate: string;  // 등록일 (오늘 날짜)
  }
}
```

**Error Responses**
- `401 Unauthorized` - 유효하지 않은 토큰
```typescript
{
  error: "Invalid access token"
}
```

- `403 Forbidden` - 강사 권한 없음
```typescript
{
  error: "Only tutors can create courses"
}
```

**Example**
```bash
curl -X POST /api/courses \
  -H "Content-Type: application/json" \
  -d '{
    "title": "JavaScript 완벽 가이드",
    "price": 350000,
    "maxOfStudents": 100,
    "accessToken": "abc123def456"
  }'
```

---

### 5. 수강신청

특정 강의에 수강 신청합니다.

**Endpoint**
```
POST /api/courses/:courseId/apply
```

**Path Parameters**
- `courseId` (string) - 강의 ID

**Request Body**
```typescript
{
  accessToken: string;  // 인증 토큰
}
```

**Response**
```typescript
{
  success: boolean;
  message: string;      // "Successfully enrolled"
  course: {
    courseId: string;          // 강의 ID
    title: string;             // 강의 제목
    numberOfStudents: number;  // 업데이트된 수강생 수
  }
}
```

**Error Responses**
- `404 Not Found` - 강의를 찾을 수 없음
```typescript
{
  error: "Course not found"
}
```

- `401 Unauthorized` - 유효하지 않은 토큰
```typescript
{
  error: "Invalid access token"
}
```

- `400 Bad Request` - 정원 초과
```typescript
{
  error: "Course is full"
}
```

**Example**
```bash
curl -X POST /api/courses/1/apply \
  -H "Content-Type: application/json" \
  -d '{
    "accessToken": "abc123def456"
  }'
```

---

## 데이터 상태 관리

### In-Memory Database

이 API는 MSW(Mock Service Worker)를 사용하여 in-memory 데이터베이스로 동작합니다.

- **회원 DB**: `memeberDB` 배열
- **강의 DB**: `coursesDB` 배열

### 상태 갱신

다음 작업 시 자동으로 DB가 갱신됩니다:

1. **회원가입**: `memeberDB`에 새 회원 추가
2. **강좌 개설**: `coursesDB`에 새 강의 추가
3. **수강신청**: 해당 강의의 `numberOfStudents` 증가

### 초기 데이터

- 회원: 1명 (John, tutee)
- 강의: 25개 (무한 스크롤 테스트용)

---

## 주의사항

1. **인증**: 대부분의 쓰기 작업은 `accessToken`이 필요합니다.
2. **권한**: 강좌 개설은 `tutor` 권한이 필요합니다.
3. **정원**: 수강신청 시 정원(`maxOfStudents`)을 확인합니다.
4. **페이지네이션**: 무한 스크롤 구현 시 `hasMore` 값을 확인하세요.
5. **정렬**: 서버는 등록순으로 반환하며, 클라이언트에서 재정렬할 수 있습니다.