//response.data.data의 타입 예시
export interface Course {
	courseId: string;
	title: string;
	price: number;
	numberOfStudents: number;
	maxOfStudents: number;
	tutorName: string;
	registrationDate: string;
}

export type CourseCreationType = Omit<
	Course,
	"courseId" | "registrationDate" | "numberOfStudents" | "tutorName"
>;

export interface Member {
	accessToken: string;
	id: number;
	name: string;
	email: string;
	phoneNumber: string;
	password: string;
	memberType: "tutor" | "tutee";
}

export type SignUpMemberType = Omit<Member, "accessToken" | "id">;
export type MemberSignupResponseType = Omit<Member, "password">;

export type MemberInfo = Omit<Member, "password" | "accessToken">;
