export const GET_HOSPITAL_DETAIL_QUERY_KEY = (hospitalId: number) => [
	"hospital",
	hospitalId,
];

export const GET_COURSES_QUERY_KEY = () => ["courses"];

export const GET_MEMBER_INFO_QUERY_KEY = (id?: number) => [
	"member",
	id ?? "me",
];
