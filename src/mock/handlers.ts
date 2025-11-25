import type {
	Course,
	CourseCreationType,
	Member,
	SignUpMemberType,
} from "@apis/types";
import { HttpResponse, http } from "msw";

const coursesDB: Course[] = [
	{
		courseId: "1",
		title: "월부에서 살아남기",
		price: 100000,
		numberOfStudents: 10,
		maxOfStudents: 100,
		tutorName: "김병만",
		registrationDate: "2025-01-01",
	},
	{
		courseId: "2",
		title: "월급 훔치는 방법",
		price: 200000,
		numberOfStudents: 20,
		maxOfStudents: 200,
		tutorName: "홍길동",
		registrationDate: "2025-03-02",
	},
	{
		courseId: "3",
		title: "월급쟁이 성장시키는 방법",
		price: 300000,
		numberOfStudents: 30,
		maxOfStudents: 300,
		tutorName: "샘",
		registrationDate: "2025-01-03",
	},
	{
		courseId: "4",
		title: "월급 협상 이기는 방법",
		price: 400000,
		numberOfStudents: 40,
		maxOfStudents: 400,
		tutorName: "이순신",
		registrationDate: "2025-06-04",
	},
	{
		courseId: "5",
		title: "훌륭한 개발자 되는 방법",
		price: 500000,
		numberOfStudents: 100,
		maxOfStudents: 500,
		tutorName: "박찬호",
		registrationDate: "2025-02-05",
	},
	{
		courseId: "6",
		title: "Course 6",
		price: 600000,
		numberOfStudents: 90,
		maxOfStudents: 600,
		tutorName: "박지성",
		registrationDate: "2025-03-06",
	},
	{
		courseId: "7",
		title: "프론트엔드 마스터 과정",
		price: 350000,
		numberOfStudents: 45,
		maxOfStudents: 100,
		tutorName: "최민수",
		registrationDate: "2025-01-10",
	},
	{
		courseId: "8",
		title: "백엔드 심화 과정",
		price: 450000,
		numberOfStudents: 60,
		maxOfStudents: 120,
		tutorName: "강호동",
		registrationDate: "2025-02-15",
	},
	{
		courseId: "9",
		title: "DevOps 실전 가이드",
		price: 380000,
		numberOfStudents: 35,
		maxOfStudents: 80,
		tutorName: "유재석",
		registrationDate: "2025-03-20",
	},
	{
		courseId: "10",
		title: "클린 코드 작성법",
		price: 280000,
		numberOfStudents: 70,
		maxOfStudents: 150,
		tutorName: "김영철",
		registrationDate: "2025-01-25",
	},
	{
		courseId: "11",
		title: "알고리즘 정복하기",
		price: 320000,
		numberOfStudents: 55,
		maxOfStudents: 100,
		tutorName: "이경규",
		registrationDate: "2025-04-01",
	},
	{
		courseId: "12",
		title: "데이터베이스 설계 기초",
		price: 270000,
		numberOfStudents: 40,
		maxOfStudents: 90,
		tutorName: "서장훈",
		registrationDate: "2025-02-10",
	},
	{
		courseId: "13",
		title: "리액트 완전 정복",
		price: 400000,
		numberOfStudents: 80,
		maxOfStudents: 150,
		tutorName: "전현무",
		registrationDate: "2025-01-15",
	},
	{
		courseId: "14",
		title: "타입스크립트 마스터",
		price: 330000,
		numberOfStudents: 65,
		maxOfStudents: 120,
		tutorName: "신동엽",
		registrationDate: "2025-03-05",
	},
	{
		courseId: "15",
		title: "테스트 주도 개발",
		price: 360000,
		numberOfStudents: 50,
		maxOfStudents: 100,
		tutorName: "김구라",
		registrationDate: "2025-02-20",
	},
	{
		courseId: "16",
		title: "마이크로서비스 아키텍처",
		price: 480000,
		numberOfStudents: 30,
		maxOfStudents: 70,
		tutorName: "박명수",
		registrationDate: "2025-04-10",
	},
	{
		courseId: "17",
		title: "Git & GitHub 실무",
		price: 180000,
		numberOfStudents: 90,
		maxOfStudents: 200,
		tutorName: "정준하",
		registrationDate: "2025-01-05",
	},
	{
		courseId: "18",
		title: "REST API 설계 가이드",
		price: 290000,
		numberOfStudents: 55,
		maxOfStudents: 110,
		tutorName: "하하",
		registrationDate: "2025-03-15",
	},
	{
		courseId: "19",
		title: "웹 성능 최적화",
		price: 420000,
		numberOfStudents: 40,
		maxOfStudents: 90,
		tutorName: "노홍철",
		registrationDate: "2025-02-25",
	},
	{
		courseId: "20",
		title: "모던 CSS 마스터",
		price: 250000,
		numberOfStudents: 75,
		maxOfStudents: 140,
		tutorName: "정형돈",
		registrationDate: "2025-01-20",
	},
	{
		courseId: "21",
		title: "GraphQL 완벽 가이드",
		price: 370000,
		numberOfStudents: 45,
		maxOfStudents: 100,
		tutorName: "길",
		registrationDate: "2025-04-05",
	},
	{
		courseId: "22",
		title: "Docker & Kubernetes",
		price: 490000,
		numberOfStudents: 35,
		maxOfStudents: 80,
		tutorName: "이수근",
		registrationDate: "2025-03-25",
	},
	{
		courseId: "23",
		title: "AWS 실전 배포",
		price: 410000,
		numberOfStudents: 50,
		maxOfStudents: 100,
		tutorName: "김희철",
		registrationDate: "2025-02-05",
	},
	{
		courseId: "24",
		title: "보안 코딩 가이드",
		price: 340000,
		numberOfStudents: 30,
		maxOfStudents: 70,
		tutorName: "이영자",
		registrationDate: "2025-04-15",
	},
	{
		courseId: "25",
		title: "모바일 앱 개발 입문",
		price: 380000,
		numberOfStudents: 60,
		maxOfStudents: 120,
		tutorName: "김숙",
		registrationDate: "2025-01-30",
	},
];

const memeberDB: Member[] = [
	{
		accessToken: "1",
		id: 1,
		name: "John",
		email: "john@example.com",
		phoneNumber: "010-1234-5678",
		password: "password",
		memberType: "tutee",
	},
];

// 랜덤 해시값 생성 함수
function generateAccessToken(): string {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

export const handlers = [
	// 1. 회원가입 POST
	http.post("/api/members/signup", async ({ request }) => {
		const body = (await request.json()) as SignUpMemberType;

		const newMember: Member = {
			...body,
			id: memeberDB.length + 1,
			accessToken: generateAccessToken(),
		};

		memeberDB.push(newMember);

		//1.5초 후 응답
		await new Promise((resolve) => setTimeout(resolve, 1500));
		return HttpResponse.json({
			code: 200,
			message: "success",
			data: {
				id: newMember.id,
				accessToken: newMember.accessToken,
				name: newMember.name,
				email: newMember.email,
				memberType: newMember.memberType,
				phoneNumber: newMember.phoneNumber,
			},
		});
	}),

	http.get("api/members/me", ({ request }) => {
		const authorization = request.headers.get("Authorization");
		const accessToken = authorization?.split(" ")[1];
		const member = memeberDB.find((m) => m.accessToken === accessToken);
		if (!member) {
			return HttpResponse.json(
				{ error: "Invalid access token" },
				{ status: 401 },
			);
		}
		return HttpResponse.json({
			code: 200,
			message: "success",
			data: member,
		});
	}),

	// 2. 회원정보 조회 GET
	http.get("/api/members/:id", ({ params }) => {
		const { id } = params;
		const member = memeberDB.find((m) => m.id === Number(id));

		if (!member) {
			return HttpResponse.json({ error: "Member not found" }, { status: 404 });
		}

		// 비밀번호는 제외하고 반환
		const { password: _password, ...memberInfo } = member;
		return HttpResponse.json({
			code: 200,
			message: "success",
			data: memberInfo,
		});
	}),

	// 3. 수강신청 POST
	http.post("/api/courses/:courseId/apply", async ({ params, request }) => {
		const { courseId } = params;
		const authorization = request.headers.get("Authorization");
		const accessToken = authorization?.split(" ")[1];

		const course = coursesDB.find((c) => c.courseId === courseId);
		const member = memeberDB.find((m) => m.accessToken === accessToken);

		if (!course) {
			return HttpResponse.json({ error: "Course not found" }, { status: 404 });
		}

		if (!member) {
			return HttpResponse.json(
				{ error: "Invalid access token" },
				{ status: 401 },
			);
		}

		if (course.numberOfStudents >= course.maxOfStudents) {
			return HttpResponse.json({ error: "Course is full" }, { status: 400 });
		}

		// 수강인원 증가
		course.numberOfStudents += 1;

		return HttpResponse.json({
			code: 200,
			message: "Successfully enrolled",
			data: course,
		});
	}),

	// 4. 강좌 개설 POST
	http.post("/api/courses", async ({ request }) => {
		const authorization = request.headers.get("Authorization");
		const accessToken = authorization?.split(" ")[1];

		const body = (await request.json()) as CourseCreationType;
		const member = memeberDB.find((m) => m.accessToken === accessToken);

		if (!member) {
			return HttpResponse.json(
				{ error: "Invalid access token" },
				{ status: 401 },
			);
		}

		if (member.memberType !== "tutor") {
			return HttpResponse.json(
				{ error: "Only tutors can create courses" },
				{ status: 403 },
			);
		}

		const newCourse: Course = {
			courseId: String(coursesDB.length + 1),
			title: body.title,
			price: body.price,
			maxOfStudents: body.maxOfStudents,
			numberOfStudents: 0,
			tutorName: member.name,
			registrationDate: new Date().toISOString().split("T")[0],
		};

		coursesDB.push(newCourse);

		return HttpResponse.json({
			code: 200,
			message: "success",
			data: newCourse,
		});
	}),

	// 5. 강의 리스트 조회 (무한스크롤 기반) GET
	http.get("/api/courses", ({ request }) => {
		const url = new URL(request.url);
		const page = Number(url.searchParams.get("page")) || 1;
		const limit = Number(url.searchParams.get("limit")) || 10;

		const startIndex = (page - 1) * limit;
		const endIndex = startIndex + limit;

		const paginatedCourses = coursesDB.slice(startIndex, endIndex);
		const hasMore = endIndex < coursesDB.length;

		return HttpResponse.json({
			code: 200,
			message: "success",
			data: {
				courses: paginatedCourses,
				pagination: {
					currentPage: page,
					limit,
					totalCourses: coursesDB.length,
					totalPages: Math.ceil(coursesDB.length / limit),
					hasMore,
				},
			},
		});
	}),
];
