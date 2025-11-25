# Wolbu - 강의 관리 시스템

온라인 강의 수강 신청 및 강좌 개설을 위한 웹 애플리케이션입니다.

## 🚀 주요 기능

- **회원가입 및 인증**: 강사(tutor)와 수강생(tutee) 구분
- **강좌 개설**: 강사 권한 회원이 새로운 강좌 생성
- **수강 신청**: 강의 목록 조회 및 수강 신청
- **무한 스크롤**: 페이지네이션 기반 강의 목록 로딩
- **정렬 기능**: 최근 등록순, 신청자순, 가격순 정렬

## 🛠️ 기술 스택

### Core
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빌드 도구

### 상태 관리 & 데이터 페칭
- **TanStack Query (React Query)** - 서버 상태 관리
- **Axios** - HTTP 클라이언트

### 폼 & 유효성 검증
- **Zod** - 스키마 기반 유효성 검증
- **Uncontrolled/Controlled Input** - 유동적인 입력 제어 방식 지원

### UI & 스타일링
- **Reshaped** - 컴포넌트 라이브러리
- **Vanilla Extract** - 타입 안전한 CSS-in-JS
- **Framer Motion** - 애니메이션

### 라우팅
- **React Router v7** - 클라이언트 사이드 라우팅

### 모킹 & 개발 도구
- **MSW (Mock Service Worker)** - API 모킹
- **React Error Boundary** - 에러 핸들링
- **Biome** - 린터 & 포맷터

## 📁 프로젝트 구조

```
src/
├── apis/              # API 관련 (axios 인스턴스, hooks, types)
├── pages/             # 페이지 컴포넌트 (Domain-based 구조)
│   ├── apply-course/  # 수강 신청 페이지
│   ├── cource-creation/ # 강좌 개설 페이지
│   └── signup/        # 회원가입 페이지
├── shared/            # 공통 컴포넌트 및 유틸리티
│   ├── components/    # 재사용 가능한 컴포넌트
│   ├── hooks/         # 커스텀 훅
│   ├── schema/        # Zod 스키마
│   ├── types/         # 타입 정의
│   └── utils/         # 유틸리티 함수
├── routes/            # 라우팅 설정
├── styles/            # 전역 스타일
├── providers/         # Context Providers
└── mock/              # MSW 핸들러 및 API 명세
```

### 설계 원칙
- **Domain-based 구조**: 페이지별로 필요한 컴포넌트를 함께 관리
- **0-depth 공통화**: 전역적으로 사용되는 요소는 루트 레벨에 배치
- **전역 상태 지양**: 로컬 상태와 서버 상태 관리로 최소화

## 🗺️ 라우팅 구조

### 타입 안전한 경로 관리
`PATH` 객체를 통해 경로를 중앙 관리하고 타입 안정성을 보장합니다.

```typescript
export const PATH = {
  ROOT: "/",
  SIGNUP: definePath("/signup", {}),
  COURSE_CREATION: definePath("/course-creation", {}),
  APPLY_COURSE: definePath("/apply-course", {}),
} as const;
```

### 주요 라우트
- `/` - 메인 페이지(자동으로 signup으로 리다이렉팅)
- `/signup` - 회원가입
- `/course-creation` - 강좌 개설 (강사 권한 필요)
- `/apply-course` - 수강 신청 페이지

### 특징
- **타입 안전**: `definePath` 유틸로 자동완성 및 타입 체크 지원
- **중첩 라우팅**: 필요시 쉽게 중첩 경로 추가 가능
- **404 처리**: 정의되지 않은 경로는 NotFound 페이지로 라우팅

## 🔐 인증 시스템

### AccessToken 관리
- 회원가입/로그인 시 서버로부터 `accessToken` 수신
- **LocalStorage**에 토큰 저장
- API 요청 시 `Authorization: Bearer <token>` 헤더에 포함

```typescript
// 토큰 저장
localStorage.setItem('accessToken', token);

// 요청 시 사용
headers: {
  Authorization: `Bearer ${localStorage.getItem('accessToken')}`
}
```

## 🎯 핵심 구현 사항

### 1. 유연한 Input 제어
Uncontrolled와 Controlled 방식을 상황에 따라 전환 가능하도록 구현:
- 간단한 폼: Uncontrolled (성능 최적화)
- 실시간 검증 필요: Controlled (즉각적인 피드백)

### 2. 병렬 수강 신청
`Promise.all`을 사용한 여러 강의 동시 신청:

```typescript
// 여러 강의를 동시에 신청
await Promise.all(
  selectedCourses.map(courseId => applyCourse(courseId))
);
```

**특징**:
- 병렬 처리로 빠른 응답
- 하나라도 실패 시 전체 롤백
- 단순한 에러 처리 (all-or-nothing)

**고려사항**:
- 재시도 로직 구현 가능 (예: `Promise.allSettled` + 실패한 요청만 재시도)
- 현재는 단순성을 위해 일괄 처리 방식 채택

### 3. 선언적 필터링
가독성과 유지보수성을 위한 선언적 코드 작성:

```typescript
// 최근 등록순
const sortByRecent = (courses: Course[]) =>
  [...courses].sort((a, b) => 
    new Date(b.registrationDate).getTime() - 
    new Date(a.registrationDate).getTime()
  );

// 신청자 많은 순
const sortByPopular = (courses: Course[]) =>
  [...courses].sort((a, b) => b.numberOfStudents - a.numberOfStudents);
```

### 4. UX 향상
- **Suspense**: 로딩 상태를 선언적으로 처리
- **Error Boundary**: 에러를 컴포넌트 단위로 격리하고 명시적으로 표시
- **Optimistic Updates**: 낙관적 업데이트로 즉각적인 피드백

```tsx
<Suspense fallback={<Loading />}>
  <ErrorBoundary fallback={<ErrorFallback />}>
    <YourComponent />
  </ErrorBoundary>
</Suspense>
```

## 🧪 Mock API (MSW)

### ⚠️ 중요: In-Memory DB 사용

MSW를 사용한 API 모킹으로 **실제 데이터베이스에 저장되지 않습니다**.

```
📌 테스트 시 주의사항
- 새로고침하면 데이터가 초기화됩니다
- 뒤로가기 시 401 에러가 발생할 수 있습니다
- 테스트는 한 플로우로 진행해야 합니다
  (회원가입 → 강좌 개설 → 수강 신청)
```

### 권장 테스트 플로우

1. 강사 계정 회원가입 (`memberType: "tutor"`)
2. 수강신청 (+ 강의개설 버튼 존재 => 클릭해서 3번으로 진행)
3. 강좌 개설 

or

1. 수강생 계정 회원가입 (`memberType: "tutee"`)
2. 강의 목록 조회 및 수강 신청

### API 명세
자세한 API 명세는 [`src/mock/SPEC.md`](./src/mock/SPEC.md)를 참조하세요.

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 빌드 미리보기
yarn preview
```

### 환경 설정

별도의 환경 변수 설정이 필요하지 않습니다. MSW가 자동으로 API를 모킹합니다.

## 📝 코딩 컨벤션

### 코드 스타일
- **선언적 프로그래밍**: 명령형보다 선언적 방식 선호
- **타입 안정성**: 엄격한 TypeScript 타입 검사

### 상태 관리 원칙
- **서버 상태**: TanStack Query 사용
- **UI 상태**: React 로컬 상태 (useState, useReducer)

### 컴포넌트 구조
```typescript
// 1. Import
import { ... } from '...';

// 2. Type 정의
type Props = { ... };

// 3. Component
export const Component = ({ ... }: Props) => {
  // 3-1. Hooks
  // 3-2. Handlers
  // 3-3. Render
  return <div>...</div>;
};

// 4. Styles (Vanilla Extract)
```

## 🔍 주요 의존성

| 패키지 | 버전 | 용도 |
|--------|------|------|
| react | ^19.2.0 | UI 라이브러리 |
| @tanstack/react-query | ^5.90.9 | 서버 상태 관리 |
| zod | ^4.1.12 | 스키마 검증 |
| reshaped | ^3.8.9 | UI 컴포넌트 |
| @vanilla-extract/css | ^1.17.4 | CSS-in-JS |
| msw | ^2.12.3 | API 모킹 |
| axios | ^1.13.2 | HTTP 클라이언트 |
| react-router | ^7.9.6 | 라우팅 |
| react-error-boundary | ^6.0.0 | 에러 처리 |

## 📄 라이선스

Private Project

## 👤 작성자

공준혁

---
