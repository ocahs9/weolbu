import { del, get, patch, post, put } from ".";
import { API_PATH } from "./API_PATH";
import type * as type from "./types";

export const postMemberSignup = async (body: type.SignUpMemberType) => {
	const res = await post<type.MemberSignupResponseType>(API_PATH.SIGNUP, body);
	localStorage.setItem("accessToken", res.data.data.accessToken);
	return res.data.data;
};

export const getMemberInfo = async (id: number | undefined) => {
	const res = await get<type.MemberInfo>(`${API_PATH.MEMBERS}/${id}`);
	return res.data.data;
};

export const getMyInfo = async () => {
	const res = await get<type.MemberInfo>(`${API_PATH.MEMBERS}/${API_PATH.ME}`);
	return res.data.data;
};

interface CoursesResponseType {
	courses: type.Course[];
	pagination: {
		currentPage: number;
		limit: number;
		totalCourses: number;
		totalPages: number;
		hasMore: boolean;
	};
}

export const getCourses = async (queryParams: {
	page: number;
	limit: number;
}) => {
	const res = await get<CoursesResponseType>(
		`${API_PATH.COURSES}?page=${queryParams.page}&limit=${queryParams.limit}`,
	);
	return res.data.data;
};

export const postCreateCourse = async (body: type.CourseCreationType) => {
	const res = await post<type.Course>(API_PATH.COURSES, body);
	return res.data.data;
};

export const postApplyCourse = async (courseId: string) => {
	const res = await post<type.Course>(`${API_PATH.COURSES}/${courseId}/apply`);
	return res.data.data;
};
